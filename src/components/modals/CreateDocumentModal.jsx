import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateDocumentModal = ({ setShowModal, refetch }) => {
    const [documentName, setDocumentName] = useState("");
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    async function handleSubmit() {
        const doc = { user: user?._id, name: documentName }
        try {
            const res = await axiosSecure.post(`/documents/create-document`, doc)
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
                    <label className='label label-text'>Document Name</label>
                    <textarea
                        value={documentName}
                        onChange={(e) => setDocumentName(e.target.value)}
                        className='textarea textarea-bordered'
                        maxLength={70}
                    ></textarea>
                </div>
                <div className='flex justify-end gap-2'>
                    <button onClick={() => setShowModal(false)} className='btn btn-sm rounded btn-error'>Cancel</button>
                    <button onClick={handleSubmit} className='btn btn-sm rounded btn-primary'>Create</button>
                </div>
            </div>
        </section>
    );
};

export default CreateDocumentModal;