
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface AvatarSelectorProps {
  selectedAvatar: string;
  onSelectAvatar: (avatar: string) => void;
}

const AVATAR_OPTIONS = [
  { id: 'avatar-1', url: 'https://img.freepik.com/premium-vector/fitness-trainer-avatar-fitness-trainer-icon-vector-illustration_564659-259.jpg' },
  { id: 'avatar-2', url: 'https://img.freepik.com/premium-vector/cute-girl-doing-exercise-cartoon-vector-icon-illustration-people-sport-icon-concept-isolated_138676-5252.jpg' },
  { id: 'avatar-3', url: 'https://img.freepik.com/premium-vector/fitness-trainer-with-whistle-cartoon-character_180264-656.jpg' },
  { id: 'avatar-4', url: 'https://img.freepik.com/premium-vector/fitness-trainer-muscular-cartoon-character-vector-illustration_593228-175.jpg' },
  { id: 'avatar-5', url: 'https://img.freepik.com/free-vector/happy-fitness-coach-guy-portrait-fitness-trainer-coach-sport-club-sportsman-healthy-lifestyle-cartoon-character-illustration_109722-1785.jpg' },
  { id: 'avatar-6', url: 'https://img.freepik.com/premium-vector/cartoon-coach-woman-fitness-trainer-cute-girl-sportswear-show-muscle-biceps_501813-319.jpg' },
];

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ selectedAvatar, onSelectAvatar }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select Trainer Avatar</h3>
      
      <RadioGroup 
        value={selectedAvatar} 
        onValueChange={onSelectAvatar}
        className="grid grid-cols-3 gap-4"
      >
        {AVATAR_OPTIONS.map((avatar) => (
          <div key={avatar.id} className="flex flex-col items-center space-y-2">
            <Label 
              htmlFor={avatar.id} 
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <Avatar className={`h-16 w-16 border-2 ${selectedAvatar === avatar.url ? 'border-purple-600' : 'border-transparent'}`}>
                <AvatarImage src={avatar.url} alt="Avatar option" />
                <AvatarFallback>?</AvatarFallback>
              </Avatar>
              <RadioGroupItem 
                value={avatar.url} 
                id={avatar.id} 
                className="sr-only" 
              />
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default AvatarSelector;
