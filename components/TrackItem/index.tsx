import React from 'react';
import {ITrack} from "@/types/track";
import {Card, Grid} from "@material-ui/core";
import styles from "./TrackItem.module.scss";
import IconButton from "@material-ui/core/IconButton";
import {Delete, Pause, PlayArrow} from "@material-ui/icons";
import Link from 'next/link';
import {useActions} from "@/hooks/useActions";

type TrackItemProps = {
  track: ITrack;
  active?: boolean;
  handledDelete: (id: string) => void;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false, handledDelete }): JSX.Element => {
  const {playTrack, setActive} = useActions();

  const play = () => {
    setActive(track);
    playTrack();
  }

  return (
    <Card className={styles.track}>
      <IconButton onClick={play}>
        {active
          ? <Pause/>
          : <PlayArrow/>
        }
      </IconButton>
      <Link href={`/tracks/${track._id}`}>
        <img className={styles.track__img} src={'http://localhost:5000/' + track.picture} alt={track.name}/>
      </Link>
      <Grid container direction="column" className={styles.track__info}>
        <Link href={`/tracks/${track._id}`}>
          <a className={styles.track__name}>
            {track.name}
          </a>
        </Link>
        <div className={styles.track__artist}>{track.artist}</div>
      </Grid>
      {active && <div>02:42 / 03:22</div>}
      <IconButton className={styles.track__delete} onClick={() => {handledDelete(track._id)}}>
        <Delete/>
      </IconButton>
    </Card>
  );
};

export default TrackItem;