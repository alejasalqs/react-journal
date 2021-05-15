import React from "react";
import { useSelector } from "react-redux";
import { NoteScreen } from "../notes/NoteScreen";
import { NothingSelected } from "./NothingSelected";
import { Sidebar } from "./Sidebar";

export const JournalScreen = () => {
  const { active } = useSelector((state) => state.notes);
  return (
    <div className="journal__main-content">
      <Sidebar />
      {/*Si tenemos algo seleccionado mostramos la nota activa, si no el otro componente*/}
      <main>{active ? <NoteScreen /> : <NothingSelected />}</main>
    </div>
  );
};
