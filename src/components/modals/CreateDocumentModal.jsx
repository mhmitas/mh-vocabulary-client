import React, { useState } from 'react';

const CreateDocumentModal = ({ setShowModal }) => {
    const [documentName, setDocumentName] = useState("")

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
                    <button className='btn btn-sm rounded btn-primary'>Create</button>
                </div>
            </div>
        </section>
    );
};

export default CreateDocumentModal;