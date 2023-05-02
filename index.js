const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB Connection Succcessful'))
    .catch((err) => {
        console.log(err)
    });

app.use(express.json())

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is starting on PORT ${PORT}`)
})