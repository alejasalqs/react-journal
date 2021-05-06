import React from "react";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Awesome tittle"
          className="notes_tittle-input"
          name="noteTittle"
          autoComplete="off"
        />

        <textarea
          placeholder="What happened today"
          className="notes__textarea"
        ></textarea>

        <div className="notes__image">
          <img
            src="https://images.ctfassets.net/ycci6h8ksgtu/274nX0UsGgY2R66HKxCZQT/3c6c622e4bb4c0db93149285e49a16f9/25th_promo_2x_optimized.png"
            alt="pokemon"
          />
        </div>
      </div>
    </div>
  );
};
