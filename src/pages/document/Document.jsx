import React from 'react';
import { Link } from "react-router-dom";

const Document = () => {
    return (
        <section className='my-container'>
            <h1 className='title-1 mb-6'>Daily Vocabularies</h1>
            <div>
                <Link to="/word/world"><div className='flex justify-between text-lg py-3 px-5 rounded-lg bg-base-200 hover:bg-base-300 duration-700 max-w-xl mx-auto'>
                    <span>Day - 01 (10 words)</span>
                    <span>12 August 2024</span>
                </div></Link>
            </div>
        </section>
    );
};

export default Document;