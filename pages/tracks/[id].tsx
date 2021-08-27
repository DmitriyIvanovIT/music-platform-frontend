import React, {useState} from 'react';
import {ITrack} from "@/types/track";
import DefaultLayout from "@/layouts/Default";
import Link from 'next/link';
import {ArrowBackIos} from "@material-ui/icons";
import {Button, Card, Grid, TextField} from '@material-ui/core';
import styles from '@/styles/TrackPage.module.scss';
import {wrapper} from "@/store/index";
import {GetServerSideProps} from "next";
import axios from "axios";
import {useInput} from "@/hooks/useInput";

type TrackPageProps = {
  serverTrack: ITrack;
};

const TrackPage: React.FC<TrackPageProps> = ({ serverTrack }): JSX.Element => {
  const [track, setTrack] = useState<ITrack>(serverTrack)
  const username = useInput('');
  const text = useInput('');

  const addComment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/tracks/comment', {
        username: username.value,
        text: text.value,
        trackId: track._id
      });
      setTrack({...track, comments: [...track.comments, response.data]});
    } catch (err) {

    }
  }

  return (
    <DefaultLayout title={track.name}>
      <>
        <Link href="/tracks">
          <a className={styles.link__btn}>
            <ArrowBackIos className={styles.link__icon}/>
            К списку треков
          </a>
        </Link>
        <Grid container className={styles.track}>
          <img src={'http://localhost:5000/' + track.picture} className={styles.track__img}/>
          <div className={styles.track__info}>
              <h1>{track.name}</h1>
              <h2>Исполнитель - {track.artist}</h2>
              <h2>Прослушиваний - {track.listens}</h2>
          </div>
        </Grid>
        <h2 className={styles.track__title}>Текст песни</h2>
        <pre className={styles.track__text}>{track.text}</pre>
        <h2 className={styles.track__title}>Комментарии</h2>
        <div className={styles.comment}>
          {track.comments.length !== 0
            ? track.comments.map((comment) =>
             <Card className={styles.comment__card}>
               <div key={comment._id}>
                 <h3 className={styles.comment__title}>{comment.username}</h3>
                 <p>{comment.text}</p>
               </div>
             </Card>
            )
            : <p>Комментариев нет, будьте первым кто его оставит! </p>
          }
        </div>
        <Grid container className={styles.comment__form}>
          <TextField
            {...username}
            label="Ваше имя"
            className={styles.comment__input}
          />
          <TextField
            {...text}
            label="Ваше коммнетарий"
            multiline
            rows={4}
            className={styles.comment__input}
          />
          <Button onClick={addComment}>Отправить</Button>
        </Grid>
      </>
    </DefaultLayout>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ({ params }) => {
  const response = await axios.get('http://localhost:5000/tracks/' + params?.id);

  return {
    props: {
      serverTrack: response.data
    }
  }
})