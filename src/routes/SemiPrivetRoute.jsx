import React, { useContext } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Navigate } from "react-router-dom";
import { AuthContext } from '../providers/AuthProvider';

const SemiPrivetRoute = ({ children }) => {
    const { user, authLoading } = useContext(AuthContext)

    if (authLoading) {
        return <LoadingSpinner />
    }

    if (!user) {
        return <Navigate to="/sign-in" />
    }

    return children
};

export default SemiPrivetRoute;