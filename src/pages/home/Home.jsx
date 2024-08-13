import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaPlus, FaRegFileAlt } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../../hooks/useAxios';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import CreateDocumentModal from '../../components/modals/CreateDocumentModal';
import deleteConfirm from '../../components/modals/confirm/deleteConfirm';
import toast from 'react-hot-toast';

const Home = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    // const [showModal,setShowModal] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)

    const { data: documents = [], error, isLoading, refetch } = useQuery({
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
            <div className='max-w-lg border border-base-300 mx-auto bg-base-200 p-4 sm:p-6 rounded-lg w-full flex-1 flex flex-col gap-3 overflow-auto relative'>
                <button onClick={() => setShowCreateModal(true)} className='btn text-lg btn-sm rounded mb-2 btn-primary'>
                    Add Document<FaPlus />
                </button>
                {isLoading && <LoadingSpinner />}
                {documents.map(doc => <DocumentCard key={doc?._id} document={doc} refetch={refetch} />)}
            </div>
            {showCreateModal && <CreateDocumentModal setShowModal={setShowCreateModal} refetch={refetch} />}
        </section>
    );
};

export default Home;

const DocumentCard = ({ document, refetch }) => {
    const axiosSecure = useAxiosSecure()

    async function handleDelete() {
        try {
            const ask = await deleteConfirm("Are you sure you want to delete this document?")
            if (!ask) return;
            const { data } = await axiosSecure.delete(`/documents/delete/${document?._id}`)
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
            <Link to={`/document/${document?._id}?name=${document?.name}`}>
                <div className='flex items-center gap-2 bg-base-100 py-2 pl-3 rounded-md sm:text-lg pr-7'>
                    <FaRegFileAlt className="text-success" />
                    <p className='line-clamp-2 flex-1'>{document?.name}</p>
                </div>
            </Link>
            <div className="dropdown dropdown-end absolute top-2 right-1 shadow-lg">
                <button className='btn btn-sm text-lg font-bold btn-ghost mb-1'>⁝</button>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 p-2 shadow border border-base-300">
                    <li><button>Rename</button></li>
                    <li><button onClick={handleDelete}>Delete</button></li>
                </ul>
            </div>
        </div>
    )
}