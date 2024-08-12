import React from 'react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { FaRegFileAlt } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../../hooks/useAxios';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Home = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: documents = [], error, isLoading } = useQuery({
        queryKey: [`document-lists`, user?._id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/documents/${user?._id}`)
            // console.log(data);
            return data
        }
    })

    if (error) console.error(error);


    return (
        <section className='my-container h-[calc(100vh-64px)] flex flex-col py-4'>
            <h1 className='title-1 mb-6'>Hi! {user?.name?.split(" ")?.[0]}</h1>
            <div className='flex justify-center mb-4'>
                <label className="input input-bordered flex items-center gap-2 max-w-xs w-full input-sm p-4 text-lg rounded">
                    <input type="text" className="grow" placeholder="Search" />
                    <AiOutlineSearch />
                </label>
            </div>
            <div className='max-w-lg border border-base-300 mx-auto bg-base-200 p-6 rounded-lg text-lg w-full flex-1 flex flex-col gap-2 overflow-auto relative'>
                {isLoading && <LoadingSpinner />}
                {documents.map(doc => <DocumentCard key={doc?._id} document={doc} />)}
            </div>
        </section>
    );
};

export default Home;

const DocumentCard = ({ document }) => {
    return (
        <Link to={`/document/${document?._id}?name=${document?.name}`}><div className='flex items-center gap-1 hover:link'><FaRegFileAlt />{document?.name}</div></Link>
    )
}