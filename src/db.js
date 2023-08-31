import fs from "node:fs/promises";
import path from "node:path";

const DB_PATH = path.join(process.cwd(), "db.json");

export async function getDB() {
  const db = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(db);
}

export async function saveDB(db) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
}

export async function insert(note) {
  const db = await getDB();

  db.notes.push(note);

  await saveDB(db);
  return note;
}
