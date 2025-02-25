import { useState } from "react";

const NotesFilter = () => {
	const [search, setSearch] = useState("");
	const [filteredText, setFilteredText] = useState("all");
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
					value={search}
					onChange={(event) => setSearch(event.target.value)}
				/>
			</div>

			<select
				name="filter"
				id="filter"
				value={filteredText}
				onChange={(e) => setFilteredText(e.target.value)}
			>
				<option value="all">All</option>
				<option value="completed">Completed</option>
				<option value="uncompleted">UnCompleted</option>
			</select>
		</div>
	);
};
export default NotesFilter;
