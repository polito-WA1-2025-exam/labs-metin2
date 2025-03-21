import { getServer } from "./api/server.mjs";
import "./api/bagApi.mjs";

const app = getServer();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
