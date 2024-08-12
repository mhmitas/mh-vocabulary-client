import React, { useState } from 'react';
import { GoX } from "react-icons/go";

const WordComponent = ({ word, currentIndex, setCurrentIndex, totalWords, setShowSlideComponent }) => {
    const [showDetail, setShowDetail] = useState(false)

    function handleNext() {
        if (currentIndex === totalWords - 1) {
            return setCurrentIndex(0)
        }
        setCurrentIndex(() => currentIndex + 1)
    }
    function handlePrevious() {
        if (currentIndex === 0) {
            return setCurrentIndex(totalWords - 1)
        }
        setCurrentIndex(() => currentIndex - 1)
    }

    return (
        <section className='my-container min-h-screen'>
            <div className='rounded-lg bg-slate-800 relative mb-4 text-white pt-4'>
                {showDetail ?
                    <WordDetails data={word} /> :
                    <div className='min-h-[50vh] sm:min-h-[60vh] p-8 border-base-300 flex justify-center items-center text-4xl sm:text-5xl font-bold'>
                        {word?.word}
                    </div>
                }
                <button onClick={() => setShowDetail(!showDetail)} className='btn btn-sm btn-warning
                 w-max rounded absolute top-2 right-2 btn-outline'>{showDetail ? "Hide Detail" : "Show Details"}</button>
                <button onClick={() => setShowSlideComponent(false)} className='btn btn-sm btn-ghost btn-circle text-2xl absolute top-1 left-1'><GoX /></button>
            </div>
            <div className='flex justify-end gap-2'>
                <button onClick={handlePrevious} className='btn btn-sm rounded btn-primary'>Previous</button>
                <button onClick={handleNext} className='btn btn-sm rounded btn-primary'>Next</button>
            </div>
        </section>
    );
};

export default WordComponent;

const WordDetails = ({ data }) => {
    return (
        <div className="mx-auto p-6 w-full">
            <div className="text-center mb-4">
                <h1 className="text-3xl font-bold p-1">{data.word}</h1>
                <p className="text-sm italic leading-3">{data.partOfSpeech}</p>
                <p className="text-sm sm:text-base">{data.pronunciation}</p>
            </div>
            {data.image &&
                <div className="mb-4">
                    <img src={data.image} alt={data.word} className="mx-auto max-h-48 object-cover rounded-md shadow-sm" />
                </div>}
            <div className='divider m-0'></div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Definition</h2>
                <p className="">{data.definition}</p>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold">Meaning</h2>
                <p className="">{data.meaning}</p>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold">Example Sentence</h2>
                <p className=" italic">"{data.exampleSentences}"</p>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold">Note</h2>
                <p className="">{data.note}</p>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold">Synonyms</h2>
                <p className="">{data.synonyms}</p>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold">Antonyms</h2>
                <p className="">{data.antonyms}</p>
            </div>

            <div className="text-sm">
                <p>Created At: {new Date(data.createdAt).toLocaleString()}</p>
            </div>
        </div>
    );
};
