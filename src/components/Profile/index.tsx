import { ChallengesContext } from '@/contexts/ChallengesContext';
import styles from '@/styles/components/Profile.module.css';
import { useContext } from 'react';

const Profile = () => {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/flammajl.png" alt="Avatar do Perfil"/>
      <div>
        <strong>João Luiz</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </div>
  );
}

export default Profile;