import React,{useState} from 'react'
import NoteContext from "./NoteContext";
export default function NoteState(props) {
  const host = "http://localhost:5000";
  const notesInitial=[]
  const [notes, setNotes] = useState(notesInitial)


    // get note
    const getNote = async() => {
      // TODO: API Call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token'),
        }, 
      });  
      const json = await response.json();
      setNotes(json);
      // console.log("JSON",json);
     
    }
  
  
  // add note
  const addNote = async(title, description, tag) => {
    // TODO: API Call  
    const response = await fetch(`${host}/api/notes/addnote`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag }) 
    });
    const json = await response.json();
    // console.log("ADD NOTE JSON: ",json);

    // logic to add a note
    const note = json;
    setNotes(notes.concat(note))
  }


  // delete note
  const deleteNote = async(id) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      }, 
    });
    const json = await response.json();
    // console.log(json);

    // logic to delete a note
    // console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }


  // edit note
  const editNote = async(id,title,description,tag) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },

      body:JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    // console.log("EDIT JSON: ", json);

    let newNotes=JSON.parse(JSON.stringify(notes))  // it creates a deep copy
    // Logic to edit in note
    for (let index = 0; index < notes.length;index++)
    {
      const element = newNotes[index];
      if(element._id===id)
      {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    } 
    setNotes(newNotes);
  } 
  
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,getNote,editNote}}>
          {props.children}
      </NoteContext.Provider>
    )
}









// import React,{useState} from 'react'
// import NoteContext from "./NoteContext";
// export default function NoteState(props) {
//     const s1 = {
//         "name": "Harsh",
//         "class":"5b"
//     }
//     const [state, setstate] = useState(s1)
//     const update = () => {
//         setTimeout(() => {
//             setstate({
//                 "name": "larry",
//                 "class":"10b"
//             })
//         }, 1000);
//     }
//     return (
//         <NoteContext.Provider value={{state, update}}>
//           {props.children}
//       </NoteContext.Provider>
//     )
// }



