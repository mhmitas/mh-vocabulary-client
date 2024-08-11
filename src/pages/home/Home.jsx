import React from 'react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { FaRegFileAlt } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const Home = () => {
    const { user } = useAuth()

    return (
        <section className='my-container h-[calc(100vh-64px)] flex flex-col py-4'>
            <h1 className='text-center text-3xl font-bold text-primary mb-6'>Hi! {user?.name?.split(" ")?.[0]}</h1>
            <div className='flex justify-center mb-4'>
                <label className="input input-bordered flex items-center gap-2 max-w-xs w-full input-sm p-4 text-lg rounded">
                    <input type="text" className="grow" placeholder="Search" />
                    <AiOutlineSearch />
                </label>
            </div>
            <ul className='border border-base-300 mx-auto bg-base-200 p-6 rounded-lg space-y-1 text-lg w-full flex-1 overflow-auto'>
                <Link to="/document/hell0"><li className='flex items-center gap-1 hover:link'><FaRegFileAlt />Daily Vocabularies</li></Link>
                <li className='flex items-center gap-1'><FaRegFileAlt /> Quam aspernatur excepturi soluta commodi?</li>
                <li className='flex items-center gap-1'><FaRegFileAlt /> Quos provident quidem nulla accusantium!</li>
                <li className='flex items-center gap-1'><FaRegFileAlt /> Amet in minus autem velit?</li>
                <li className='flex items-center gap-1'><FaRegFileAlt /> Libero nostrum laudantium sapiente commodi?</li>
            </ul>
        </section>
    );
};

export default Home;