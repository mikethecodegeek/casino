import React, {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {deleteNote, editNote} from '../../store/note'
import EditNote from '../EditNote/EditNote';

import './Notecard.css'
export default function Notecard({title, task, noteId}) {
    const [editing, setEditing] = useState(false)
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteNote(id))
    }

    const handleEdit = (id) => {
        // const newText = prompt('Please enter new text',task);
        // const data = {id,newText}
        // dispatch(editNote(data))
        setEditing(true)
    }

    return (
        <>
        <div className="noteCard">
            <h2>{title}</h2>
            <p>{task}</p>
            <div className="flex-apart cardButtons">
                <p className="cardDelete" onClick={()=>handleDelete(noteId)}> <i className="fa fa-trash" aria-hidden="true"></i></p>
                <p className="cardEdit" onClick={()=>handleEdit(noteId)}><i className="fas fa-edit"></i></p>
            </div>
        </div>
        {editing && 
            <EditNote title={title} noteText = {task} noteId={noteId} cancel={()=>setEditing(false)}/>
        }
        </>
    )
}
