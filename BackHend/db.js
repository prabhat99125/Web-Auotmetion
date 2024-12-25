const mongoose = require("mongoose");

const url = "............................................";
const localdb = "mongodb://localhost:27017/SGGU"
mongoose.connect(url)
    .then(() => {
        console.log("Deta Beas is conected");
    }).catch((e) => {
        console.log(e);
    })

const studentSchama = mongoose.Schema({
    studentName: String,
    enrollmentNo: Number,
    spdId: Number,
    seatNo: Number,
    subjects: Array
});
module.exports = mongoose.model("abc", studentSchama)
