import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNote, startDelete } from "../../actions/notes";
import { useForm } from "../../hooks/userForm";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);

  const [formValues, handleInputChange, reset] = useForm(note);
  const { body, title, url, id } = formValues;
  const activeId = useRef(note.id);
  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  const handleDelete = () => {
    dispatch(startDelete(id));
  };
  return (
    <div className="notes__main-content animate__animated animate__fadeIn">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Awesome tittle"
          value={title}
          onChange={handleInputChange}
          className="notes_tittle-input"
          name="title"
          autoComplete="off"
        />

        <textarea
          placeholder="What happened today"
          value={body}
          name="body"
          onChange={handleInputChange}
          className="notes__textarea"
        ></textarea>

        {url && (
          <div className="notes__image">
            <img src={`${url}`} alt={`Imagen de la nota ${title}`} />
          </div>
        )}
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
