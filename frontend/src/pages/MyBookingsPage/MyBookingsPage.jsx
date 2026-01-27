import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import MyBookings from '../../components/MyBookings/MyBookings';

const MyBookingsPage = () => {
    return (
        <>
            <Navbar />
            <MyBookings />
            <Footer />
        </>
    );
};

export default MyBookingsPage;