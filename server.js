require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const ws = require("ws");

const {PORT} = process.env

// Servir les fichiers statiques (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Route pour la page d'accueil ou route par défaut/principale
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Creation du server http
const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT} you can open your browser on http://localhost:${PORT}`);
});

// Creation du serveur WebSocket
const wss = new ws.Server({ server });

// Gestionnaire de connexion
wss.on("connection", (ws) => {
  console.log("Client connected");

  // Gestionnaire de message
  ws.on("message", (message) => {
    console.log(message);
    wss.clients.forEach((client) => {
      client.send(message); //Broadcast
    });
  });

  // Gestionnaire de déconnexion
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

wss.on("headers", (headers, req) => {
  console.log("Headers received\n", headers);
});

// Gestionnaire d'erreur
wss.on("error", (error) => {
  console.error("WebSocket error:", error);
});

// Gestionnaire de déconnexion
wss.on("close", () => {
  console.log("WebSocket server closed");
});