import React from 'react'
import { Carousel } from 'react-bootstrap'
import './style/style.css'
import img1 from '../../images/user1.jpg'
import img2 from '../../images/user2.jpg'
import img3 from '../../images/user3.jpg'
export default function Slider() {
  return (
    <Carousel>
      <Carousel.Item>
        <h2>Happy clients said</h2>
        <img src={img1}  alt=''/>
        <div><q>The best app ever, with Savoe App I managed rebalance my life again</q><p>Soso Addlo3a</p></div>
      </Carousel.Item>
      <Carousel.Item>
        <h2>Happy clients said</h2>
        <img src={img2} alt=''/>
        <div><q>The best app ever, with Savoe App I managed rebalance my life again</q><p>Soso Addlo3a</p></div></Carousel.Item>
      <Carousel.Item>
        <h2>Happy clients said</h2>
        <img src={img3} alt='' />
        <div><q>The best app ever, with Savoe App I managed rebalance my life again</q><p>Soso Addlo3a</p></div></Carousel.Item>
    </Carousel>
  )
}
