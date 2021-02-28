import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import SideBar from "@/components/SideBar";

import styles from '@/styles/pages/Leaderboard.module.css';
import Profile from "@/components/Profile";

const Leaderboard: React.FC = () => {
  const router = useRouter();

  const [session] = useSession();

  useEffect(() => {
    if(!session){
      router.push('/');
    }
  },[session]);
  
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
            <th>Experiência</th>
          </tr>
        </thead>

        <tbody>
          <tr className={styles.row}>
            <td>1</td>
            <td>
              <Profile />
            </td>
            <td>100 completados</td>
            <td>1200 xp</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard;