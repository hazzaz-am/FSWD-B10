/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";
import { dummyNotes } from "../data";

const NoteContext = createContext();

const initialState = {
	notes: [...dummyNotes],
	editMode: false,
	editableNote: null,
	noteTitle: "",
	filteredTerm: "all",
	searchTerm: "",
};

const noteAppReducer = (state, action) => {
	switch (action.type) {
		case "TRACK_NOTE_TITLE": {
			return {
				...state,
				noteTitle: action.payload,
			};
		}

		case "TRACK_SEARCH_TERM": {
			return {
				...state,
				searchTerm: action.payload,
			};
		}

		case "CREATE_NOTE": {
			const newNote = {
				id: Date.now() + "",
				title: state.noteTitle,
				isCompleted: false,
			};
			return {
				...state,
				notes: [newNote, ...state.notes],
				noteTitle: "",
			};
		}

		case "EDIT_NOTE": {
			return {
				...state,
				editMode: true,
				editableNote: action.payload,
				noteTitle: action.payload.title,
			};
		}

		case "UPDATE_NOTE": {
			const updatedNote = {
				...state.editableNote,
				title: state.noteTitle,
			};

			const removePrevNote = state.notes.filter(
				(note) => note.id !== state.editableNote.id
			);

			return {
				...state,
				notes: [updatedNote, ...removePrevNote],
				editMode: false,
				editableNote: null,
				noteTitle: "",
			};
		}

		case "REMOVE_NOTE": {
			const newArr = state.notes.filter((note) => note.id !== action.payload);
			return {
				...state,
				notes: [...newArr],
			};
		}

		case "TOGGLE_IS_COMPLETED": {
			const filteredTask = state.notes.map((note) => {
				if (note.id === action.payload) {
					return { ...note, isCompleted: !note.isCompleted };
				}
				return note;
			});
			return {
				...state,
				notes: [...filteredTask],
			};
		}

		case "FILTER_TERM": {
			return {
				...state,
				filteredTerm: action.payload,
			};
		}

		default:
			return state;
	}
};

const NoteProvider = ({ children }) => {
	const [state, dispatch] = useReducer(noteAppReducer, initialState);

	const submitHandler = (event) => {
		event.preventDefault();

		if (state.noteTitle.trim() === "") {
			return alert(`Please Provide a valid title`);
		}
		state.editMode === true
			? dispatch({ type: "UPDATE_NOTE" })
			: dispatch({ type: "CREATE_NOTE" });
	};

	const ctxValue = {
		state,
		dispatch,
		submitHandler,
	};
	return (
		<NoteContext.Provider value={ctxValue}>{children}</NoteContext.Provider>
	);
};

export default NoteProvider;

export function useNoteValue() {
	return useContext(NoteContext);
}
