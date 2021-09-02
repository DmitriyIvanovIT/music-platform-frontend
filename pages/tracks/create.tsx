import React, {useState} from 'react';
import DefaultLayout from "@/layouts/Default";
import {Button, Grid, TextField} from "@material-ui/core";
import StepWrapper from "@/components/StepWrapper";
import {ArrowBackIos, ArrowForwardIos} from "@material-ui/icons";
import styles from '@/styles/Create.module.scss';
import FileUpload from "@/components/FileUpload";
import {useRouter} from "next/router";
import {useInput} from "@/hooks/useInput";
import axios from "axios";

const Create = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const name = useInput('');
  const artist = useInput('');
  const text = useInput('');

  const next = () => {
    if (activeStep !== 3) {
      setActiveStep(activeStep + 1);
    } else {
      const formData = new FormData();

      formData.append('name', name.value);
      formData.append('artist', artist.value);
      formData.append('text', text.value);
      formData.append('picture', picture as unknown as Blob);
      formData.append('audio', audio as unknown as Blob);

      axios.post('http://localhost:5000/tracks', formData)
        .then(res => router.push('/tracks'))
        .catch(err => console.error(err));
    }
  };

  const prev = () => {
    setActiveStep(activeStep - 1);
  };

  const getForm = () => {
    switch (activeStep) {
      case 1: return (
        <Grid container direction='column' className={styles.create__block}>
          <h1>Информация о треке</h1>
          <TextField
            {...name}
            className={styles.create__input}
            label='Название трека'
          />
          <TextField
            {...artist}
            className={styles.create__input}
            label='Имя исполнителя'
          />
          <TextField
            {...text}
            className={styles.create__input}
            label='Текст песни'
            multiline
            rows={4}
          />
        </Grid>
      );
      case 2: return (
        <Grid container direction='column' className={styles.create__block}>
          <h1>Загрузите обложку</h1>
          <FileUpload setFile={setPicture} accept={'image/*'}>
            <Button>Загрузить обложку</Button>
          </FileUpload>
        </Grid>
      );
      case 3: return (
        <Grid container direction='column' className={styles.create__block}>
          <h1>Загрузите трек</h1>
          <FileUpload setFile={setAudio} accept={'audio/*'}>
            <Button>Загрузить аудио</Button>
          </FileUpload>
        </Grid>
      );
    }
  }

  return (
    <DefaultLayout title='Загрузить текст'>
      <>
        <StepWrapper activeStep={activeStep}>
          {getForm()}
        </StepWrapper>
        <Grid container justifyContent='center'>
          <Button disabled={activeStep === 1} onClick={prev}>
            <ArrowBackIos/>
            Назад
          </Button>
          <Button onClick={next}>
            {activeStep !== 3
              ? 'Вперед'
              : 'Отправить'
            }

            {activeStep !== 3 && <ArrowForwardIos/>}
          </Button>
        </Grid>
      </>
    </DefaultLayout>
  );
};

export default Create;