import { useNoteValue } from "../provider/NoteProvider";

const NoteForm = () => {
	const {
		state: { noteTitle, editMode },
		dispatch,
		submitHandler,
	} = useNoteValue();

	return (
		<form onSubmit={submitHandler} className="note-form">
			<input
				value={noteTitle}
				type="text"
				onChange={(e) =>
					dispatch({ type: "TRACK_NOTE_TITLE", payload: e.target.value })
				}
			/>
			<button type="submit">
				{editMode === true ? "Updated Note" : "Create Note"}
			</button>
		</form>
	);
};
export default NoteForm;
