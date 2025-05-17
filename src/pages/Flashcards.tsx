import { useState, useEffect } from "react";
import FlashCard from "@/components/FlashCard";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Flashcard, Subject } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import UserProfile from "@/components/UserProfile";

interface FlashcardsProps {
  flashcards: Flashcard[];
  subjects: Subject[];
  onKnownToggle: (id: string, known: boolean) => void;
  onMarkStrong: (id: string, isStrong: boolean) => void;
  strongTopics: string[];
}

const Flashcards = ({ flashcards, subjects, onKnownToggle, onMarkStrong, strongTopics }: FlashcardsProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredCards, setFilteredCards] = useState<Flashcard[]>([]);
  const [viewMode, setViewMode] = useState<'all' | 'strong' | 'weak'>('all');
  const isMobile = useIsMobile();

  // Filter flashcards based on selection
  useEffect(() => {
    let filtered = [...flashcards];
    
    if (selectedSubject) {
      filtered = filtered.filter(card => card.subjectId === selectedSubject);
    }
    
    if (selectedChapter) {
      filtered = filtered.filter(card => card.chapterId === selectedChapter);
    }
    
    // Apply strength filter
    if (viewMode === 'strong') {
      filtered = filtered.filter(card => strongTopics.includes(card.id));
    } else if (viewMode === 'weak') {
      filtered = filtered.filter(card => !strongTopics.includes(card.id));
    }
    
    setFilteredCards(filtered);
    setCurrentIndex(0);
  }, [flashcards, selectedSubject, selectedChapter, strongTopics, viewMode]);

  const handleKnown = (id: string) => {
    onKnownToggle(id, true);
    goToNextCard();
  };

  const handleUnknown = (id: string) => {
    onKnownToggle(id, false);
    goToNextCard();
  };

  const handleMarkStrong = (id: string) => {
    onMarkStrong(id, true);
  };

  const goToNextCard = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const goToPrevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  // Calculate analytics
  const weakTopicsCount = flashcards.length - strongTopics.length;

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
          <UserProfile 
            strongTopics={strongTopics.length}
            weakTopics={weakTopicsCount}
          />
        </div>

        <h1 className="text-3xl font-bold text-center mb-8 text-purple-300">
          FlashCards
          {selectedSubject && subjects.find(s => s.id === selectedSubject) && 
            ` - ${subjects.find(s => s.id === selectedSubject)?.name}`}
          {selectedChapter && subjects.find(s => s.id === selectedSubject)?.chapters.find(c => c.id === selectedChapter) && 
            ` / ${subjects.find(s => s.id === selectedSubject)?.chapters.find(c => c.id === selectedChapter)?.name}`}
        </h1>

        {/* Strength Filter Toggles */}
        <div className="flex justify-center gap-4 mb-6">
          <Toggle 
            pressed={viewMode === 'all'} 
            onPressedChange={() => setViewMode('all')}
            className={viewMode === 'all' ? 'bg-primary text-white' : ''}
          >
            All
          </Toggle>
          <Toggle 
            pressed={viewMode === 'strong'} 
            onPressedChange={() => setViewMode('strong')}
            className={viewMode === 'strong' ? 'bg-green-600 text-white' : ''}
          >
            Strong Topics
          </Toggle>
          <Toggle 
            pressed={viewMode === 'weak'} 
            onPressedChange={() => setViewMode('weak')}
            className={viewMode === 'weak' ? 'bg-destructive text-white' : ''}
          >
            Weak Topics
          </Toggle>
        </div>

        {filteredCards.length > 0 ? (
          <>
            <div className="text-center mb-4">
              <span className="text-gray-300">
                Card {currentIndex + 1} of {filteredCards.length}
              </span>
              {strongTopics.includes(filteredCards[currentIndex].id) && (
                <Badge className="ml-2 bg-green-600">Strong Topic</Badge>
              )}
            </div>

            <FlashCard
              flashcard={filteredCards[currentIndex]}
              onKnown={handleKnown}
              onUnknown={handleUnknown}
              onMarkStrong={handleMarkStrong}
            />

            <div className="flex justify-center gap-4 mt-4">
              <Button onClick={goToPrevCard} variant="outline">
                Previous
              </Button>
              <Button onClick={goToNextCard} variant="outline">
                Next
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center p-12 bg-black/40 neo-blur rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 text-foreground">No flashcards found</h3>
            <p className="text-gray-300 mb-6">
              {viewMode !== 'all'
                ? `No ${viewMode} topics found. Try a different filter.`
                : selectedSubject || selectedChapter
                  ? "Try selecting a different subject or chapter"
                  : "Create your first flashcard to get started"}
            </p>
            <Button asChild className="bg-primary hover:bg-primary/80 text-primary-foreground">
              <a href="/create">Create Flashcard</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcards;
