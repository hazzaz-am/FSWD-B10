import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import NoteProvider from "./provider/NoteProvider.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
	<NoteProvider>
		<App />
	</NoteProvider>
);
