import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import Swal from "sweetalert2";

export const startNewNote = () => {
  // El segundo argumento es una funcion para obtener el state
  // Funciona como el useSelector
  // El nombre se puede cambiar
  return async (dispatch, getState) => {
    // obtenemos el uid del usuario
    const { uid } = getState().auth;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const docRef = await db.collection(`${uid}/journal/notes/`).add(newNote);

    dispatch(activeNote(docRef.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNote(notes));
  };
};

export const setNote = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    // No se pueden guardar undefined en firestore
    if (!note.url) {
      delete note.url; //react-journal
    }
    // Es necesario eliminar el id
    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    await db
      .doc(`${uid}/journal/notes/${note.id}`)
      .update(noteToFirestore)
      .catch((e) => console.log(e));

    dispatch(refreshNote(note.id, note));
    Swal.fire("Saved", note.title, "success");
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdate,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});
