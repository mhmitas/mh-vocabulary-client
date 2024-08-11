import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/navigation/Navbar';
import NavbarSimple from '../components/shared/navigation/NavbarSimple';

const Root = () => {
    return (
        <main className='flex flex-col min-h-screen max-w-3xl mx-auto w-full'>
            <NavbarSimple />
            <div className='flex-1'>
                <Outlet />
            </div>
        </main>
    );
};

export default Root;