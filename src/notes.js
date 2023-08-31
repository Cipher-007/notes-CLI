import { getDB, insert, saveDB } from "./db.js";

export async function newNote(note, tags) {
  const newNote = {
    tags,
    content: note,
    id: Date.now(),
  };

  await insert(newNote);
  return newNote;
}

export async function getAllNotes() {
  const { notes } = await getDB();
  return notes;
}

export async function findNotes(filter) {
  const notes = await getAllNotes();
  return notes.filter((note) =>
    note.content.toLowerCase().includes(filter.toLowerCase())
  );
}

export async function removeNote(id) {
  const notes = await getAllNotes();
  const match = notes.find((note) => note.id === id);

  if (match) {
    const newNote = notes.filter((note) => note.id !== id);
    await saveDB({ notes: newNote });
    return id;
  }
}

export async function removeAllNotes() {
  await saveDB({ notes: [] });
}
