'use client';

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'omdb_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error('Failed to save favorites:', error);
      }
    }
  }, [favorites, isLoaded]);

  const addFavorite = useCallback((imdbID: string) => {
    setFavorites(prev => [...prev, imdbID]);
  }, []);

  const removeFavorite = useCallback((imdbID: string) => {
    setFavorites(prev => prev.filter(id => id !== imdbID));
  }, []);

  const toggleFavorite = useCallback((imdbID: string) => {
    setFavorites(prev => 
      prev.includes(imdbID) 
        ? prev.filter(id => id !== imdbID)
        : [...prev, imdbID]
    );
  }, []);

  const isFavorite = useCallback((imdbID: string) => {
    return favorites.includes(imdbID);
  }, [favorites]);  

  return {
    favorites,
    isLoaded,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
}