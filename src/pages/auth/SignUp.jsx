import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../hooks/useAxiosSecure';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await axiosInstance.post(`/register`, data)
            console.log(res.data);
        } catch (error) {
            console.error("sign up error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">
            <div className="w-full max-w-sm p-6 bg-base-100 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className={`input input-bordered w-full ${errors.name && 'input-error'}`}
                            {...register('name', {
                                required: 'Name is required',
                                minLength: {
                                    value: 3,
                                    message: 'Name must be at least 3 characters long',
                                },
                            })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                        )}
                    </div>

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
                            type="text"
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

                    <button type="submit" className="btn btn-primary w-full">
                        Sign Up
                    </button>
                </form>
                <p className='mt-2'>Don't have an account? Please <Link to="/sign-in" className='link link-primary'>Sign in</Link></p>
            </div>
        </div>
    );
};

export default SignUp;
