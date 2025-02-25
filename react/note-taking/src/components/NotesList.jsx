/* eslint-disable react/prop-types */
const NotesList = ({
	filteredNotes,
	editHandler,
	skip,
	currentPage,
	ITEMS_PER_PAGE,
	handleCompletedTask,
	removeHandler,
}) => {
	return (
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
	);
};
export default NotesList;
