/* eslint-disable react/prop-types */
import { createContext } from "react";

const NoteContext = createContext();

const NoteProvider = ({ children }) => {
	const value = {};
	return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

export default NoteProvider;
