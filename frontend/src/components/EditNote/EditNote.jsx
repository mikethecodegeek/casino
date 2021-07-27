import React, {useState} from 'react'
import { useDispatch} from "react-redux";
import {editNote} from '../../store/note';
import './Editor.css'

export default function EditNote({title,noteText, noteId, cancel}) {
    const [tempTitle, setTempTitle] = useState(title)
    const [tempText, setTempText] = useState(noteText)

    const dispatch = useDispatch();

    const handleCancel = () => {
        setTempTitle(title)
        setTempText(noteText)
        cancel()
    }

    const handleEdit = (e) => {
        e.preventDefault();
        const data = {id:noteId,newTitle:tempTitle,newText:tempText}
        dispatch(editNote(data));
        cancel()
    }


    return (
        <div className="editor">
             <form onSubmit={handleEdit}>
     
     <div className="keepForm">
            <h2>Edit Note</h2>

        <input
         className="newKeepTitle"
         type="text"
         placeholder="Title"
         value={tempTitle}
         onChange={(e) => setTempTitle(e.target.value)}
         required
         />

         <input
         className="newKeep"
         type="text"
         placeholder="Take a note..."
         value={tempText}
         maxLength="40"
         onChange={(e) => setTempText(e.target.value)}
         required
         />
        <div className='editorButtons'>

         <button onClick={handleEdit}>Confirm</button>
         <button onClick={handleCancel}>Cancel</button>
        </div>
       </div>
     
   
     <button className='confirmButton' type="submit">Confirm</button>
   </form>
        </div>
    )
}
