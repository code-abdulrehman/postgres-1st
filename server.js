import "dotenv/config"
import express from 'express';
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    return res.send("Hy I;m runing");
})

// middleware 
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes 
app.use(router);

app.listen(PORT, () => {
    console.log(`Server in runing Port ${PORT}`);
})