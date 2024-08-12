import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxios';

const Collection = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const [searchParams] = useSearchParams()

    const { data: words = [], error, isLoading } = useQuery({
        queryKey: [`word-page-${id}`],
        queryFn: async () => {
            const { data } = await axiosSecure(`/words/${id}`)
            // console.log(data);
            return data
        }
    })

    if (error) console.error(error);

    return (
        <section className='my-container'>
            <h3 className='title-3 mb-6 line-clamp-1'>{searchParams?.get("name") || "Words"}</h3>
            <div className='flex flex-wrap items-center justify-center gap-4'>
                {words.map(word => <WordCard key={word?._id} word={word} />)}
            </div>
        </section>
    );
};

export default Collection;

const WordCard = ({ word }) => {
    const colors = ["#38858a", "#ba4949", "#397097", "#9b8238", "#7d53a2", "#af4e91", "#518a58", "#545764"]
    const bg = colors[Math.floor(Math.random() * colors?.length)]

    const bgStyle = {
        backgroundColor: bg,
    };

    return (
        <div style={bgStyle} className={`h-40 w-52 rounded-lg flex items-center justify-center text-2xl font-semibold cursor-pointer hover:scale-105 duration-500`}>
            <h1>{word?.word}</h1>
        </div>
    );
};
