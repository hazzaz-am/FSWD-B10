/* eslint-disable react/prop-types */
const NotesList = ({
	notes,
	skip,
	ITEMS_PER_PAGE,
	currentPage,
	onSetNoteTitle,
	onSetEditMode,
	onSetEditableNote,
	onSetNotes,
	filteredText,
	search,
}) => {
	const removeHandler = (id) => {
		const newArr = notes.filter((note) => note.id !== id);
		onSetNotes(newArr);
	};

	const editHandler = (note) => {
		onSetNoteTitle(note.title);
		onSetEditMode(true);
		onSetEditableNote(note);
	};

	const handleCompletedTask = (task) => {
		const filteredTask = notes.map((note) => {
			if (note.id === task.id) {
				return { ...note, isCompleted: !note.isCompleted };
			}
			return note;
		});

		onSetNotes([...filteredTask]);
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
