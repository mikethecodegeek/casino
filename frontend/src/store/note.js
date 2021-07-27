import { fetch } from './csrf';

const GET_NOTES = 'note/getNotes';
const ADD_NOTE = 'note/addNote';
const REMOVE_NOTE = 'note/removeNote';
const EDIT_NOTE = 'note/editNote';

const allNotes = (notes) => {
  return {
    type: GET_NOTES,
    payload: notes,
  };
};

const newNote = (note) => {
  return {
    type: ADD_NOTE,
    payload: note,
  };
};

const removeNote = ( id ) => {
  return {
    type: REMOVE_NOTE,
    payload: id
  };
};

const edit_note = ( id ) => {
  return {
    type: EDIT_NOTE,
    payload: id
  };
};



export const getNotes = (id) => async dispatch => {
   
    const res = await fetch(`/api/users/${id}/notes`);
    dispatch(allNotes(res.data.notes));
    console.log(res.data.notes)
    return res.data;
  };

export const addNote = (data) => async dispatch => {
    const {keep, user,title} = data;
    const res = await fetch("/api/notes/new", {
      method: "POST",
      body: JSON.stringify({
        keep,
        user,
        title
      }),
    });
    
    dispatch(newNote(res.data.note));
    return ;
  };

export const deleteNote = (id) => async dispatch => {
  
    const res = await fetch("/api/notes/delete", {
      method: "POST",
      body: JSON.stringify({
        id
      }),
    });
    
    dispatch(removeNote(id));
    return ;
  };

export const editNote = (data) => async dispatch => {
    const {id, newTitle, newText} = data;
    const res = await fetch("/api/notes/update", {
      method: "POST",
      body: JSON.stringify({
        id,
        newText,
        newTitle
      }),
    });
    
    dispatch(edit_note(res.data.note));
    return ;
  };

 

const initialState = [];

const noteReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_NOTES:
    //   newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    case ADD_NOTE:
        newState = [...state];
        newState.notes = newState.push(action.payload)
        return newState
    case REMOVE_NOTE:
        newState = [...state];
        newState.notes = newState.filter(n => n.id != action.payload)
        return newState.notes;
    case EDIT_NOTE:
        newState = [...state];
        console.log(action.payload.id)
        newState.notes = newState.map(n => {
            if (n.id == action.payload.id) {
                return action.payload
            } else {
                return n
            }
            
        })
        
        console.log(newState.notes)
        return newState.notes

    default:
      return state;
  }
};

export default noteReducer;