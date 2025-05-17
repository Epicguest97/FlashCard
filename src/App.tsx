
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Index from "./pages/Index";
import Flashcards from "./pages/Flashcards";
import Create from "./pages/Create";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";

import { subjects as initialSubjects, flashcards as initialFlashcards } from "./lib/data";
import { Flashcard } from "./lib/types";

const queryClient = new QueryClient();

const App = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(initialFlashcards);
  const [subjects, setSubjects] = useState(initialSubjects);
  const [strongTopics, setStrongTopics] = useState<string[]>([]);

  // Load data from localStorage if available
  useEffect(() => {
    const savedFlashcards = localStorage.getItem("flashcards");
    const savedSubjects = localStorage.getItem("subjects");
    const savedStrongTopics = localStorage.getItem("strongTopics");
    
    if (savedFlashcards) {
      setFlashcards(JSON.parse(savedFlashcards));
    }
    
    if (savedSubjects) {
      setSubjects(JSON.parse(savedSubjects));
    }
    
    if (savedStrongTopics) {
      setStrongTopics(JSON.parse(savedStrongTopics));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
    localStorage.setItem("subjects", JSON.stringify(subjects));
    localStorage.setItem("strongTopics", JSON.stringify(strongTopics));
  }, [flashcards, subjects, strongTopics]);

  const handleKnownToggle = (id: string, known: boolean) => {
    setFlashcards(
      flashcards.map((card) =>
        card.id === id ? { ...card, known } : card
      )
    );
  };

  const handleMarkStrong = (id: string, isStrong: boolean) => {
    if (isStrong) {
      if (!strongTopics.includes(id)) {
        setStrongTopics([...strongTopics, id]);
      }
    } else {
      setStrongTopics(strongTopics.filter(topicId => topicId !== id));
    }
  };

  const handleCreateFlashcard = (flashcard: {
    question: string;
    answer: string;
    subjectId: string;
    chapterId: string;
  }) => {
    const newFlashcard: Flashcard = {
      id: uuidv4(),
      question: flashcard.question,
      answer: flashcard.answer,
      subjectId: flashcard.subjectId,
      chapterId: flashcard.chapterId,
      known: false,
    };

    setFlashcards([...flashcards, newFlashcard]);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route 
                path="/flashcards" 
                element={
                  <Flashcards 
                    flashcards={flashcards} 
                    subjects={subjects} 
                    onKnownToggle={handleKnownToggle} 
                    onMarkStrong={handleMarkStrong}
                    strongTopics={strongTopics}
                  />
                } 
              />
              <Route 
                path="/create" 
                element={
                  <Create 
                    subjects={subjects} 
                    onCreateFlashcard={handleCreateFlashcard} 
                  />
                } 
              />
              <Route 
                path="/quiz" 
                element={
                  <Quiz 
                    flashcards={flashcards} 
                    subjects={subjects} 
                    onKnownToggle={handleKnownToggle} 
                    onMarkStrong={handleMarkStrong}
                    strongTopics={strongTopics}
                  />
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
