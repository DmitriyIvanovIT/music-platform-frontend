import React from 'react';
import DefaultLayout from "@/layouts/Default";

const Home = () => {
  return (
    <DefaultLayout title="Главная">
      <div className="center">
        <h1>Добро пожалова</h1>
        <h3>Здесь собраны лучшие треки</h3>
      </div>
    </DefaultLayout>
  );
};

export default Home;