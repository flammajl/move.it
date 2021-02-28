import React, { useEffect } from 'react';
import Head from 'next/head';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import styles from '@/styles/pages/Home.module.css';

const Home: React.FC = () => {
  const router = useRouter();

  const [session] = useSession();

  useEffect(() => {
    if (session) {
      router.push('/challenge');
    }
  }, [session]);

  return (
    <div className={styles.containerWrapper}>
      <Head>
        <title>Início | Move.it</title>
      </Head>
      <section>
        <div>
          <img src="/logo-bg.png" alt="" />
        </div>

        <div className={styles.introWrapper}>
          <div className={styles.intro}>
            <div>
              <img src="/logo.svg" alt="" />
            </div>

            <div className={styles.login}>
              <strong>Bem-vindo</strong>

              <p>
                <img src="/icons/github.svg" alt="" />
                Faça login com seu Github para começar
              </p>

              <button className={styles.signInButton} type="button" onClick={() => signIn('github')}>Sign in</button>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
