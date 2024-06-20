import styles from "./Track.module.css";
import { MouseEventHandler } from "react";
import { observer } from "mobx-react";
import { Image, SimpleCell, IconButton } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { Icon16MoreVertical } from "@vkontakte/icons";
import { calculateTime } from "../../utils/utils";
import { audioStore } from "../../store/AudioStore";
import { AudioPlayer } from "../AudioPlayer";

interface TrackProps {
  title: string;
  subtitle: string;
  trackPath: string;
  imageSrc: string;
}

export const Track = observer(
  ({ title, subtitle, trackPath, imageSrc }: TrackProps) => {
    const togglePlayPause: MouseEventHandler<HTMLElement> = () => {
      audioStore.setIsPlaying(!audioStore.isPlaying);
    };

    return (
      <SimpleCell
        className={styles.widget}
        before={
          <Image
            size={40}
            src={imageSrc}
            alt="Track"
            borderRadius={"m"}
            onClick={togglePlayPause}
          >
            {audioStore.isPlaying && (
              <Image.Overlay
                aria-label="Track"
                theme="dark"
                visibility={"always"}
              >
                <img src={"assets/wave.png"} alt="Play/Pause"></img>
              </Image.Overlay>
            )}
          </Image>
        }
        after={
          <div className={styles.right}>
            <div className={styles.time}>
              {audioStore.hasStarted
                ? calculateTime(audioStore.currentTime)
                : calculateTime(audioStore.duration)}
            </div>
            <IconButton label="Show more">
              <Icon16MoreVertical />
            </IconButton>
          </div>
        }
        subtitle={<p className={styles.subtitle}>{subtitle}</p>}
      >
        <AudioPlayer trackPath={trackPath} />
        <p className={styles.title}>{title}</p>
      </SimpleCell>
    );
  }
);
