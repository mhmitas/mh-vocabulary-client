import React from 'react';
import { createRoot } from 'react-dom/client';
import DeleteConfirmModal from './DeleteConfirmModal';

const deleteConfirm = (message, conditionText) => {
    return new Promise((resolve) => {
        const div = document.createElement('div');
        document.body.appendChild(div);

        const root = createRoot(div);

        const handleConfirm = () => {
            cleanup();
            resolve(true);
        };

        const handleCancel = () => {
            cleanup();
            resolve(false);
        };

        const cleanup = () => {
            root.unmount();
            div.remove();
        };

        root.render(
            <DeleteConfirmModal
                message={message}
                conditionText={conditionText}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        );
    });
};

export default deleteConfirm;