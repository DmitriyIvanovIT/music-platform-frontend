import React, {PropsWithChildren} from 'react';
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Player from "@/components/Player";
import {Container} from "@material-ui/core";

type DefaultLayoutProp = {
  children: PropsWithChildren<JSX.Element>;
  title: string;
}


const DefaultLayout: React.FC<DefaultLayoutProp> = ({ children, title }): JSX.Element => {
  return (
    <>
      <Head>
        <title>Music - {title}</title>
      </Head>
      <Navbar>
        <>
          <Container>
            {children}
          </Container>
          <Player/>
        </>
      </Navbar>
    </>
  );
};

export default DefaultLayout;