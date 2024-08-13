import React, { useState } from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useForm } from "react-hook-form";
import toast, { } from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../components/common/LoadingSpinner';

const EditAWordPage = () => {
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const { handleSubmit, register } = useForm()
    const { wordId } = useParams()
    // parts of speech state
    const [partsOfSpeeches, setPartsOFSpeeches] = useState([])

    const { data: word = {}, error, isLoading } = useQuery({
        queryKey: [`edit-word-page-${wordId}`],
        queryFn: async () => {
            const { data } = await axiosSecure(`/words/word/${wordId}`)
            // console.log(data.pos);
            setPartsOFSpeeches(() => [...data?.pos])
            return data
        }
    })


    async function onSubmit(data) {
        if (partsOfSpeeches.length < 1) return toast.error("Select parts of speech");
        let definitions = data.definitions.split("\n").filter(d => d !== "")
        let meanings = data.meanings.split("\n").filter(d => d !== "")
        let exampleSentences = data.exampleSentences.split("\n").filter(d => d !== "")
        let notes = data.notes.split("\n").filter(d => d !== "")
        const pos = partsOfSpeeches;
        const doc = {
            ...data,
            definitions, meanings, exampleSentences, notes, pos,
        }
        try {
            const res = await axiosSecure.patch(`/words/update-word/${wordId}`, doc)
            console.log(res.data);
            if (res.data?.modifiedCount > 0) {
                toast.success("New word added")
                navigate(-1, { replace: true })
            }
        } catch (err) {
            console.error(err);
        }
    }

    if (isLoading) {
        return <LoadingSpinner />
    }
    if (error) console.error(error);

    return (
        <section className='my-container'>
            <h1 className='title-3'>Edit word</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
                <div className='form-controller'>
                    <label className='label label-text'>Word *</label>
                    <input {...register("word")} defaultValue={word?.word} required type="text" className='input input-bordered w-full' />
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
                    <input {...register("pronunciation")} defaultValue={word?.pronunciation} type="text" className='input input-bordered w-full' />
                </div>
                <div className='form-controller'>
                    <label className='label label-text'>Definitions *</label>
                    <TextareaAutosize
                        {...register("definitions")} defaultValue={word?.definitions?.join("\n")} required
                        className='textarea textarea-bordered resize-none w-full'
                        minRows={2}
                    />
                </div>
                <div className='form-controller'>
                    <label className='label label-text'>Meanings *</label>
                    <TextareaAutosize
                        {...register("meanings")} defaultValue={word?.meanings?.join("\n")} required
                        className='textarea textarea-bordered resize-none w-full'
                    />
                </div>
                <div className='form-controller'>
                    <label className='label label-text'>Example sentences *</label>
                    <TextareaAutosize
                        {...register("exampleSentences")} defaultValue={word?.exampleSentences?.join("\n")} required
                        className='textarea textarea-bordered resize-none w-full'
                        minRows={2}
                    />
                </div>
                <div className='form-controller'>
                    <label className='label label-text'>Synonyms</label>
                    <input {...register("synonyms")} defaultValue={word?.synonyms} type="text" className='input input-bordered w-full' />
                </div>
                <div className='form-controller'>
                    <label className='label label-text'>Antonyms</label>
                    <input {...register("antonyms")} defaultValue={word?.antonyms} type="text" className='input input-bordered w-full' />
                </div>
                <div className='form-controller'>
                    <label className='label label-text'>Notes</label>
                    <TextareaAutosize
                        {...register("notes")} defaultValue={word?.notes?.join("\n")}
                        className='textarea textarea-bordered resize-none w-full'
                        minRows={2}
                    />
                </div>
                <div className='form-controller'>
                    <label className='label label-text'>Image</label>
                    <input {...register("image")} defaultValue={word?.image} type="text" className='input input-bordered w-full' />
                </div>
                <div className='text-center pt-2'>
                    <button className='btn btn-sm rounded btn-primary'>Add</button>
                </div>
            </form>
        </section>
    );
};

export default EditAWordPage;

let partsOfSpeechArr = ["Noun", "Pronoun", "verb", "Adjective", "Adverb", "Preposition", "Conjunction", "Interjection"]