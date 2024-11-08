import React, { useState } from 'react';
import { Brain, Send, Moon, Sparkles } from 'lucide-react';
import AnxietyNote from './components/AnxietyNote';
import { useThoughts } from './hooks/useThoughts';

function App() {
  const { thoughts, addThought, deleteThought } = useThoughts();
  const [newThought, setNewThought] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThought.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addThought(newThought.trim());
      setNewThought('');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="min-h-screen px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '-4s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="glass-morphism p-3 rounded-full">
              <Brain className="text-purple-600 animate-float" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Освобождение от тревоги</h1>
          </div>
          <p className="text-gray-700 max-w-2xl mx-auto glass-morphism p-6 rounded-2xl">
            Отпустите свои тревожные мысли в цифровое пространство. Запишите их,
            примите их существование и отпустите. Наблюдайте, как они растворяются
            в пустоте, освобождая место для спокойствия и ясности.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-12">
          <div className="relative">
            <textarea
              value={newThought}
              onChange={(e) => setNewThought(e.target.value)}
              placeholder="Что вас беспокоит? Запишите свою тревожную мысль здесь..."
              className="w-full p-6 rounded-2xl glass-card resize-none h-32
                focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
            <button
              type="submit"
              disabled={isSubmitting || !newThought.trim()}
              className={`absolute bottom-4 right-4 p-3 rounded-full
                ${isSubmitting || !newThought.trim()
                  ? 'bg-gray-400/50 cursor-not-allowed'
                  : 'bg-purple-500/80 hover:bg-purple-600/80 transform hover:scale-110'
                }
                transition-all backdrop-blur-sm text-white shadow-lg`}
              aria-label="Отправить мысль"
            >
              <Send size={20} className={isSubmitting ? 'animate-spin' : ''} />
            </button>
          </div>
        </form>

        <div className="grid gap-6 md:grid-cols-2">
          {thoughts.map((thought) => (
            <AnxietyNote
              key={thought.id}
              thought={thought.content}
              onDelete={() => deleteThought(thought.id)}
            />
          ))}
        </div>

        {thoughts.length === 0 && (
          <div className="text-center py-12 glass-morphism rounded-2xl">
            <div className="relative inline-block">
              <Moon className="text-purple-600 mb-4 animate-float" size={48} />
              <Sparkles className="absolute top-0 right-0 text-yellow-400 animate-sparkle" size={20} />
            </div>
            <p className="text-gray-700 font-medium">
              Ваш разум чист. Когда появятся тревожные мысли, запишите их здесь.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;