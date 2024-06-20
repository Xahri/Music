import "./App.css";
import { Track } from "./components/track/Track";

function App() {
  return (
    <Track
      title="Black Out Days"
      subtitle="Phantogram"
      trackPath="src/assets/Phantogram - Black Out Days.mp3"
      imageSrc="src/assets/phantogram-voices.jpg"
    />
  );
}

export default App;
