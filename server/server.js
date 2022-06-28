import express from "express";
import Gun from "gun";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(Gun.serve);

app.get("/", (req, res) => {
  res.status(200).send(">DEBUG: Discord Node is Live!");
});

const server = app.listen(PORT, () => {
  console.log(`>DEBUG: Discord Node is listening at http://localhost:${PORT}`);
});

Gun({ web: server });
