import React, { useState } from 'react';
import BackSide from '../../components/document/BackSide';
import FrontSide from '../../components/document/FrontSide';
import { useParams } from 'react-router-dom';

const WordPage = () => {
    const [showDetail, setShowDetail] = useState(false)
    const { id } = useParams()

    return (
        <section className='my-container'>
            <h3>WordPage</h3>
            <h3>{id}</h3>
            {showDetail ?
                <BackSide showDetail={showDetail} setShowDetail={setShowDetail} /> :
                <FrontSide />
            }
        </section>
    );
};

export default WordPage;