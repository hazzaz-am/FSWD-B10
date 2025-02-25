import { useState } from "react";
import "./App.css";
import NoteForm from "./components/NoteForm";
import NotesSection from "./components/NotesSection";
import { dummyNotes } from "./data";

function App() {
	const [notes, setNotes] = useState([...dummyNotes]);
	const [editMode, setEditMode] = useState(false);
	const [editableNote, setEditableNote] = useState(null);
	const [noteTitle, setNoteTitle] = useState("");

	return (
		<div className="container">
			<NoteForm
				editMode={editMode}
				editableNote={editableNote}
				noteTitle={noteTitle}
				onSetNoteTitle={setNoteTitle}
				notes={notes}
				onSetNotes={setNotes}
				onSetEditMode={setEditMode}
			/>
			<NotesSection
				onSetNoteTitle={setNoteTitle}
				onSetEditMode={setEditMode}
				onSetEditableNote={setEditableNote}
				notes={notes}
				onSetNotes={setNotes}
			/>
		</div>
	);
}

export default App;
