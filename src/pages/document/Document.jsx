import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link, useParams, useSearchParams } from "react-router-dom";
import useAxiosSecure from '../../hooks/useAxios';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FaPlus } from 'react-icons/fa';
import CreateCollectionModal from '../../components/modals/CreateCollectionModal';
import deleteConfirm from '../../components/modals/confirm/deleteConfirm';
import toast from 'react-hot-toast';


const Document = () => {
    const [showCreteModal, setShowCreteModal] = useState(false)
    const [searchParams] = useSearchParams()
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()

    const title = searchParams?.get("name") || "Your Document"

    const { data: collections = [], error, isLoading, refetch } = useQuery({
        queryKey: [`word-collections-page-${id}`],
        queryFn: async () => {
            const { data } = await axiosSecure(`/collections/${id}`)
            // console.log(data);
            return data
        }
    })

    if (error) console.error(error);

    return (
        <section className='my-container'>
            <h1 className='title-1 mb-6'>{title}</h1>
            <div className='relative bg-base-200 p-4 sm:p-6 rounded-lg flex flex-col gap-3 mb-16'>
                <button onClick={() => setShowCreteModal(true)} className='btn btn-primary btn-sm w-max rounded'>Add New Collection<FaPlus /></button>
                {isLoading && <LoadingSpinner />}
                {collections.map(coll => <CollectionCard key={coll?._id} collection={coll} refetch={refetch} />)}
            </div>
            {showCreteModal && <CreateCollectionModal setShowModal={setShowCreteModal} documentId={id} refetch={refetch} />}
        </section>
    );
};

export default Document;


function CollectionCard({ collection, refetch }) {
    const axiosSecure = useAxiosSecure()

    async function handleDelete() {
        try {
            const ask = await deleteConfirm("Are you sure you want to delete this collection?", "delete collection")
            if (!ask) return;
            const { data } = await axiosSecure.delete(`/collections/delete/${collection?._id}`)
            console.log(data);
            if (data?.deletedCount > 0) {
                toast("Document deleted")
                refetch()
            }
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className='relative'>
            <Link to={`/collection/${collection?._id}?name=${collection?.name}`}>
                <div className='flex justify-between text-base sm:text-lg py-2 sm:py-3 px-3 sm:px-5 rounded-lg bg-base-100 hover:bg-base-100 pr-5'>
                    <span>{collection?.name}</span>
                    {/* <span>12 August 2024</span> */}
                </div>
            </Link>
            <div className="dropdown dropdown-end absolute top-1/4 right-1 ">
                <button className='btn btn-sm text-lg font-bold btn-ghost mb-1'>⁝</button>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 p-2 shadow border border-base-300">
                    <li><button>Rename</button></li>
                    <li><button onClick={handleDelete}>Delete</button></li>
                </ul>
            </div>
        </div>
    )
}
