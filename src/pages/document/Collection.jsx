import React from 'react';
import { useParams } from 'react-router-dom';

const Collection = () => {
    const { id } = useParams()

    return (
        <div className='my-container'>
            Collection
        </div>
    );
};

export default Collection;