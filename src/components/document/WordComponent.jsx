import React, { useState } from 'react';
import { GoX } from "react-icons/go";
import { SiGoogletranslate } from "react-icons/si";


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
    // console.log(data);

    return (
        <div className="mx-auto p-6 w-full">
            <div className="text-center mb-4">
                <h1 className="text-3xl font-bold p-1">{data.word}</h1>
                <p className="text-sm sm:text-base italic leading-3 flex gap-1 justify-center">{data.pos?.join(", ")}</p>
                {data.pronunciation &&
                    <p className="text-sm sm:text-base text-gray-400">{data.pronunciation}</p>}
            </div>
            {data.image &&
                <div className="mb-4">
                    <img src={data.image} alt={data.word} className="mx-auto max-h-48 object-cover rounded-md shadow-sm" />
                </div>}
            <div className='divider m-0'></div>
            <div className="mb-4">
                <div>
                    <a target='_blank' className='flex items-center gap-2' href={`https://translate.google.com/details?sl=en&tl=bn&text=${data?.word}&op=translate&hl=en`}>
                        <SiGoogletranslate />
                        <span className='italic font-semibold text-primary'>{data?.word}</span>
                    </a>
                </div>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Definition</h2>
                <div className="space-y-1">
                    {
                        data.definitions.map((definition, index) => <p key={index}>{definition}</p>)
                    }
                </div>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold">Meanings</h2>
                <div className="space-y-2">
                    {data.meanings.map((meaning, index) => <p key={index}>{meaning}</p>)}
                </div>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold">Example Sentence</h2>
                <div className="space-y-2 italic">
                    {data.exampleSentences.map((sentence, index) => <p key={index}>{sentence}</p>)}
                </div>
            </div>
            {data?.synonyms &&
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Synonyms</h2>
                    <p className="">{data.synonyms}</p>
                </div>}
            {data.antonyms &&
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Antonyms</h2>
                    <p className="">{data.antonyms}</p>
                </div>}

            {data.notes.length > 0 &&
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Note</h2>
                    <div className="space-y-1">
                        {
                            data.notes.map((note, index) => <p key={index}>{note}</p>)
                        }
                    </div>
                </div>
            }
        </div>
    );
};
