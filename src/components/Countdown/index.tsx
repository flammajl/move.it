import { ChallengesContext } from '@/contexts/ChallengesContext';
import styles from '@/styles/components/Countdown.module.css';
import { useContext, useEffect, useState } from 'react';

const Countdown = () => {
  const [time, setTime] = useState(0.05 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const { startNewChallenge } = useContext(ChallengesContext);

  let countdownTimeout: NodeJS.Timeout;

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  const startCountdown = () => {
    setIsActive(true);
  };

  const resetCountdown = () => {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.05 * 60);
  }

  useEffect(() => {
    if(isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if ( isActive && time === 0) {
      setIsActive(false);
      setHasFinished(true);
      startNewChallenge();
    }
  },[isActive, time])

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button 
        type="button"
        disabled
        className={styles.countdownButton} 
      >
        Ciclo encerrado
      </button>
      ) : (
        <>
          {isActive ? (
          <button 
          type="button"
          className={`${styles.countdownButton} ${styles.countdownButtonActive}`} 
          onClick={resetCountdown}
        >
          Abandonar ciclo
        </button>
        ) : (
          <button 
          type="button" 
          className={styles.countdownButton} 
          onClick={startCountdown}
        >
          Iniciar um ciclo
        </button>
        )}
        </>
      )}
      
      
    </div>
  );
}

export default Countdown;