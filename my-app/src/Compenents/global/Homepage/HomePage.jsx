import React from 'react'
import Home from '../../../Compenents/Pages/Home/Home'
import WhatWeOfferSection from '../../../Compenents/Pages/Home/WhatJob'
import LogoCard from  '../../../Compenents/Pages/Home/AvantagesCar'
import MilieuCard from  '../../../Compenents/Pages/Home/CarMlieu'
import VideoMArkette from '../../../Compenents/Pages/Home/Marketter'
import CarouselCard from '../../../Compenents/Pages/Home/CarouselCar'
import Pourcentage from '../../../Compenents/Pages/Home/Pourcentage'
import Feedback from '../../../Compenents/Pages/Home/Feeback'

export default function HomePage() {
  return (
    <div>
      <Home/>
      <WhatWeOfferSection/>
      <LogoCard/>
      <MilieuCard/>
      <VideoMArkette/>
      <Pourcentage/>
      <CarouselCard/>
      <Feedback/>
    </div>
  )
}
