import React from 'react';
import {Card, Container, Grid, Step, StepLabel, Stepper} from "@material-ui/core";
import styles from './StepWrapper.module.scss';

type StepWrapperProps = {
  activeStep: number;
}

const steps = ['Информация о треке', 'Загрузите обложку', 'Загрузите трек'];

const StepWrapper: React.FC<StepWrapperProps> = ({activeStep, children}): JSX.Element => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) =>
          <Step key={index} completed={activeStep > index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        )}
      </Stepper>
      <Grid container justifyContent='center' className={styles.uploadTrack}>
        <Card className={styles.uploadTrack__card}>
          {children}
        </Card>
      </Grid>
    </Container>
  );
};

export default StepWrapper;