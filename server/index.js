const express = require('express');
require('dotenv').config();
const cors = require('cors');


const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use("/api", require("./routes/paymentsRoute"));

app.get("/",(req,res)=>{
  res.send("Hello World");
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})