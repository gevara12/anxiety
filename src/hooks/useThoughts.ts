import { useState, useEffect } from 'react';

export interface Thought {
  id: string;
  content: string;
  timestamp: Date;
}

const STORAGE_KEY = 'anxiety-thoughts';

export function useThoughts() {
  const [thoughts, setThoughts] = useState<Thought[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        // Parse stored thoughts and convert timestamp strings back to Date objects
        return JSON.parse(stored, (key, value) => 
          key === 'timestamp' ? new Date(value) : value
        );
      } catch (e) {
        console.error('Failed to parse stored thoughts:', e);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(thoughts));
  }, [thoughts]);

  const addThought = (content: string) => {
    const thought: Thought = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
    };
    setThoughts(prev => [thought, ...prev]);
    return thought;
  };

  const deleteThought = (id: string) => {
    setThoughts(prev => prev.filter(t => t.id !== id));
  };

  return {
    thoughts,
    addThought,
    deleteThought
  };
}