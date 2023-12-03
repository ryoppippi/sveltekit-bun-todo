import { Database } from 'bun:sqlite';
import { is, type PredicateType } from 'unknownutil';

export const TodoSchema = is.ObjectOf({
	id: is.Number,
	title: is.String,
	completed: is.LiteralOneOf([0, 1])
});

export type Todo = PredicateType<typeof TodoSchema>;

const db = new Database('db.sqlite');

/** create TODO table if not exists */
const createTableQuery = db.query(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT 0
  );
`);

/** execute the query */
createTableQuery.run();

export { db };
