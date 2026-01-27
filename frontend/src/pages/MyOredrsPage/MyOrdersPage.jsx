import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import MyOrder from '../../components/MyOrders/MyOrders'
import Footer from '../../components/Footer/Footer'

const MyOrdersPage = () => {
    return (
        <>
            <Navbar />
            <MyOrder />
            <Footer />
        </>
    )
}

export default MyOrdersPage