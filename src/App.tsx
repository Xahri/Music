import "./App.css";
import { Track } from "./components/track/Track";

function App() {
  return (
    <Track
      title="Black Out Days"
      subtitle="Phantogram"
      trackPath="assets\Phantogram - Black Out Days.mp3"
      imageSrc="assets\phantogram-voices.jpg"
    />
  );
}

export default App;
