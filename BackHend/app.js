const express = require("express");
const app = express();
const db = require("./db")
const cors = require("cors");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "*" }));

app.post("/", async (req, res) => {
    let { studentName, enrollmentNo, spdId, seatNo, subjects } = req.body;
    const findData = await db.findOne({ spdId });
    if (findData) {
        console.log(findData.seatNo)
        res.json({ seatNo: findData.seatNo, spdId : findData.spdId });

    } else {
        console.log(`Add Student Data for ${seatNo}`)
        res.json({ seatNo: findData });
        let data = await db.create({
            studentName, enrollmentNo, spdId, subjects, seatNo
        });
        console.log(data)
    }

})

app.listen(1212, () => { console.log("servar is start ") })