import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className='absolute inset-0 flex items-center justify-center z-50'>
            <span className='loading loading-spinner loading-lg text-info'></span>
        </div>
    );
};

export default LoadingSpinner;