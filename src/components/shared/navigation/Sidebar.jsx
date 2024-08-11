import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Sidebar = () => {
    const { user, logOutUser } = useAuth()

    return (
        <aside className='w-64 h-screen bg-base-200 flex flex-col'>
            <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold m-4">MhVocabulary</Link>
            <div className='flex-1 flex flex-col'>
                <ul className='menu flex-1'>
                    <li><NavLink to="/">Link 1</NavLink></li>
                    <li><NavLink to="/1">Link 2</NavLink></li>
                    <li><NavLink to="/1">Link 3</NavLink></li>
                    <li><NavLink to="/1">Link 4</NavLink></li>
                </ul>
                {user &&
                    <div className='m-4'>
                        <h1 className='text-xl font-semibold leading-4'>{user?.name}</h1>
                        <h1 className='mb-1'>{user?.email}</h1>
                        <button onClick={logOutUser} className='btn btn-sm rounded btn-secondary wf'>Sign Out</button>
                    </div>
                }
            </div>
        </aside>
    );
};

export default Sidebar;