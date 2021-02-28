import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import LevelUpModal from '@/components/LevelUpModal';
import axios from 'axios';
import { useSession } from 'next-auth/client';
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

  const [session] = useSession();

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/user/${session.user.email}`);

      Cookies.set('level', String(response.data.user.level));
      Cookies.set('currentExperience', String(response.data.user.currentExperience));
      Cookies.set('challengesCompleted', String(response.data.user.challengesCompleted));

      setLevel(response.data.user.level);
      setCurrentExperience(response.data.user.currentExperience);
      setChallengesCompleted(response.data.user.challengesCompleted);
    };
    if (session && session.user) {
      getData();
    }
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  const updateLevel = async () => {
    try {
      await axios.put(`/api/update-level/${session.user.email}`, {
        level: level + 1,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updatechallengesCompleted = async () => {
    try {
      await axios.put(`/api/update-challenges/${session.user.email}`, {
        challengesCompleted: challengesCompleted + 1,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updatecurrentExperience = async (finalExperience) => {
    try {
      await axios.put(`/api/update-experience/${session.user.email}`, {
        currentExperience: finalExperience,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const leveUp = () => {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
    updateLevel();
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
    updatecurrentExperience(finalExperience);
    updatechallengesCompleted();
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
