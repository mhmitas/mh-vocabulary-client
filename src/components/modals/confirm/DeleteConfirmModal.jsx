import React, { useState } from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';


const DeleteConfirmModal = ({ message = "Hello world", conditionText = "delete", onConfirm, onCancel }) => {
    const [inputValue, setInputValue] = useState("")

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
            onClick={handleOverlayClick}
        >
            <div className="bg-base-100 rounded-lg shadow-lg p-6 w-96 m-4">
                <h2 className="mb-2">Confirm Action</h2>
                <p className="text-lg font-semibold">{message}</p>
                <div className='form-control mb-3'>
                    <label className='label'>Write "{conditionText}" to delete</label>
                    <input
                        type='text'
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        className='input input-bordered' />
                </div>
                <div className="flex justify-end space-x-4">
                    <button className="btn btn-sm rounded" onClick={onCancel}>
                        Cancel
                    </button>
                    <button disabled={inputValue !== conditionText} className="btn btn-sm btn-error rounded" onClick={onConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;