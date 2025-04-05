import { useNoteValue } from "../provider/NoteProvider";

const NotesFilter = () => {
	const {
		state: { searchTerm, filteredTerm },
		dispatch,
	} = useNoteValue();

	return (
		<div>
			<div
				style={{
					margin: "20px 0",
				}}
			>
				<input
					type="text"
					name="search"
					placeholder="Search by Title"
					value={searchTerm}
					onChange={(event) =>
						dispatch({ type: "TRACK_SEARCH_TERM", payload: event.target.value })
					}
				/>
			</div>

			<select
				name="filter"
				id="filter"
				value={filteredTerm}
				onChange={(e) =>
					dispatch({ type: "FILTER_TERM", payload: e.target.value })
				}
			>
				<option value="all">All</option>
				<option value="completed">Completed</option>
				<option value="uncompleted">UnCompleted</option>
			</select>
		</div>
	);
};
export default NotesFilter;
