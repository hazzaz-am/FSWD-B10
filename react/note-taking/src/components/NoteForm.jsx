/* eslint-disable react/prop-types */

const NoteForm = ({
	editMode,
	editableNote,
	noteTitle,
	onSetNoteTitle,
	notes,
	onSetNotes,
	onSetEditMode,
}) => {
	const handleTitleChange = (event) => {
		onSetNoteTitle(event.target.value);
	};

	const createHandler = () => {
		const newNote = {
			id: Date.now() + "",
			title: noteTitle,
			isCompleted: false,
		};
		onSetNotes([newNote, ...notes]);
		onSetNoteTitle("");
	};

	const updateHandler = () => {
		const updatedNote = {
			...editableNote,
			title: noteTitle,
		};

		const removePrevNote = notes.filter((note) => note.id !== editableNote.id);

		onSetNotes([updatedNote, ...removePrevNote]);
		onSetEditMode(false);
		onSetNoteTitle("");
	};

	const submitHandler = (event) => {
		event.preventDefault();

		if (noteTitle.trim() === "") {
			return alert(`Please Provide a valid title`);
		}
		editMode === true ? updateHandler() : createHandler();
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
