import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getNotes} from '../../store/note'
import NewKeep from "../NewKeep/newKeep";
import { Redirect } from 'react-router-dom';
import Notecard from "../Notecard/Notecard";
import './noteList.css'
export default function NoteList() {
    const dispatch = useDispatch();
    const notes = Array.from(useSelector(state => state.notes))
    const user = useSelector(state => state.session.user)
    
    useEffect(()=> {
        if (user) {
            dispatch(getNotes(user.id))
        }
    },[user])
    
   
    if (!user) return (
        <Redirect to="/" />
      ) 
    return (
        
        <div className="container">
           
        <NewKeep />
        

       
        <div className="notePad">
            {notes && 
            notes.map(note => {
                return <Notecard key={note.id} title={note.title} task={note.noteText} noteId={note.id}/>
                // return <li key={note.id}>{note.noteText} <button onClick={()=>handleDelete(note.id)}>X</button> <button onClick={()=>handleEdit(note.id)}>edit</button></li>
            })}
        </div>
        
      
        </div>
    )
}
