
import { useState } from "react";
import CreateFlashcard from "@/components/CreateFlashcard";
import Sidebar from "@/components/Sidebar";
import { Subject } from "@/lib/types";
import ThemeToggle from "@/components/ThemeToggle";

interface CreatePageProps {
  subjects: Subject[];
  onCreateFlashcard: (flashcard: {
    question: string;
    answer: string;
    subjectId: string;
    chapterId: string;
  }) => void;
}

const Create = ({ subjects, onCreateFlashcard }: CreatePageProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        subjects={subjects}
        selectedSubject={selectedSubject}
        selectedChapter={selectedChapter}
        onSelectSubject={setSelectedSubject}
        onSelectChapter={setSelectedChapter}
      />

      <div className="flex-1 p-6 relative">
        <div className="absolute top-6 right-6 flex items-center gap-4 z-10">
          <ThemeToggle />
        </div>

        <h1 className="text-3xl font-bold text-center mb-8 text-purple-300">
          Create Flashcard
        </h1>

        <CreateFlashcard 
          subjects={subjects}
          selectedSubject={selectedSubject}
          selectedChapter={selectedChapter}
          onCreateFlashcard={onCreateFlashcard}
        />
      </div>
    </div>
  );
};

export default Create;
