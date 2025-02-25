/* eslint-disable react/prop-types */

const NotesFilter = ({ filteredText, onSetFilteredText, search, onSetSearch }) => {
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
					onChange={(event) => onSetSearch(event.target.value)}
				/>
			</div>

			<select
				name="filter"
				id="filter"
				value={filteredText}
				onChange={(e) => onSetFilteredText(e.target.value)}
			>
				<option value="all">All</option>
				<option value="completed">Completed</option>
				<option value="uncompleted">UnCompleted</option>
			</select>
		</div>
	);
};
export default NotesFilter