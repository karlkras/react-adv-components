import Container from './UI/Container.tsx';
import { type Timer as TimerProps, useTimersContext } from '../store/timers-context.tsx';
import { useEffect, useRef, useState } from "react";

const Timer = ({name, duration}: TimerProps) => {
  const intervalRef = useRef<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(duration * 1000);
  const { isRunning } = useTimersContext();
  const timeInterval = 50;

  if (remainingTime <= 0) {
    if (intervalRef.current)
      clearInterval(intervalRef.current);
  }

  useEffect(() => {
    let interval: number;
    if(isRunning) {
      interval = window.setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            return prevTime;
          }
          return prevTime - timeInterval;
        });
      }, timeInterval);
      intervalRef.current = interval;
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(interval)
  }, [isRunning]);

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>
        <progress max={duration * 1000} value={remainingTime}/>
      </p>
      <p>Time Remaining {formattedRemainingTime}</p>
    </Container>
  );
}

export default Timer;
