
import { useState, useEffect, useRef } from 'react';

// Sound types available in the app
export type SoundType = 'meditation' | 'ambient' | 'nature' | 'chimes' | 'beep' | 'success' | 'failure' | 'notification';

// Sound library with URLs
const soundLibrary: Record<SoundType, string> = {
  meditation: 'https://soundbible.com/mp3/Tibetan%20Singing%20Bowl-SoundBible.com-331809129.mp3',
  ambient: 'https://soundbible.com/mp3/rain_ambient-GlorySunz-1566213269.mp3',
  nature: 'https://soundbible.com/mp3/birds-singing-02-20131124-17380296.mp3',
  chimes: 'https://soundbible.com/mp3/Japanese%20Temple%20Bell%20Small-SoundBible.com-113624364.mp3',
  beep: 'https://soundbible.com/mp3/Electronic_Chime-KevanGC-495939803.mp3',
  success: 'https://soundbible.com/mp3/success-1-6297.mp3',
  failure: 'https://soundbible.com/mp3/system-fault-518.mp3',
  notification: 'https://soundbible.com/mp3/notification-sound-7062.mp3'
};

export interface SoundOptions {
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
    chimes: false,
    beep: false,
    success: false,
    failure: false,
    notification: false
  });
  const [isMuted, setIsMuted] = useState(false);

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
          
          // Add error handling
          audio.addEventListener('error', () => {
            console.error(`Failed to load sound: ${key}`);
            resolve(); // Resolve anyway to not block other sounds
          });
          
          audioRefs.current[key] = audio;
        });
      });
      
      try {
        await Promise.all(loadPromises);
        console.log("All sounds loaded successfully");
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

  const setGlobalMute = (muted: boolean) => {
    setIsMuted(muted);
    
    // Apply to all currently playing sounds
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) {
        audio.muted = muted;
      }
    });
  };

  const play = (type: SoundType, options: SoundOptions = {}) => {
    const { volume = 0.5, loop = false, onEnded } = options;
    const audio = audioRefs.current[type];
    
    if (audio) {
      audio.volume = volume;
      audio.loop = loop;
      audio.muted = isMuted;
      
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
      
      return audio; // Return the audio element for more control
    }
    
    return null;
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

  const setVolume = (type: SoundType, volume: number) => {
    const audio = audioRefs.current[type];
    if (audio) {
      audio.volume = Math.max(0, Math.min(1, volume)); // Ensure volume is between 0 and 1
    }
  };

  const isPlaying = (type: SoundType) => {
    const audio = audioRefs.current[type];
    return audio ? !audio.paused : false;
  };

  return { 
    play, 
    pause, 
    stop, 
    stopAll, 
    setVolume,
    setGlobalMute,
    isPlaying,
    isLoaded,
    isMuted
  };
};

export default useSounds;
