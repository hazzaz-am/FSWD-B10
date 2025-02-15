import "./App.css";
import { useState } from "react";
import { dummyNotes } from "./data";

/**
 * ? Set Items Per Page
 */
const ITEMS_PER_PAGE = 10;

function App() {
	const [noteTitle, setNoteTitle] = useState("");
	const [notes, setNotes] = useState([...dummyNotes]);
	const [editMode, setEditMode] = useState(false);
	const [editableNote, setEditableNote] = useState(null);
	const [filteredText, setFilteredText] = useState("all");
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [skip, setSkip] = useState(0);

	/**
	 * TODO: Set Total Pages
	 */
	const totalPages = Math.ceil(notes.length / ITEMS_PER_PAGE);

	const handleTitleChange = (event) => {
		setNoteTitle(event.target.value);
	};

	const submitHandler = (event) => {
		event.preventDefault();

		if (noteTitle.trim() === "") {
			return alert(`Please Provide a valid title`);
		}
		editMode === true ? updateHandler() : createHandler();
	};

	const createHandler = () => {
		const newNote = {
			id: Date.now() + "",
			title: noteTitle,
			isCompleted: false,
		};
		setNotes([newNote, ...notes]);
		setNoteTitle("");
	};

	const removeHandler = (id) => {
		const newArr = notes.filter((note) => note.id !== id);

		setNotes(newArr);
	};

	const editHandler = (note) => {
		setNoteTitle(note.title);
		setEditMode(true);
		setEditableNote(note);
	};

	const updateHandler = () => {
		// const newArr = notes.map((note) => {
		// 	if (note.id === editableNote.id) {
		// 		return { ...note, title: noteTitle };
		// 	}

		// 	return { ...note };
		// });

		/**
		 * create a new object and update the title
		 */
		const updatedNote = {
			...editableNote,
			title: noteTitle,
		};

		/**
		 * remove previous note from the array
		 */
		const removePrevNote = notes.filter((note) => note.id !== editableNote.id);

		setNotes([updatedNote, ...removePrevNote]);
		setEditMode(false);
		setNoteTitle("");
	};

	const handleCompletedTask = (task) => {
		const filteredTask = notes.map((note) => {
			if (note.id === task.id) {
				return { ...note, isCompleted: !note.isCompleted };
			}
			return note;
		});

		setNotes([...filteredTask]);
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
		// search by text
		.filter((note) => note.title.includes(search));

	// console.log(totalPages);

	/**
	 *
	 * TODO: Set Current Page
	 */
	function handleCurrentPage(pageNumber) {
		setCurrentPage(pageNumber);
		setSkip((pageNumber - 1) * ITEMS_PER_PAGE);
	}

	return (
		<div className="container">
			<form onSubmit={submitHandler} className="note-form">
				<input value={noteTitle} type="text" onChange={handleTitleChange} />
				<button type="submit">
					{editMode === true ? "Updated Note" : "Create Note"}
				</button>
			</form>
			<div className="notes">
				<h2>All Notes</h2>

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

				<ul>
					{filteredNotes
						.slice(skip, ITEMS_PER_PAGE * currentPage)
						.map((note) => (
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
			</div>

			<div
				style={{
					margin: "50px auto",
					width: "500px",
					display: "flex",
					justifyContent: "center",
					gap: "20px",
				}}
			>
				{/* 
				/**
				 * TODO: page number
				 */}
				{Array.from({ length: totalPages }, (_, i) => (
					<button
						style={{
							cursor: "pointer",
						}}
						key={i}
						onClick={() => handleCurrentPage(i + 1)}
					>
						{i + 1}
					</button>
				))}
			</div>
		</div>
	);
}

export default App;
