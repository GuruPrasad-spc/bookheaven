import React from 'react'
import Banner from './Banner';
import Topsellers  from './Topsellers';
import Recommened from './Recommened';
import News from './News';
export const Home = () => {
  return (
    <>
        <Banner/>
        <Topsellers/>
        <Recommened/>
        <News/>
    </>
  )
}

export default Home;