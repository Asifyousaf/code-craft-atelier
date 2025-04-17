
import { useState, useEffect, useRef } from 'react';

// Sound types available in the app
type SoundType = 'meditation' | 'ambient' | 'nature' | 'chimes';

// Sound library with URLs
const soundLibrary: Record<SoundType, string> = {
  meditation: 'https://soundbible.com/mp3/Tibetan%20Singing%20Bowl-SoundBible.com-331809129.mp3',
  ambient: 'https://soundbible.com/mp3/rain_ambient-GlorySunz-1566213269.mp3',
  nature: 'https://soundbible.com/mp3/birds-singing-02-20131124-17380296.mp3',
  chimes: 'https://soundbible.com/mp3/Japanese%20Temple%20Bell%20Small-SoundBible.com-113624364.mp3'
};

interface SoundOptions {
  volume?: number;
  loop?: boolean;
  onEnded?: () => void;
}

const useSounds = () => {
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const [isLoaded, setIsLoaded] = useState<Record<SoundType, boolean>>({
    meditation: false,
    ambient: false,
    nature: false,
    chimes: false
  });

  // Preload sounds
  useEffect(() => {
    const loadSounds = async () => {
      const loadPromises = Object.entries(soundLibrary).map(([key, url]) => {
        return new Promise<void>((resolve) => {
          const audio = new Audio(url);
          audio.preload = 'auto';
          audio.addEventListener('canplaythrough', () => {
            setIsLoaded(prev => ({ ...prev, [key]: true }));
            resolve();
          });
          audioRefs.current[key] = audio;
        });
      });
      
      try {
        await Promise.all(loadPromises);
      } catch (error) {
        console.error("Failed to load some sounds:", error);
      }
    };
    
    loadSounds();
    
    // Cleanup
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
    };
  }, []);

  const play = (type: SoundType, options: SoundOptions = {}) => {
    const { volume = 0.5, loop = false, onEnded } = options;
    const audio = audioRefs.current[type];
    
    if (audio) {
      audio.volume = volume;
      audio.loop = loop;
      
      if (onEnded) {
        audio.onended = onEnded;
      }
      
      // Reset time to start if it was already played
      audio.currentTime = 0;
      
      // Play with user interaction handling
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Playback prevented by browser:", error);
        });
      }
    }
  };

  const pause = (type: SoundType) => {
    const audio = audioRefs.current[type];
    if (audio) {
      audio.pause();
    }
  };

  const stop = (type: SoundType) => {
    const audio = audioRefs.current[type];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const stopAll = () => {
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  };

  return { play, pause, stop, stopAll, isLoaded };
};

export default useSounds;
