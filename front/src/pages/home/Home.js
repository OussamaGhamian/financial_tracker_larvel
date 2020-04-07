import React from 'react'

import './style/style.css'

import sheild from '../../images/confirmation.svg'
import labtop from '../../images/business.svg'
import wallet from '../../images/wallet.svg'
import transfer from '../../images/transfer.svg'
import piechart from '../../images/section.svg'
import savings from '../../images/money.svg'

import Feature from '../../components/feature/Feature'
import Slider from '../../components/slider/Slider'
import Cards from '../../components/cards/Cards'
export default function Home() {
  return (
    <>
      <div className="homeContainer">
        <Cards />
        <Feature img={sheild} />
        <Feature img={labtop} />
        <Feature img={wallet} />
        <Feature img={transfer} />
        <Feature img={piechart} />
        <Feature img={savings} />
      </div>
      <Slider />
    </>
  )
}
