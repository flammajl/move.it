import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import SideBar from "@/components/SideBar";

const Leaderboard: React.FC = () => {
  const router = useRouter();

  const [session] = useSession();

  useEffect(() => {
    if(!session){
      router.push('/');
    }
  },[session]);
  
  return (
    <div>
      <Head>
        <title>Leaderboard | Move.it</title>
      </Head>
      <SideBar />
      <h1 style={{textAlign: 'center'}}>Leaderboard</h1>
    </div>
  )
}

export default Leaderboard;