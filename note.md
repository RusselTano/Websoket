# app.listen(PORT, () => {}) dans Express

```js
const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT} you can open your browser on http://localhost:${PORT}`);
});
```
lorsque j'appelle app.listen(PORT, () => {}), **Express** utilise le module **http** pour créer un serveur HTTP et associe mon application Express à ce serveur. C'est comme si j'ecrivais moi-même ce code:

```js
const http = require("http");
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`listening on port ${PORT} you can open your browser on http://localhost:${PORT}`);
});
```