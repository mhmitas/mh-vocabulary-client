import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams, useSearchParams } from "react-router-dom";
import useAxiosSecure from '../../hooks/useAxios';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Document = () => {
    const [searchParams] = useSearchParams()
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()

    const title = searchParams?.get("name") || "Your Document"

    const { data: collections = [], error, isLoading } = useQuery({
        queryKey: [`word-collections-page-${id}`],
        queryFn: async () => {
            const { data } = await axiosSecure(`/collections/${id}`)
            console.log(data);
            return data
        }
    })

    if (error) console.error(error);

    return (
        <section className='my-container'>
            <h1 className='title-1 mb-6'>{title}</h1>
            <div className='relative'>
                {isLoading && <LoadingSpinner />}
                {collections.map(coll => <CollectionCard key={coll?._id} collection={coll} />)}
            </div>
        </section>
    );
};

export default Document;


function CollectionCard({ collection }) {

    return (
        <Link to={`/collection/${collection?._id}`}>
            <div className='flex justify-between text-lg py-3 px-5 rounded-lg bg-base-200 hover:bg-base-300 duration-700 max-w-xl mx-auto mb-2'>
                <span>{collection?.name}</span>
                {/* <span>12 August 2024</span> */}
            </div>
        </Link>
    )
}