import { makeAutoObservable } from "mobx";

class AudioStore {
  isPlaying = false;
  duration = 0;
  currentTime = 0;
  hasStarted = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsPlaying(value: boolean) {
    this.isPlaying = value;
  }

  setDuration(value: number) {
    this.duration = value;
  }

  setCurrentTime(value: number) {
    this.currentTime = value;
  }

  setHasStarted(value: boolean) {
    this.hasStarted = value;
  }
}

export const audioStore = new AudioStore();
