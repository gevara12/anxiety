import React from 'react';
import { Trash2, Sparkles } from 'lucide-react';

interface AnxietyNoteProps {
  thought: string;
  onDelete: () => void;
}

export default function AnxietyNote({ thought, onDelete }: AnxietyNoteProps) {
  const [isDestroying, setIsDestroying] = React.useState(false);

  const handleDestroy = () => {
    setIsDestroying(true);
    setTimeout(() => {
      onDelete();
    }, 1000);
  };

  return (
    <div
      className={`relative glass-card p-6 rounded-2xl transition-all duration-1000 transform 
        ${isDestroying ? 'scale-0 rotate-180 opacity-0' : 'scale-100 hover:scale-102'}`}
    >
      <p className="text-gray-700 font-light leading-relaxed">{thought}</p>
      <div className="absolute -top-2 -right-2 flex gap-2">
        <button
          onClick={handleDestroy}
          className="glass-morphism bg-rose-500/80 hover:bg-rose-600/80 text-white p-2 
            rounded-full shadow-lg transform transition-all hover:scale-110 hover:rotate-12"
          aria-label="Уничтожить мысль"
        >
          <Trash2 size={16} />
        </button>
      </div>
      {isDestroying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="text-purple-500 animate-sparkle" size={24} />
        </div>
      )}
    </div>
  );
}