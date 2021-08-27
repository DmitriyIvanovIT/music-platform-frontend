const addZero = (time: number): number | string => time < 10 ? '0' + time : time;

const getTime = (time: number): string => {
  const minute = Math.floor(time / 60) || 0,
    second = Math.floor(time % 60) || 0;

  return `${addZero(minute)}:${addZero(second)}`;
};
export default getTime