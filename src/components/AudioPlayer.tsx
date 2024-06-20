import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { reaction } from "mobx";
import { audioStore } from "../store/AudioStore";

interface AudioPlayerProps {
  trackPath: string;
}

export const AudioPlayer = observer(({ trackPath }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      audioStore.setDuration(Math.floor(audio!.duration));
    };

    const handleTimeUpdate = () => {
      audioStore.setCurrentTime(Math.floor(audio!.currentTime));
    };

    const handleTrackEnded = () => {
      audioStore.setIsPlaying(false);
      audioStore.setCurrentTime(0);
      audioStore.setHasStarted(false);
    };

    audio!.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio!.addEventListener("timeupdate", handleTimeUpdate);
    audio!.addEventListener("ended", handleTrackEnded);

    return () => {
      audio!.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio!.removeEventListener("timeupdate", handleTimeUpdate);
      audio!.removeEventListener("ended", handleTrackEnded);
    };
  }, []);

  useEffect(() => {
    const disposeReaction = reaction(
      () => audioStore.isPlaying,
      (isPlaying) => {
        if (isPlaying) {
          audioRef.current!.play();
          audioStore.setHasStarted(true);
        } else {
          audioRef.current!.pause();
        }
      }
    );

    return () => {
      disposeReaction();
    };
  }, []);

  return <audio ref={audioRef} src={trackPath} preload="metadata"></audio>;
});
