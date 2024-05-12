import app from "./app.js";

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening to port ${process.env.PORT || 3000}`);
});
