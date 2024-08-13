import React, { useState } from 'react';

const Experiment = () => {
    const [fruits, setFruits] = useState([])

    return (
        <div className='my-container'>
            <form onSubmit={(e) => {
                e.preventDefault()
            }} className='flex flex-col gap-4'>
                <input className='input input-bordered' placeholder='Name' type="text" />
                <div className='form-control'>
                    <div className='flex *:mr-2 gap-1'>
                        {fruits.map((fruit, index) => <span
                            onClick={() => setFruits(() => fruits.filter(f => fruit !== f))}
                            className='btn btn-primary'
                            key={index}
                        >{fruit}</span>)}
                    </div>
                    <label className='label label-text'>Your Favorite Fruits</label>
                    <select
                        onChange={(e) => {
                            if (fruits.includes(e.target.value)) {
                                return
                            }
                            setFruits(() => [...fruits, e.target.value])
                        }}
                        className='select select-bordered'
                    >
                        <option value="apple">apple</option>
                        <option value="orange">orange</option>
                        <option value="banana">banana</option>
                        <option value="dragon">dragon</option>
                        <option value="papaya">papaya</option>
                    </select>
                </div>
            </form>
        </div>
    );
};

export default Experiment;