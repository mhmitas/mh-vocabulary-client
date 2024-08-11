import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/shared/navigation/Sidebar';

const Root = () => {
    return (
        <main className='flex min-h-screen max-w-screen-2xl mx-auto w-full'>
            <Sidebar />
            <div className='flex-1'>
                <Outlet />
            </div>
        </main>
    );
};

export default Root;