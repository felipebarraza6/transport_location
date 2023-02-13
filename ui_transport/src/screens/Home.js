import React from 'react'
import { Layout } from 'antd'
import HeaderApp from '../components/home/HeaderApp'
import Container from '../components/home/Container'
import FooterApp from '../components/home/FooterApp'
import { BrowserRouter } from 'react-router-dom'


const Home = () => {

    return(<Layout>
      <BrowserRouter>
        <HeaderApp />
        <Container />
        <FooterApp />
      </BrowserRouter>
    </Layout>)
}


export default Home
