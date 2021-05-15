import { db } from "../firebase/firebase-config";

export const loadNotes = async (uid) => {
  const notesSnap = await db.collection(`${uid}/journal/notes/`).get();

  const notes = [];

  notesSnap.forEach((sonSnap) => {
    // Se hace de esta manera por ser firebase
    notes.push({
      id: sonSnap.id,
      ...sonSnap.data(),
    });
  });

  return notes;
};
