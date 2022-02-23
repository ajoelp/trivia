import "dotenv/config";
import app from "./app";
import { HOST, PORT } from "./config";

app.listen(PORT, HOST, () => {
  console.log(`Listening on port http://${HOST}:${PORT}`);
});
