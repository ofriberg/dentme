import { app } from "./app";


// broken this part out due to not starting the real server, when testing
const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});