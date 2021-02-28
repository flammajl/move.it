import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import SideBar from '@/components/SideBar';

import styles from '@/styles/pages/Leaderboard.module.css';
import Profile from '@/components/Profile';
import axios from 'axios';

interface RankingProps {
  level: number;
  challengesCompleted: number;
  image: string;
  name: string;
  email: string;
}

const Leaderboard: React.FC = () => {
  const [ranking, setRanking] = useState<RankingProps[]>([]);
  const router = useRouter();

  const [session] = useSession();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/ranking');
      setRanking(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Leaderboard | Move.it</title>
      </Head>
      <SideBar />
      <h1>Leaderboard</h1>

      <table>
        <thead>
          <tr>
            <th>Posição</th>
            <th>Usuário</th>
            <th>Desafios</th>
          </tr>
        </thead>

        <tbody>
          {ranking && ranking.map((rank) => (
            <tr className={styles.row} key={rank.email}>
              <td>1</td>
              <td>
                {rank.name}
              </td>
              <td>
                {rank.challengesCompleted}
                {' '}
                completados
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
