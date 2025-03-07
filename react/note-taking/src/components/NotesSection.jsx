import { useState } from "react";
import NotesFilter from "./NotesFilter";
import NotesList from "./NotesList";
import Pagination from "./Pagination";
import { useNoteValue } from "../provider/NoteProvider";

const ITEMS_PER_PAGE = 5;

const NotesSection = () => {
	const [filteredText, setFilteredText] = useState("all");
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [skip, setSkip] = useState(0);

	const ctxValue = useNoteValue();

	const totalPages = Math.ceil(ctxValue.notes.length / ITEMS_PER_PAGE);

	function handleCurrentPage(pageNumber) {
		setCurrentPage(pageNumber);
		setSkip((pageNumber - 1) * ITEMS_PER_PAGE);
	}

	return (
		<div>
			<div className="notes">
				<h2>All Notes</h2>
				<NotesFilter
					filteredText={filteredText}
					onSetFilteredText={setFilteredText}
					search={search}
					onSetSearch={setSearch}
				/>

				<NotesList
					notes={ctxValue.notes}
					skip={skip}
					ITEMS_PER_PAGE={ITEMS_PER_PAGE}
					currentPage={currentPage}
					filteredText={filteredText}
					search={search}
				/>
			</div>
			{/* onSetNoteTitle = {setNoteTitle}; // onSetEditMode = {setEditMode};
			onSetEditableNote = {setEditableNote}; // onSetNotes = {setNotes}; */}
			<Pagination
				totalPages={totalPages}
				handleCurrentPage={handleCurrentPage}
			/>
		</div>
	);
};
export default NotesSection;
