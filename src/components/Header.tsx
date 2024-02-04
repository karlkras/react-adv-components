import Button from './UI/Button.tsx';
import { useTimersContext } from "../store/timers-context.tsx";

export default function Header() {
  const timerCtx = useTimersContext();

  return (
    <header>
      <h1>ReactTimer</h1>

      <Button onClick={timerCtx.isRunning ? timerCtx.stopTimers : timerCtx.startTimers} el={"button"}>{timerCtx.isRunning ? "Stop" : "Start"} Timers</Button>
    </header>
  );
}
