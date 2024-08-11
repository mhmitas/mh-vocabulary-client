import React from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className='shadow-md bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] '>
            <div className="navbar bg-base-100 max-w-screen-2xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost normal-case text-xl lg:hidden"><AiOutlineMenu /></div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <Navlinks />
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold">MhVocabulary</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <Navlinks />
                    </ul>
                </div>
                <div className="navbar-end">
                    <button className="btn">Login</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;


function Navlinks() {
    return (
        <>
            <li><NavLink>Home</NavLink></li>
            <li><NavLink>About</NavLink></li>
            <li><NavLink>Services</NavLink></li>
            <li><NavLink>Contact</NavLink></li>
        </>
    )
}

/* 
bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] 
*/