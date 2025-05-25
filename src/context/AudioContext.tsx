import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  volume: number;
  setVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Audio tracks for different themes
const AUDIO_TRACKS = {
  default: 'https://assets.codepen.io/2/ambient.mp3',
  gadgets: 'https://assets.codepen.io/2/ambient.mp3',
  watches: 'https://assets.codepen.io/2/ambient.mp3',
  phones: 'https://assets.codepen.io/2/ambient.mp3',
  laptops: 'https://assets.codepen.io/2/ambient.mp3',
  accessories: 'https://assets.codepen.io/2/ambient.mp3',
};

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);

  useEffect(() => {
    const audioElement = new Audio(AUDIO_TRACKS.default);
    audioElement.loop = true;
    audioElement.volume = volume;
    setAudio(audioElement);

    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
      }
    };
  }, []);

  useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
  }, [volume, audio]);

  const toggleAudio = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio, volume, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};