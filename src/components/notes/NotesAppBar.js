import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploadingFiles } from "../../actions/notes";

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);
  const handleSave = () => {
    dispatch(startSaveNote(active));
  };
  const handlePictureUpload = () => {
    document.querySelector("#fileSelector").click();
  };
  const handleFileChange = (e) => {
    const files = e.target.files[0];
    if (files) {
      dispatch(startUploadingFiles(files));
    }
  };
  return (
    <div className="notes__app-bar">
      <span>28 de agosto 2020</span>
      <input
        type="file"
        name="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
        id="fileSelector"
      />
      <div>
        <button className="btn" onClick={handlePictureUpload}>
          Picture
        </button>
        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
