import { useRef } from 'react';

import Button from './UI/Button.tsx';
import Form, { FormHandle } from './UI/Form.tsx';
import Input from './UI/Input.tsx';
import { useTimersContext } from "../store/timers-context.tsx";

export default function AddTimer() {
  const form = useRef<FormHandle>(null);
  const timerCtx = useTimersContext();

  function handleSaveTimer(data: unknown) {
    const extractedData = data as { 'timer-name': string; 'timer-duration': string };
    console.log(extractedData);
    timerCtx.addTimer(
      { name: extractedData['timer-name'], duration: Number(extractedData['timer-duration'])} );
    form.current?.clear();
  }

  return (
    <Form ref={form} onSave={handleSaveTimer} id="add-timer">
      <Input type="text" label="Name" id="timer-name" required/>
      <Input type="number" label="Duration" id="timer-duration" required/>
      <p>
        <Button className="button" el="button">Add Timer</Button>
      </p>
    </Form>
  );
}
