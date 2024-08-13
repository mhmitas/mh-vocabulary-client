import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
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
            <div className='mb-6'>
                <h3 className='text-lg mb-1'>Total: {words?.length}</h3>
                <Link to={`/add-new-word/${id}`}><button className='btn btn-sm rounded btn-primary'>Add New Word<FaPlus /></button></Link>
            </div>
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
        <div className=' relative'>
            <div onClick={handleClick} style={bgStyle} className={`rounded-md sm:rounded-lg flex items-center justify-center text-xl sm:text-2xl font-semibold cursor-pointer hover:scale-[1.01] duration-500 card-body`}>
                <h1>{word?.word}</h1>
            </div>
            <div className="dropdown dropdown-end absolute top-1 right-1 ">
                <button className='btn btn-sm text-lg font-bold btn-ghost mb-1'>⁝</button>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 p-2 shadow">
                    <li><Link to={`/edit-word/${word?._id}`}>Edit</Link></li>
                    <li><button>Delete</button></li>
                </ul>
            </div>
        </div>
    );
    // <Link to={`/word/${word?._id}`}>
};
