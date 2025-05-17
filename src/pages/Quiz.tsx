import { useState, useEffect } from "react";
import FlashCard from "@/components/FlashCard";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Flashcard, Subject } from "@/lib/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/ThemeToggle";
import { Shuffle, Clock, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import UserProfile from "@/components/UserProfile";

interface QuizProps {
  flashcards: Flashcard[];
  subjects: Subject[];
  onKnownToggle: (id: string, known: boolean) => void;
  onMarkStrong: (id: string, isStrong: boolean) => void;
  strongTopics: string[];
}

interface QuizResult {
  id: string;
  question: string;
  answer: string;
  userInput: string;
  isCorrect: boolean;
  timeSpent: number;
}

const Quiz = ({ flashcards, subjects, onKnownToggle, onMarkStrong, strongTopics }: QuizProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredCards, setFilteredCards] = useState<Flashcard[]>([]);
  const [timerActive, setTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60); // 60 seconds default
  const [quizStarted, setQuizStarted] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [points, setPoints] = useState(0);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [averageAnswerTime, setAverageAnswerTime] = useState(0);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Filter flashcards based on selection
  useEffect(() => {
    let filtered = [...flashcards];
    
    if (selectedSubject) {
      filtered = filtered.filter(card => card.subjectId === selectedSubject);
    }
    
    // Shuffle the cards for quiz mode
    filtered = shuffleArray(filtered);
    
    setFilteredCards(filtered);
    setCurrentIndex(0);
  }, [flashcards, selectedSubject]);

  // Handle timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (timerActive && timeRemaining > 0 && quizStarted) {
      timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && quizStarted) {
      // Time's up logic
      setQuizStarted(false);
      setShowResults(true);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timerActive, timeRemaining, quizStarted]);

  const shuffleArray = (array: Flashcard[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const checkAnswer = () => {
    if (!quizStarted || !filteredCards.length) return;
    
    const currentCard = filteredCards[currentIndex];
    const endTime = Date.now();
    const timeSpent = (endTime - startTime) / 1000; // Convert to seconds
    
    // Case insensitive comparison and trimming whitespace
    const isCorrect = userInput.trim().toLowerCase() === currentCard.answer.trim().toLowerCase();
    
    // Record result
    setResults(prev => [
      ...prev, 
      {
        id: currentCard.id,
        question: currentCard.question,
        answer: currentCard.answer,
        userInput: userInput,
        isCorrect,
        timeSpent
      }
    ]);
    
    // Update points and show toast
    if (isCorrect) {
      setPoints(prev => prev + 1);
      onMarkStrong(currentCard.id, true);
      toast({
        title: "Correct!",
        description: "You gained 1 point.",
        variant: "default",
      });
    } else {
      onMarkStrong(currentCard.id, false);
      toast({
        title: "Incorrect",
        description: `The correct answer was: ${currentCard.answer}`,
        variant: "destructive",
      });
    }
    
    setTotalTimeSpent(prev => prev + timeSpent);
    setAverageAnswerTime((totalTimeSpent + timeSpent) / (results.length + 1));
    
    // Clear input and go to next card
    setUserInput("");
    setStartTime(Date.now()); // Reset start time for next question
    goToNextCard();
  };

  const goToNextCard = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // End of quiz
      setQuizStarted(false);
      setShowResults(true);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentIndex(0);
    setPoints(0);
    setResults([]);
    setShowResults(false);
    setUserInput("");
    setStartTime(Date.now());
    setTotalTimeSpent(0);
    setAverageAnswerTime(0);
    if (timerActive) {
      setTimeRemaining(60); // Reset timer
    }
  };

  const reshuffleCards = () => {
    setFilteredCards(shuffleArray([...filteredCards]));
    setCurrentIndex(0);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  // Calculate analytics
  const correctAnswers = results.filter(r => r.isCorrect).length;
  const incorrectAnswers = results.filter(r => !r.isCorrect).length;
  const weakTopicsCount = flashcards.length - strongTopics.length;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        subjects={subjects}
        selectedSubject={selectedSubject}
        selectedChapter={null}
        onSelectSubject={setSelectedSubject}
        onSelectChapter={() => {}}
      />

      <div className="flex-1 p-6 relative">
        <div className="absolute top-6 right-6 flex items-center gap-4 z-10">
          <UserProfile 
            strongTopics={strongTopics.length}
            weakTopics={weakTopicsCount}
            totalAnswered={results.length}
            averageTime={averageAnswerTime}
            correctAnswers={correctAnswers}
            incorrectAnswers={incorrectAnswers}
          />
        </div>

        <h1 className="text-3xl font-bold text-center mb-8 text-purple-300">
          Quiz Mode
          {selectedSubject && subjects.find(s => s.id === selectedSubject) && 
            ` - ${subjects.find(s => s.id === selectedSubject)?.name}`}
        </h1>

        {/* Quiz Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button 
              onClick={reshuffleCards} 
              variant="outline"
              className="flex items-center gap-2"
              disabled={!filteredCards.length}
            >
              <Shuffle size={16} />
              Reshuffle
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setTimerActive(!timerActive)} 
              variant={timerActive ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              <Clock size={16} />
              {timerActive ? "Timer On" : "Timer Off"}
            </Button>
          </div>
          
          <Button 
            onClick={startQuiz} 
            variant="default"
            className="bg-green-600 hover:bg-green-700"
            disabled={!filteredCards.length || quizStarted}
          >
            Start Quiz
          </Button>
        </div>

        {/* Points Display */}
        {quizStarted && (
          <div className="text-center mb-4">
            <span className="text-xl font-bold text-green-500">Points: {points}</span>
          </div>
        )}

        {timerActive && quizStarted && (
          <div className="text-center mb-6">
            <div className={`text-2xl font-bold ${timeRemaining <= 10 ? 'text-red-500' : 'text-foreground'}`}>
              Time: {timeRemaining} seconds
            </div>
          </div>
        )}

        {quizStarted && filteredCards.length > 0 ? (
          <>
            <div className="text-center mb-4">
              <span className="text-gray-300">
                Card {currentIndex + 1} of {filteredCards.length}
              </span>
              {strongTopics.includes(filteredCards[currentIndex].id) && (
                <Badge className="ml-2 bg-green-600">Strong Topic</Badge>
              )}
            </div>

            <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-lg mb-6">
              <div className="font-semibold mb-4 text-lg text-center">
                {filteredCards[currentIndex].question}
              </div>
              
              <div className="mt-6">
                <div className="mb-4">
                  <Input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your answer here..."
                    className="w-full"
                    autoFocus
                  />
                </div>
                <Button 
                  onClick={checkAnswer}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Submit Answer
                </Button>
              </div>
            </div>
          </>
        ) : showResults ? (
          <div className="bg-black/40 neo-blur rounded-lg shadow p-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-center text-foreground">Quiz Results</h3>
            <div className="text-center mb-6">
              <p className="text-xl mb-2">Final Score: <span className="font-bold text-green-500">{points}</span> / {results.length}</p>
              <p className="text-gray-300">
                Correct answers: {correctAnswers} | 
                Wrong answers: {incorrectAnswers}
              </p>
              {averageAnswerTime > 0 && (
                <p className="text-gray-300 flex items-center justify-center gap-1 mt-2">
                  <Clock size={16} />
                  Average answer time: {averageAnswerTime.toFixed(1)} seconds
                </p>
              )}
            </div>
            
            <div className="space-y-4 mt-6">
              <h4 className="font-semibold text-lg">Review:</h4>
              <div className="divide-y divide-gray-700">
                {results.map((result, idx) => (
                  <div key={idx} className="py-3">
                    <div className="flex items-start gap-2">
                      {result.isCorrect ? 
                        <CheckCircle className="text-green-500 mt-1" size={18} /> : 
                        <XCircle className="text-red-500 mt-1" size={18} />
                      }
                      <div>
                        <p className="font-medium">{result.question}</p>
                        <p className="text-sm text-gray-400">Your answer: <span className={result.isCorrect ? "text-green-500" : "text-red-500"}>{result.userInput}</span></p>
                        {!result.isCorrect && 
                          <p className="text-sm text-gray-400">Correct answer: <span className="text-green-500">{result.answer}</span></p>
                        }
                        <p className="text-xs text-gray-500 mt-1">Time spent: {result.timeSpent.toFixed(1)}s</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button onClick={startQuiz} className="bg-green-600 hover:bg-green-700">
                Start New Quiz
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center p-12 bg-black/40 neo-blur rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              {filteredCards.length === 0 
                ? "No flashcards found for quiz" 
                : quizStarted 
                  ? "Quiz completed!" 
                  : "Ready to start quiz?"}
            </h3>
            <p className="text-gray-300 mb-6">
              {filteredCards.length === 0 
                ? selectedSubject 
                  ? "Try selecting a different subject or create more flashcards" 
                  : "Select a subject to start or choose 'All Subjects'"
                : quizStarted 
                  ? "You've completed all the flashcards!"
                  : "Press Start Quiz to begin"}
            </p>
            {filteredCards.length === 0 && (
              <Button asChild className="bg-primary hover:bg-primary/80 text-primary-foreground">
                <a href="/create">Create Flashcard</a>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
