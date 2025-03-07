/* eslint-disable react/prop-types */

import { useState } from "react";
import { useNoteValue } from "../provider/NoteProvider";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 5;

const NotesList = ({ notes, filteredText, search }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [skip, setSkip] = useState(0);

	const ctxValue = useNoteValue();

	const removeHandler = (id) => {
		const newArr = notes.filter((note) => note.id !== id);
		ctxValue.setNotes(newArr);
	};

	const editHandler = (note) => {
		ctxValue.setNoteTitle(note.title);
		ctxValue.setEditMode(true);
		ctxValue.setEditableNote(note);
	};

	const handleCompletedTask = (task) => {
		const filteredTask = notes.map((note) => {
			if (note.id === task.id) {
				return { ...note, isCompleted: !note.isCompleted };
			}
			return note;
		});

		ctxValue.setNotes([...filteredTask]);
	};

	const filteredNotes = notes
		.filter((note) => {
			if (filteredText === "completed") {
				return note.isCompleted === true;
			} else if (filteredText === "uncompleted") {
				return note.isCompleted === false;
			} else {
				return note;
			}
		})
		.filter((note) => note.title.includes(search));

	const totalPages = Math.ceil(filteredNotes?.length / ITEMS_PER_PAGE);

	function handleCurrentPage(pageNumber) {
		setCurrentPage(pageNumber);
		setSkip((pageNumber - 1) * ITEMS_PER_PAGE);
	}

	return (
		<>
			<ul>
				{filteredNotes.slice(skip, ITEMS_PER_PAGE * currentPage).map((note) => (
					<li key={note.id}>
						<input
							type="checkbox"
							name="completed"
							id="completed"
							checked={note.isCompleted}
							onChange={() => handleCompletedTask(note)}
						/>
						<span>{note.title}</span>
						<button
							onClick={() => editHandler(note)}
							style={{
								margin: "0 10px",
							}}
						>
							Edit
						</button>
						<button onClick={() => removeHandler(note.id)}>Remove</button>
					</li>
				))}
			</ul>

			<Pagination
				totalPages={totalPages}
				handleCurrentPage={handleCurrentPage}
			/>
		</>
	);
};
export default NotesList;
