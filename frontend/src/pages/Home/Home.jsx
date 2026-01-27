import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import HomeSlide from '../../components/HomeSlide/HomeSlide'
import Cuisine from '../../components/HomeCuisine/HomeCuisine'
import HomeAbout from '../../components/HomeAbout/HomeAbout'
import HomeMenu from '../../components/HomeMenu/HomeMenu'
import Footer from '../../components/Footer/Footer'
import HomeContact from '../../components/HomeContact/HomeContact'
import InstaPost from '../../components/HomePost/HomePost'

const Home = () => {
    return (
        <>
            <Navbar />
            <HomeSlide />
            <Cuisine />
            <HomeAbout />
            <HomeMenu />
            <InstaPost />
            <HomeContact />
            <Footer />
        </>
    )
}

export default Home