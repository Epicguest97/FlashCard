
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Subject } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface CreateFlashcardProps {
  subjects: Subject[];
  selectedSubject: string | null;
  selectedChapter: string | null;
  onCreateFlashcard: (flashcard: {
    question: string;
    answer: string;
    subjectId: string;
    chapterId: string;
  }) => void;
}

const CreateFlashcard = ({ 
  subjects, 
  selectedSubject: externalSelectedSubject, 
  selectedChapter: externalSelectedChapter,
  onCreateFlashcard 
}: CreateFlashcardProps) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [chapterId, setChapterId] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Synchronize with external selection from sidebar
  useEffect(() => {
    if (externalSelectedSubject) {
      setSubjectId(externalSelectedSubject);
    }
  }, [externalSelectedSubject]);

  useEffect(() => {
    if (externalSelectedChapter) {
      setChapterId(externalSelectedChapter);
    }
  }, [externalSelectedChapter]);

  const chapters = subjects.find((s) => s.id === subjectId)?.chapters || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question || !answer || !subjectId || !chapterId) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }

    onCreateFlashcard({
      question,
      answer,
      subjectId,
      chapterId,
    });

    toast({
      title: "Success",
      description: "Flashcard created successfully",
    });

    navigate("/flashcards");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-black/40 neo-blur rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-300">Create New Flashcard</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Select 
            value={subjectId} 
            onValueChange={(value) => {
              setSubjectId(value);
              setChapterId(""); // Reset chapter when subject changes
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject.id} value={subject.id}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="chapter">Chapter</Label>
          <Select value={chapterId} onValueChange={setChapterId} disabled={!subjectId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a chapter" />
            </SelectTrigger>
            <SelectContent>
              {chapters.map((chapter) => (
                <SelectItem key={chapter.id} value={chapter.id}>
                  {chapter.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="question">Question</Label>
          <Textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-24 bg-black/60"
            placeholder="Enter your question here..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="answer">Answer</Label>
          <Textarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="min-h-32 bg-black/60"
            placeholder="Enter your answer here..."
          />
        </div>

        <div className="flex space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            className="w-1/2"
            onClick={() => navigate("/flashcards")}
          >
            Cancel
          </Button>
          <Button type="submit" className="w-1/2 bg-purple-600 hover:bg-purple-700 text-white">
            Create Flashcard
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateFlashcard;
