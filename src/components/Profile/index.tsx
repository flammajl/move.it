import React, { useContext } from 'react';

import { useSession } from 'next-auth/client';

import { ChallengesContext } from '@/contexts/ChallengesContext';
import styles from '@/styles/components/Profile.module.css';

const Profile = () => {
  const { level } = useContext(ChallengesContext);

  const [session] = useSession();

  return (
    <>
      {session && (
        <div className={styles.profileContainer}>
          <img src={session.user.image} alt="Avatar do Perfil" />
          <div>
            <strong>{session.user.name}</strong>
            <p>
              <img src="icons/level.svg" alt="Level" />
              Level
              {' '}
              {level}
            </p>
          </div>
        </div>
      )}
    </>

  );
};

export default Profile;
