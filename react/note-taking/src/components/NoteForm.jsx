
import { useNoteValue } from "../provider/NoteProvider";

const NoteForm = () => {
	const ctxValue = useNoteValue();

	const handleTitleChange = (event) => {
		ctxValue.setNoteTitle(event.target.value);
	};

	const createHandler = () => {
		const newNote = {
			id: Date.now() + "",
			title: ctxValue.noteTitle,
			isCompleted: false,
		};
		ctxValue.setNotes([newNote, ...ctxValue.notes]);
		ctxValue.setNoteTitle("");
	};

	const updateHandler = () => {
		const updatedNote = {
			...ctxValue.editableNote,
			title: ctxValue.noteTitle,
		};

		const removePrevNote = ctxValue.notes.filter(
			(note) => note.id !== ctxValue.editableNote.id
		);

		ctxValue.setNotes([updatedNote, ...removePrevNote]);
		ctxValue.setEditMode(false);
		ctxValue.setNoteTitle("");
	};

	const submitHandler = (event) => {
		event.preventDefault();

		if (ctxValue.noteTitle.trim() === "") {
			return alert(`Please Provide a valid title`);
		}
		ctxValue.editMode === true ? updateHandler() : createHandler();
	};

	return (
		<form onSubmit={submitHandler} className="note-form">
			<input
				value={ctxValue.noteTitle}
				type="text"
				onChange={handleTitleChange}
			/>
			<button type="submit">
				{ctxValue.editMode === true
					? "Updated Note"
					: "Create Note"}
			</button>
		</form>
	);
};
export default NoteForm;
