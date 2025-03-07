/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { dummyNotes } from "../data";

const NoteContext = createContext();

const NoteProvider = ({ children }) => {
	const [notes, setNotes] = useState([...dummyNotes]);
	const [editMode, setEditMode] = useState(false);
	const [editableNote, setEditableNote] = useState(null);
	const [noteTitle, setNoteTitle] = useState("");

	const ctxValue = {
		notes,
		editMode,
		editableNote,
		noteTitle,
		setNotes,
		setEditMode,
		setEditableNote,
		setNoteTitle,
	};
	return (
		<NoteContext.Provider value={ctxValue}>{children}</NoteContext.Provider>
	);
};

export default NoteProvider;

export function useNoteValue() {
	return useContext(NoteContext);
}
