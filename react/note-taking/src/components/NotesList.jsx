
import { useState } from "react";
import { useNoteValue } from "../provider/NoteProvider";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 5;

const NotesList = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [skip, setSkip] = useState(0);

	const {
		state: { notes, filteredTerm, searchTerm },
		dispatch,
	} = useNoteValue();

	const filteredNotes = notes
		.filter((note) => {
			if (filteredTerm === "completed") {
				return note.isCompleted === true;
			} else if (filteredTerm === "uncompleted") {
				return note.isCompleted === false;
			} else {
				return note;
			}
		})
		.filter((note) => note.title.includes(searchTerm));

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
							onChange={() =>
								dispatch({ type: "TOGGLE_IS_COMPLETED", payload: note.id })
							}
						/>
						<span>{note.title}</span>
						<button
							onClick={() => dispatch({ type: "EDIT_NOTE", payload: note })}
							style={{
								margin: "0 10px",
							}}
						>
							Edit
						</button>
						<button
							onClick={() =>
								dispatch({ type: "REMOVE_NOTE", payload: note.id })
							}
						>
							Remove
						</button>
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
