/* eslint-disable react/prop-types */
import { useState } from "react";

const NoteForm = ({ editMode, onUpdateHandler }) => {
	const [noteTitle, setNoteTitle] = useState("");

	const handleTitleChange = (e) => {
		setNoteTitle(e.target.value);
	};

	const submitHandler = (event) => {
		event.preventDefault();

		if (noteTitle.trim() === "") {
			return alert(`Please Provide a valid title`);
		}
		editMode === true ? onUpdateHandler() : createHandler();
	};

	return (
		<form onSubmit={submitHandler} className="note-form">
			<input value={noteTitle} type="text" onChange={handleTitleChange} />
			<button type="submit">
				{editMode === true ? "Updated Note" : "Create Note"}
			</button>
		</form>
	);
};
export default NoteForm;
