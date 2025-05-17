
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(
    () => (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
  );

  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-400">
        {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
      </span>
      <Switch
        id="theme-mode"
        checked={theme === 'dark'}
        onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
      <label htmlFor="theme-mode" className="sr-only">
        Toggle theme
      </label>
    </div>
  );
};

export default ThemeToggle;
