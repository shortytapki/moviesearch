const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, 
// чтобы запрос не обрабатывался мгновенно.
server.use(async (req, res, next) => {
	await new Promise(() => {
		setTimeout(next, 1000);
	});
	next();
});

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

server.post('/register', (req, res) => {
	const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));

	try {
		const { username } = req.body;
		const { users = [] } = db;
		const userFromDB = users.find(
			(user) => user.username === username
		);
		if (userFromDB) {
			return res.status(409).json({ message: 'Пользователь с таким именем уже зарегистрирован' });
		}
		db.users.push(req.body);
		fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(db), 'UTF-8')
		return res.json({ username })
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