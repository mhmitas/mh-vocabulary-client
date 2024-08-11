import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className='w-64 h-screen bg-base-200'>
            <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold m-4">MhVocabulary</Link>
            <ul className='menu'>
                <li><NavLink to="/">Link 1</NavLink></li>
                <li><NavLink to="/1">Link 2</NavLink></li>
                <li><NavLink to="/1">Link 3</NavLink></li>
                <li><NavLink to="/1">Link 4</NavLink></li>
            </ul>
        </aside>
    );
};

export default Sidebar;