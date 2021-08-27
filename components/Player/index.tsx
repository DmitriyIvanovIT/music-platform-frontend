import React, {useEffect, useState} from 'react';
import {Pause, PlayArrow, VolumeOff, VolumeUp} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import styles from './Player.module.scss';
import Link from "next/link";
import {Grid} from "@material-ui/core";
import TrackProgress from "@/components/TrackProgress";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";

let audio: HTMLAudioElement;

const Player = (): JSX.Element | null => {
  const [sound, setSound] = useState(true);
  const { pause, active, duration, currentTime, volume } = useTypedSelector(state => state.player);
  const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration } = useActions();

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      play();
    }
  }, [active]);

  const setAudio = () => {
    if (active) {
      audio.src = 'http://localhost:5000/' + active.audio;
      audio.volume = sound ? volume / 100 : 0;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      }
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      }
    }
  }

  const play = () => {
    if (pause) {
      playTrack();
      audio?.play();
    } else {
      pauseTrack();
      audio?.pause();
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (sound) {
      audio.volume = Number(e.target.value) / 100;
      setVolume(Number(e.target.value));
    }
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };

  if (!active) {
    return null;
  }

  return (
    <div className={styles.player}>
      <IconButton onClick={play}>
        {!pause
          ? <Pause/>
          : <PlayArrow/>
        }
      </IconButton>
      <Grid container direction="column" className={styles.track__info}>
        <Link href={`/tracks/${active?._id}`}>
          <a className={styles.track__name}>
            {active?.name}
          </a>
        </Link>
        <div className={styles.track__artist}>{active?.artist}</div>
      </Grid>
      <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} type={'timeline'} />
      <IconButton onClick={() => setSound(!sound)} className={styles.volume__btn}>
        {sound
          ? <VolumeUp/>
          : <VolumeOff />
        }
      </IconButton>
      <TrackProgress left={sound ? volume : 0} right={100} onChange={changeVolume} type={'volume'} />
    </div>
  );
};

export default Player;