import "./App.css";
import Background from "./components/Background";
import CelestialClock from "./components/CelestialClock";

function App() {
  return (
    <main className="clock-canvas">
      <Background />
      <CelestialClock />
    </main>
  );
}

export default App;
