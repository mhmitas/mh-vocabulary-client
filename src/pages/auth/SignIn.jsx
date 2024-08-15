import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';


const SignIn = () => {
    const { setUser, setAuthLoading } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const [processing, setProcessing] = useState(false)

    const onSubmit = async (data) => {
        setProcessing(true)
        setProcessing(true)
        try {
            const res = await axiosInstance.post(`/sign-in`, data)
            console.log(res.data?.user);
            if (res?.data?.user) {
                setUser(res?.data?.user)
                setAuthLoading(false)
                navigate("/")
            }
            setProcessing(false)
        } catch (error) {
            console.error("sign up error:", error);
            setAuthLoading(false)
            toast.error(error?.response?.data?.message)
            setProcessing(false)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">
            <div className="w-full max-w-sm p-6 bg-base-100 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={`input input-bordered w-full ${errors.email && 'input-error'}`}
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: 'Invalid email address',
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className={`input input-bordered w-full ${errors.password && 'input-error'}`}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long',
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <button type="submit" disabled={processing} className="btn btn-primary w-full">
                        {processing ? <span className='loading loading-spinner text-primary'></span> : "Sign In"}
                    </button>
                </form>
                <p className='mt-2'>Don't have an account? Please <Link to="/sign-up" className='link link-primary'>Sign up</Link></p>
            </div>
        </div>
    );
};

export default SignIn;
