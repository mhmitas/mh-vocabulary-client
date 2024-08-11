import React from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import useAuth from '../../../hooks/useAuth';

const NavbarSimple = () => {

    return (
        <div className="navbar bg-base-100 border-b border-base-300 h-16">
            <div className="flex-none">
                <button className="btn btn-square btn-ghost text-lg">
                    <AiOutlineMenu />
                </button>
            </div>
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl font-bold">MhVocabulary</Link>
            </div>
            <div className="flex-none">
                <UserSection />
            </div>
        </div>
    );
};

export default NavbarSimple;


function UserSection({ }) {
    const { user, logOutUser } = useAuth()

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div
                tabIndex={0}
                className="dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg">
                <div className='m-4'>
                    <h1 className='text-xl font-semibold'>{user?.name}</h1>
                    <h1 className='mb-2'>{user?.email}</h1>
                    <button onClick={logOutUser} className='btn btn-sm rounded btn-secondary wf'>Sign Out</button>
                </div>
            </div>
        </div>
    )
}