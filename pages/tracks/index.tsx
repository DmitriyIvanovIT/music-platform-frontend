import React, {useState} from 'react';
import DefaultLayout from "@/layouts/Default";
import {Button, Card, Container, Grid, TextField} from "@material-ui/core";
import {useRouter} from "next/router";
import TrackList from "@/components/TrackList";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {NextThunkDispatch, wrapper} from "@/store/index";
import {deleteTrack, fetchTracks, searchTracks} from "@/store/action-creators/track";
import {useDispatch} from "react-redux";

const Tracks = () => {
  const router = useRouter();
  const {tracks, error} = useTypedSelector(state => state.track);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch() as NextThunkDispatch;
  const [timer, setTimer] = useState<any>(null);

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTracks(e.target.value));
      }, 500)
    );
  };

  const handledDelete = async (id: string) => {
    await dispatch(await deleteTrack(id));
    await dispatch(await fetchTracks());
  }

  if (error) {
    return <DefaultLayout title={'Список треков'}>
      <h1>{error}</h1>
    </DefaultLayout>
  }
  return (
    <DefaultLayout title="Список треков">
        <Container>
          <Grid container justifyContent='center'>
            <Card sx={{width: 900, padding: '0 30px'}}>
              <Grid container justifyContent='space-between'>
                <h1>Список треков</h1>
                <Button onClick={() => router.push('/tracks/create')}>Загрузить</Button>
              </Grid>
              <TextField
                label='Поиск по названию трека'
                fullWidth
                value={query}
                onChange={search}
              />
              <TrackList tracks={tracks} handledDelete={handledDelete}/>
            </Card>
          </Grid>
        </Container>
    </DefaultLayout>
  );
};

export default Tracks;

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  const dispatch = await store.dispatch as NextThunkDispatch;
  await dispatch(await fetchTracks());
});