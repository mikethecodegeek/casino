import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getNotes, addNote} from '../../store/note';
import './newKeep.css';

export default function NewKeep() {
    const [keep, setKeep] = useState("")
    const [title, setTitle] = useState("")
    const user = useSelector(state => state.session.user.id)

    const dispatch = useDispatch();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {keep, title, user};
        dispatch(addNote(data));
        setKeep("");
        setTitle("");
      };

    return (
      <form onSubmit={handleSubmit}>
     
        <div className="keepForm">

           <input
            className="newKeepTitle"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />

            <input
            className="newKeep"
            type="text"
            placeholder="Take a note..."
            value={keep}
            maxLength="40"
            onChange={(e) => setKeep(e.target.value)}
            required
            />
          </div>
        
      
        <button className='confirmButton' type="submit">Confirm</button>
      </form>
    )
}
