
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Subject } from "@/lib/types";
import { Menu, X, Book, BookOpen, FolderOpen, Folder, ChevronDown, ChevronUp, Shuffle } from "lucide-react";

interface SidebarProps {
  subjects: Subject[];
  selectedSubject: string | null;
  selectedChapter: string | null;
  onSelectSubject: (subjectId: string) => void;
  onSelectChapter: (chapterId: string) => void;
}

const Sidebar = ({
  subjects,
  selectedSubject,
  selectedChapter,
  onSelectSubject,
  onSelectChapter,
}: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubject = (subjectId: string) => {
    setExpandedSubjects(prev => ({
      ...prev,
      [subjectId]: !prev[subjectId]
    }));
  };

  const handleSubjectClick = (subjectId: string) => {
    // Set the subject selection
    onSelectSubject(subjectId);
    
    // Clear any chapter selection so we see ALL cards from the subject
    onSelectChapter(null);
    
    // Toggle the expansion state in the UI
    toggleSubject(subjectId);
    
    // If we're not already on the flashcards page, navigate there
    if (!location.pathname.includes('/flashcards')) {
      navigate('/flashcards');
    }
  };

  const handleChapterClick = (chapterId: string) => {
    // Find which subject this chapter belongs to
    const parentSubject = subjects.find(subject => 
      subject.chapters.some(chapter => chapter.id === chapterId)
    );
    
    if (parentSubject) {
      // First select the parent subject
      onSelectSubject(parentSubject.id);
      
      // Make sure the subject is expanded
      setExpandedSubjects(prev => ({
        ...prev,
        [parentSubject.id]: true
      }));
    }
    
    // Then select the chapter
    onSelectChapter(chapterId);
    
    // If we're not already on the flashcards page, navigate there
    if (!location.pathname.includes('/flashcards')) {
      navigate('/flashcards');
    }
  };

  return (
    <>
      {/* Mobile sidebar toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-50 lg:hidden bg-black/70"
        onClick={toggleSidebar}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <div
        className={`w-64 bg-black text-white border-r border-purple-900/30 flex-shrink-0 transition-all duration-300 ease-in-out overflow-y-auto h-screen fixed lg:static z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4">
          <div className="mb-8">
            <Link to ="/">
            <h2 className="text-xl font-bold mb-2 text-purple-300">FlashCards</h2>
            </Link>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm" variant="outline" className="border-purple-500/50 hover:bg-purple-900/20">
                <Link to="/flashcards">All Cards</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="border-purple-500/50 hover:bg-purple-900/20">
                <Link to="/create">Create</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="border-purple-500/50 hover:bg-purple-900/20">
                <Link to="/quiz">
                  <Shuffle size={16} className="mr-1" />
                  Quiz
                </Link>
              </Button>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-2 text-gray-300">Subjects</h3>
          
          {subjects.map((subject) => (
            <div key={subject.id} className="space-y-2">
              <div
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                  selectedSubject === subject.id ? "bg-purple-900/30 text-purple-300" : "hover:bg-gray-900"
                }`}
                onClick={() => handleSubjectClick(subject.id)}
              >
                <div className="flex items-center">
                  {expandedSubjects[subject.id] ? (
                    <FolderOpen size={18} className="mr-2 text-purple-400" />
                  ) : (
                    <Folder size={18} className="mr-2 text-purple-400" />
                  )}
                  <span>{subject.name}</span>
                </div>
                {expandedSubjects[subject.id] ? (
                  <ChevronUp size={18} className="text-purple-400" />
                ) : (
                  <ChevronDown size={18} className="text-purple-400" />
                )}
              </div>
              
              {expandedSubjects[subject.id] && (
                <div className="pl-6 space-y-1">
                  {subject.chapters.map((chapter) => (
                    <div
                      key={chapter.id}
                      className={`flex items-center p-2 rounded-md cursor-pointer ${
                        selectedChapter === chapter.id ? "bg-purple-900/30 text-purple-300" : "hover:bg-gray-900"
                      }`}
                      onClick={() => handleChapterClick(chapter.id)}
                    >
                      <BookOpen size={16} className="mr-2 text-purple-400" />
                      <span>{chapter.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
