import { createContext, ReactNode, useContext, useReducer } from "react";


export type Timer = {
  name: string;
  duration: number;
  id: string;
}

type TimersState = {
  isRunning: boolean;
  timers: Timer[]
}

const initialState: TimersState = {
  isRunning: false,
  timers: []
}

type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void,
  startTimers: () => void,
  stopTimers: () => void
}

const TimersContext = createContext<TimersContextValue | null>(null);

export const useTimersContext = () => {
  const timersCtx = useContext(TimersContext);

  if (timersCtx === null) {
    throw new Error("oops");
  }
  return timersCtx;

}

type TimersContextProviderProps = {
  children: ReactNode
}

type StartTimersAction = {
  type: "START_TIMERS"
}

type StopTimersAction = {
  type: "STOP_TIMERS"
}

type AddTimerAction = {
  type: "ADD_TIMER",
  payload: Timer
}

type Action = StartTimersAction | StopTimersAction | AddTimerAction;


const timersReducer = (state: TimersState, action: Action): TimersState => {
  switch (action.type) {
    case "ADD_TIMER":
      return {...state, timers: [
          ...state.timers,
          {
            name: action.payload.name,
            duration: action.payload.duration,
            id: Math.random().toString()
          }
        ]}
    case "START_TIMERS":
      return {...state, isRunning: true}
    case "STOP_TIMERS":
      return {...state, isRunning: false}
    default:
      return state;
  }
}

const TimersContextProvider = ({children}: TimersContextProviderProps) => {
  const [timersState, dispatch] = useReducer(timersReducer, initialState);
  const ctx: TimersContextValue = {
    isRunning: timersState.isRunning,
    timers: timersState.timers,
    addTimer(timerData: Timer) {
      dispatch({type: "ADD_TIMER", payload: timerData});
    },
    startTimers() {
      dispatch({type: "START_TIMERS"});
    },
    stopTimers() {
      // todo
      dispatch({type: "STOP_TIMERS"});
    }
  }
  return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>

}

export default TimersContextProvider;