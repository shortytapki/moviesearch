const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
	const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
	try {
		const { username, password } = req.body;
		const { users = [] } = db;
		const userFromDB = users.find(
			(user) => user.username === username && user.password === password,
		);
		if (userFromDB) {
			return res.json({ username: userFromDB.username });
		}

		return res.status(404).json({ message: 'User not found' });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
});

server.use(router);

// запуск сервера
server.listen(5173, () => {
	console.log('server is running on 5173 port');
});