
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Flashcard as FlashcardType } from '@/lib/types';
import { Check, X } from 'lucide-react';

interface FlashCardProps {
  flashcard: FlashcardType;
  onKnown: (id: string) => void;
  onUnknown: (id: string) => void;
  onMarkStrong: (id: string) => void;
}

const FlashCard = ({ flashcard, onKnown, onUnknown, onMarkStrong }: FlashCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnown = () => {
    onKnown(flashcard.id);
    onMarkStrong(flashcard.id); // Mark as strong topic when user knows it
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      <div 
        className={`flashcard ${isFlipped ? 'flipped' : ''} h-64 md:h-80 cursor-pointer`} 
        onClick={handleFlip}
      >
        <div className="flashcard-inner h-full">
          <div className="flashcard-front neo-blur p-8 rounded-lg shadow-lg">
            <div className="text-xl md:text-2xl font-semibold text-center">
              {flashcard.question}
            </div>
            <div className="text-sm text-gray-400 absolute bottom-4 right-4">
              Click to flip
            </div>
          </div>
          <div className="flashcard-back neo-blur p-8 rounded-lg shadow-lg">
            <div className="text-xl md:text-2xl text-center">
              {flashcard.answer}
            </div>
            <div className="text-sm text-gray-400 absolute bottom-4 right-4">
              Click to flip back
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button 
          onClick={() => onUnknown(flashcard.id)} 
          variant="destructive"
          className="flex items-center gap-2"
        >
          <X size={18} />
          Don't Know
        </Button>
        <Button 
          onClick={handleKnown}
          className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
        >
          <Check size={18} />
          Know
        </Button>
      </div>
    </div>
  );
};

export default FlashCard;
