import "./App.css";
import NoteForm from "./components/NoteForm";
import NotesSection from "./components/NotesSection";

function App() {
	return (
		<div className="container">
			<NoteForm />
			<NotesSection />
		</div>
	);
}

export default App;
