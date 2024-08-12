import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxios';
import WordComponent from '../../components/document/WordComponent';

const Collection = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const [searchParams] = useSearchParams()
    const [showSlideComponent, setShowSlideComponent] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    const { data: words = [], error, isLoading } = useQuery({
        queryKey: [`word-page-${id}`],
        queryFn: async () => {
            const { data } = await axiosSecure(`/words/${id}`)
            // console.log(data);
            return data
        }
    })

    if (error) console.error(error);

    if (showSlideComponent) {
        return (
            <WordComponent
                word={words[currentIndex]}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                totalWords={words?.length}
                setShowSlideComponent={setShowSlideComponent}
            />
        )
    }

    return (
        <section className='my-container'>
            <h3 className='title-3 mb-6 line-clamp-2'>{searchParams?.get("name") || "Words"}</h3>
            <h3 className='mb-2'>Total: {words?.length}</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {words.map((word, index) => <WordCard
                    key={word?._id}
                    word={word}
                    index={index}
                    setShowSlideComponent={setShowSlideComponent}
                    showSlideComponent={showSlideComponent}
                    setCurrentIndex={setCurrentIndex}
                />)}
            </div>
        </section>
    );
};

export default Collection;

const WordCard = ({ word, index, setShowSlideComponent, showSlideComponent, setCurrentIndex }) => {
    const colors = ["#38858a", "#ba4949", "#397097", "#9b8238", "#7d53a2", "#af4e91", "#518a58", "#545764"]
    const bg = colors[Math.floor(Math.random() * colors?.length)]

    const bgStyle = {
        backgroundColor: bg,
    };

    function handleClick() {
        setShowSlideComponent(!showSlideComponent);
        setCurrentIndex(index)
    }

    return (
        <div onClick={handleClick} style={bgStyle} className={`rounded-md sm:rounded-lg flex items-center justify-center text-xl sm:text-2xl font-semibold cursor-pointer hover:scale-105 duration-500 card-body`}>
            <h1>{word?.word}helloworldiamhero</h1>
        </div>
    );
    // <Link to={`/word/${word?._id}`}>
};
