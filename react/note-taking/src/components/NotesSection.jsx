import { useState } from "react";
import NotesFilter from "./NotesFilter";
import NotesList from "./NotesList";
import { useNoteValue } from "../provider/NoteProvider";


const NotesSection = () => {
	const [filteredText, setFilteredText] = useState("all");
	const [search, setSearch] = useState("");;

	const ctxValue = useNoteValue();

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
					filteredText={filteredText}
					search={search}
				/>
			</div>
		</div>
	);
};
export default NotesSection;
