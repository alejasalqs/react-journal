import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploadingFiles } from "../../actions/notes";
import moment from "moment";

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
  const date = moment(new Date().getTime());
  return (
    <div className="notes__app-bar">
      <span>{date.format("LL")}</span>
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
