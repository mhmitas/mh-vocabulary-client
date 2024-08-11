import React from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Navigate } from "react-router-dom";

const SemiPrivetRoute = ({ children }) => {
    const user = false
    const loading = false

    if (loading) {
        return <LoadingSpinner />
    }

    if (!user) {
        return <Navigate to="/sign-in" />
    }

    return children
};

export default SemiPrivetRoute;