import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxios';
import toast, { } from "react-hot-toast";

const CreateCollectionModal = ({ setShowModal, documentId, refetch }) => {
    const [collectionName, setCollectionName] = useState("")
    const axiosSecure = useAxiosSecure();

    async function handleSubmit() {
        const doc = { document: documentId, name: collectionName }
        try {
            const res = await axiosSecure.post(`/collections/create-collection`, doc)
            console.log(res.data);
            if (res.data?.insertedId) {
                toast.success("New word added")
            }
            refetch()
            setShowModal(false)
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <section className='modal modal-open'>
            <div className='modal-box'>
                <div className="form-control mb-4">
                    <label className='label label-text'>Collection Name</label>
                    <textarea onChange={(e) => setCollectionName(e.target.value)} className='textarea textarea-bordered' maxLength={70} ></textarea>
                </div>
                <div className='flex justify-end gap-2'>
                    <button onClick={() => setShowModal(false)} className='btn btn-sm rounded btn-error'>Cancel</button>
                    <button onClick={handleSubmit} className='btn btn-sm rounded btn-primary'>Create</button>
                </div>
            </div>
        </section>
    );
};

export default CreateCollectionModal;