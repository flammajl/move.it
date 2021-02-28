import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import LevelUpModal from '@/components/LevelUpModal';
import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengerProviderData {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  leveUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengeProviderProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengerProviderData);

export const ChallengesProvider: React.FC<ChallengeProviderProps> = ({
  children,
  ...rest
}) => {
  const [level, setLevel] = useState(rest.level);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 5, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  const leveUp = () => {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  };

  const closeLevelUpModal = () => {
    setIsLevelUpModalOpen(false);
  };

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount} xp`,
      });
    }
  };

  const resetChallenge = () => {
    setActiveChallenge(null);
  };

  const completeChallenge = () => {
    if (!activeChallenge) return;

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      leveUp();
    }

    setCurrentExperience(finalExperience);
    setChallengesCompleted(challengesCompleted + 1);
    setActiveChallenge(null);
  };

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        leveUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
};
