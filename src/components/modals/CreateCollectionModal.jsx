import React, { useState } from 'react';

const CreateCollectionModal = ({ setShowModal }) => {
    const [collectionName, setCollectionName] = useState("")

    return (
        <section className='modal modal-open'>
            <div className='modal-box'>
                <div className="form-control mb-4">
                    <label className='label label-text'>Collection Name</label>
                    <textarea className='textarea textarea-bordered' maxLength={70} ></textarea>
                </div>
                <div className='flex justify-end gap-2'>
                    <button onClick={() => setShowModal(false)} className='btn btn-sm rounded btn-error'>Cancel</button>
                    <button className='btn btn-sm rounded btn-primary'>Create</button>
                </div>
            </div>
        </section>
    );
};

export default CreateCollectionModal;