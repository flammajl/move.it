import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/client';

import { CountdownProvider } from '@/contexts/CountdownContext';
import { ChallengesProvider } from '@/contexts/ChallengesContext';

import CompletedChallenges from '@/components/CompletedChallenges';
import Countdown from '@/components/Countdown';
import ExperienceBar from '@/components/ExperienceBar';
import Profile from '@/components/Profile';
import ChallengeBox from '@/components/ChallengeBox';
import SideBar from '@/components/SideBar';

import styles from '@/styles/pages/Challenge.module.css';
import axios from 'axios';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

const Challenge: React.FC<HomeProps> = ({ level, challengesCompleted, currentExperience }) => {
  const router = useRouter();

  const [session] = useSession();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session]);

  useEffect(() => {
    const postData = async () => {
      await axios.post('/api/create-user', {
        ...session.user,
        level,
        challengesCompleted,
        currentExperience,
      });
    };
    if (session && session.user) {
      postData();
    }
  }, []);

  return (
    <ChallengesProvider
      level={level}
      challengesCompleted={challengesCompleted}
      currentExperience={currentExperience}
    >

      <div className={styles.container}>
        <Head>
          <title>Challenge | Move.it</title>
        </Head>

        <SideBar />

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { level, currentExperience, challengesCompleted } = context.req.cookies;
  return {
    props: {
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience ?? 0),
      challengesCompleted: Number(challengesCompleted ?? 0),
    },
  };
};

export default Challenge;
