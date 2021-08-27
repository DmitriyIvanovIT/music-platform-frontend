import { ITrack } from '@/types/track';
import React from 'react';
import {Grid} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import TrackItem from '../TrackItem';

type TracksListProps = {
  tracks: ITrack[];
  handledDelete: (id: string) => void;
}

const TrackList: React.FC<TracksListProps> = ({ tracks, handledDelete }): JSX.Element => {
  return (
    <Grid container direction="column">
        <Box p={2}>
          {tracks.map(track => (
            <TrackItem
              key={track._id}
              track={track}
              handledDelete={handledDelete}
            />))}
        </Box>
    </Grid>
  );
};

export default TrackList;