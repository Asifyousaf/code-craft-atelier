
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Clock, Waves, SkipForward } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import useSounds from '../hooks/useSounds';

interface MindfulnessSessionProps {
  sessionType: string;
  duration: number;
  onComplete: () => void;
  onCancel: () => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const MindfulnessSession: React.FC<MindfulnessSessionProps> = ({ 
  sessionType, 
  duration, 
  onComplete, 
  onCancel 
}) => {
  const [isPaused, setIsPaused] = useState(true);
  const [timeLeft, setTimeLeft] = useState(duration * 60); // convert minutes to seconds
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [soundType, setSoundType] = useState<'meditation' | 'ambient' | 'nature'>('meditation');
  const [showControls, setShowControls] = useState(true);
  
  const { play, pause, stop, isLoaded } = useSounds();

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (!isPaused && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPaused, timeLeft]);

  // Play appropriate sound when session starts or sound type changes
  useEffect(() => {
    if (!isPaused && isLoaded[soundType]) {
      const actualVolume = isMuted ? 0 : volume / 100;
      play(soundType, { volume: actualVolume, loop: true });
    }
    
    return () => {
      stop(soundType);
    };
  }, [isPaused, soundType, volume, isMuted]);

  const handlePlayPause = () => {
    if (isPaused) {
      setIsPaused(false);
      toast({
        title: "Session Started",
        description: `Your ${sessionType.toLowerCase()} session has begun.`,
      });
      
      // Play chimes sound to signal start
      if (isLoaded.chimes) {
        play('chimes', { volume: (isMuted ? 0 : volume / 100) });
      }
      
    } else {
      setIsPaused(true);
      pause(soundType);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
    
    // Update playing sound volume if session is active
    if (!isPaused && isLoaded[soundType]) {
      pause(soundType);
      play(soundType, { volume: newVolume / 100, loop: true });
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    
    // Update sound if playing
    if (!isPaused && isLoaded[soundType]) {
      if (!isMuted) {
        // Muting
        pause(soundType);
      } else {
        // Unmuting
        play(soundType, { volume: volume / 100, loop: true });
      }
    }
  };

  const handleComplete = () => {
    stop(soundType);
    
    // Play completion sound
    if (isLoaded.chimes) {
      play('chimes', { volume: (isMuted ? 0 : volume / 100) });
    }
    
    toast({
      title: "Session Completed",
      description: `Well done! You've completed your ${sessionType.toLowerCase()} session.`,
    });
    
    onComplete();
  };

  const handleCancel = () => {
    stop(soundType);
    onCancel();
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div>{sessionType} Session</div>
          <div className="text-sm font-normal bg-purple-100 text-purple-800 px-2 py-1 rounded-full flex items-center">
            <Clock className="h-3 w-3 mr-1" /> {duration} min
          </div>
        </CardTitle>
        <CardDescription>Focus on your breath and clear your mind</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Timer Display */}
        <div className="text-center py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={timeLeft}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="text-6xl font-bold text-purple-800"
            >
              {formatTime(timeLeft)}
            </motion.div>
          </AnimatePresence>

          <Progress 
            value={progress} 
            className="h-2 mt-6" 
          />
        </div>

        {/* Play/Pause Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayPause}
            className={`rounded-full p-6 ${
              isPaused 
                ? 'bg-purple-600 text-white hover:bg-purple-700' 
                : 'bg-amber-500 text-white hover:bg-amber-600'
            }`}
          >
            {isPaused ? (
              <Play className="h-12 w-12" />
            ) : (
              <Pause className="h-12 w-12" />
            )}
          </motion.button>
        </div>

        {/* Sound Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-50 p-4 rounded-lg space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium flex items-center">
                  <Waves className="h-4 w-4 mr-2" /> 
                  Sound Settings
                </h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowControls(false)}
                >
                  Hide
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Sound Type</Label>
                  <Select 
                    value={soundType}
                    onValueChange={(value: any) => setSoundType(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sound type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meditation">Meditation Bells</SelectItem>
                      <SelectItem value="ambient">Ambient Rain</SelectItem>
                      <SelectItem value="nature">Birds Singing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Volume</Label>
                    <button
                      onClick={handleMuteToggle}
                      className="text-gray-500 hover:text-purple-600"
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                  </div>
                  <Slider
                    value={[volume]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                    className={isMuted ? "opacity-50" : ""}
                    disabled={isMuted}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="auto-bell"
                    checked={true}
                    onCheckedChange={() => {}}
                  />
                  <Label htmlFor="auto-bell">Play bell at start and end</Label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!showControls && (
          <Button 
            variant="ghost" 
            className="w-full text-sm text-gray-500"
            onClick={() => setShowControls(true)}
          >
            Show Sound Controls
          </Button>
        )}
        
        <div className="text-center text-sm text-gray-500">
          <p>Find a comfortable position and focus on your breath.</p>
          <p>Allow thoughts to pass without judgment.</p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleCancel}>
          End Session
        </Button>
        <Button 
          onClick={handleComplete}
          className="flex items-center"
        >
          <SkipForward className="h-4 w-4 mr-2" />
          Complete Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MindfulnessSession;
