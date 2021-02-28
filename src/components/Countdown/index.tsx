import { CountdownContext } from '@/contexts/CountdownContext';
import React, { useContext } from 'react';
import { FiX } from 'react-icons/fi';
import styles from '@/styles/components/Countdown.module.css';

const Countdown = () => {
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    resetCountdown,
    startCountdown,
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

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
          <img className={styles.checkCircle} src="/icons/check-circle.svg" alt="Check Circle" />
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
              <FiX className={styles.buttonX} />
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
              <img className={styles.playArrow} src="/icons/play-arrow.svg" alt="Play Arrow" />
            </button>
          )}
        </>
      )}

    </div>
  );
};

export default Countdown;
