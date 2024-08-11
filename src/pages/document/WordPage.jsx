import React, { useState } from 'react';
import BackSide from '../../components/document/BackSide';
import FrontSide from '../../components/document/FrontSide';

const WordPage = () => {
    const [showDetail, setShowDetail] = useState(false)

    return (
        <section className='my-container'>
            {showDetail ?
                <BackSide showDetail={showDetail} setShowDetail={setShowDetail} /> :
                <FrontSide />
            }
        </section>
    );
};

export default WordPage;