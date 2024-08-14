import React, { useState } from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useForm } from "react-hook-form";
import toast, { } from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxios';

const AddNewWordPage = () => {
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const { handleSubmit, register } = useForm()
    const [partsOfSpeeches, setPartsOFSpeeches] = useState([])
    const { collectionId } = useParams()
    const [processing, setProcessing] = useState(false)

    async function onSubmit(data) {
        setProcessing(true)
        if (partsOfSpeeches.length < 1) return toast.error("Select parts of speech");
        let definitions = data.definitions.split("\n").filter(d => d !== "")
        let meanings = data.meanings.split("\n").filter(d => d !== "")
        let exampleSentences = data.exampleSentences.split("\n").filter(d => d !== "")
        let notes = data.notes.split("\n").filter(d => d !== "")
        const pos = partsOfSpeeches;
        const doc = {
            ...data,
            definitions, meanings, exampleSentences, notes, pos,
            collection: collectionId
        }
        try {
            const res = await axiosSecure.post(`/words/create-word`, doc)
            console.log(res.data);
            if (res.data?.insertedId) {
                toast.success("New word added")
                navigate(`/collection/${collectionId}`, { replace: true })
            }
            setProcessing(false)
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message)
            setProcessing(false)
        }
    }

    return (
        <section className='my-container'>
            <h1 className='title-3'>Add a new word</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
                <div className='form-controller'>
                    <label className='label label-text'>Word *</label>
                    <input {...register("word")} required type="text" className='input input-bordered w-full' />
                </div>
                <div className='form-control'>
                    <label className='label label-text'>Parts Of Speech *</label>
                    <div className='flex flex-wrap gap-1 mb-2'>
                        {partsOfSpeeches.map(pof => <div key={pof} className='bg-base-300 px-3 py-1 rounded indicator mr-3'>
                            <span>{pof}</span>
                            <span
                                onClick={() => setPartsOFSpeeches(() => partsOfSpeeches.filter(p => p !== pof))}
                                className="indicator-item cursor-default"
                            >x</span>
                        </div>)}
                    </div>
                    <select
                        onChange={(e) => {
                            if (partsOfSpeeches.includes(e.target.value)) return;
                            setPartsOFSpeeches(() => [...partsOfSpeeches, e.target.value])
                        }}
                        required
                        className='select select-bordered'
                    >
                        <option className='hidden'>Select Parts of speech</option>
                        {partsOfSpeechArr.map(pof => <option key={pof} value={pof}>{pof}</option>)}
                    </select>
                </div>
                <div className='form-controller'>
                    <label className='label label-text'>Pronunciation</label>
                    <input {...register("pronunciation")} type="text" className='input input-bordered w-full' />
                </div>
                <div className='form-controller'>
                    <label className='label label-text'>Definitions *</label>
                    <TextareaAutosize
                        {...register("definitions")} required
                        className='textarea textarea-bordered resize-none w-full'
                        minRows={2}
                    />
                </div>
                <div className='form-controller'>
                    <label className='label label-text'>Meanings *</label>
                    <TextareaAutosize
                        {...register("meanings")} required
                        className='textarea textarea-bordered resize-none w-full'
                    />
                </div>
                <div className='form-controller'>
                    <label className='label label-text'>Example sentences *</label>
                    <TextareaAutosize
                        {...register("exampleSentences")} required
                        className='textarea textarea-bordered resize-none w-full'
                        minRows={2}
                    />
                </div>
                <div className='form-controller'>
                    <label className='label label-text'>Synonyms</label>
                    <input {...register("synonyms")} type="text" className='input input-bordered w-full' />
                </div>
                <div className='form-controller'>
                    <label className='label label-text'>Antonyms</label>
                    <input {...register("antonyms")} type="text" className='input input-bordered w-full' />
                </div>
                <div className='form-controller'>
                    <label className='label label-text'>Notes</label>
                    <TextareaAutosize
                        {...register("notes")}
                        className='textarea textarea-bordered resize-none w-full'
                        minRows={2}
                    />
                </div>
                <div className='form-controller'>
                    <label className='label label-text'>Image</label>
                    <input {...register("image")} type="text" className='input input-bordered w-full' />
                </div>
                <div className='text-center pt-2'>
                    <button type='submit' className='btn btn-sm rounded btn-primary' disabled={processing}>
                        {processing ? "Processing..." : "Add"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AddNewWordPage;

let partsOfSpeechArr = ["Noun", "Pronoun", "verb", "Adjective", "Adverb", "Preposition", "Conjunction", "Interjection"]