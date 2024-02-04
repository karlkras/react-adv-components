import AddTimer from './components/AddTimer.tsx';
import Header from './components/Header.tsx';
import Timers from './components/Timers.tsx';
import TimersContextProvider from "./store/timers-context.tsx";

function App() {
  return (
    <main>
      <TimersContextProvider>
        <Header/>
        <AddTimer/>
        <Timers/>
      </TimersContextProvider>
    </main>
  );
}

export default App;
