import jsonServer from 'json-server';
import auth from 'json-server-auth';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Tạo biến __dirname (Vì ES Module không có sẵn biến này)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();

// 2. Trỏ đúng đường dẫn đến db.json nằm cùng cấp với file server.js
const router = jsonServer.router(path.join(__dirname, 'db.json'));

const middlewares = jsonServer.defaults();

// Gán db vào server
server.db = router.db;

server.use(middlewares);
server.use(auth);
server.use(router);

server.listen(3001, () => {
  console.log('JSON Server with Auth is running on port 3001');
});