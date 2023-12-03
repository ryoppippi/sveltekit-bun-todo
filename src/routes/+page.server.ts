import { TodoSchema, db } from '$lib/db.server.js';
import { assert, is } from 'unknownutil';

export const load = async () => {
	/** get the list of todos */
	const todos = db.query(`SELECT * FROM todos`).all();

	assert(todos, is.ArrayOf(TodoSchema));

	return {
		todos: todos.map((todo) => ({
			...todo,
			completed: todo.completed === 1
		}))
	};
};

export const actions = {
	add: async ({ request }) => {
		const data = await request.formData();
		const title = data.get('title');

		assert(title, is.String);

		const query = db.prepare(`INSERT INTO todos (title) VALUES (?)`);
		const result = query.get(title);
		console.log({ result });
		return { success: true };
	},

	remove: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		assert(id, is.String);

		const query = db.prepare(`DELETE FROM todos WHERE id = ?`);
		const result = query.run(id);
		console.log({ result });
		return { success: true };
	},

	update: async ({ request }) => {
		const data = await request.formData();
		for (const [key, value] of data.entries()) {
			console.log(`${key}: ${value}`);
		}
		const id = JSON.parse((data.get('id') as string) ?? '{}');
		const completed = data.get('completed') ?? 'off';
		console.log({ id, completed });

		assert(id, is.Number);
		assert(completed, is.LiteralOneOf(['on', 'off']));

		const compeletdForDb = completed === 'on' ? 1 : 0;

		const query = db.prepare(`UPDATE todos SET completed = ? WHERE id = ?`);
		query.run(compeletdForDb, id);
		return { success: true };
	}
};
