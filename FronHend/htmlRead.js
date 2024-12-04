const fs = require("fs");
const cheerio = require("cheerio");


const ReadHtml = async (HTML, seatNo) => {
  const $ = cheerio.load(HTML);

  const studentName = $('#lblStudentName').text().trim();
  const enrollmentNo = Number($('#lblEnrollValue').text().trim());
  const spdId = Number($('#lblSPDIDValue').text().trim());
  // Extract subjects and their marks
  let subjects = [];
  $('tbody tr.rgRow, tbody tr.rgAltRow').each((i, row) => {
    const subjectCode = $(row).find('td').eq(0).text().trim();
    const subjectName = $(row).find('td').eq(1).text().trim();
    const externalMarks = Number($(row).find('td').eq(2).text().trim());
    const internalMarks = Number($(row).find('td').eq(3).text().trim());

    subjects.push({
      subjectCode,
      subjectName,
      externalMarks,
      internalMarks,

    });
  });

  // Create JSON object
  const studentData = {
    studentName,
    enrollmentNo,
    spdId,
    seatNo,
    subjects
  };
   return await postData(studentData)

  async function postData(userData) {
    try {
      const response = await fetch('http://localhost:1212/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),

      });
      let dataResive = await response.json()
      console.log(`---------------------------`)
      // console.log("Respons htmlRead :", dataResive)
      console.log("DB :", dataResive.seatNo)
      console.log("Local", userData.seatNo)

      if (String(dataResive.seatNo).trim()  === String(userData.seatNo).trim()) {
        console.log("equl");
        return (Number(seatNo))
      } else if(dataResive.seatNo === null) {
        return (Number(seatNo))
      } else {
        console.log("Not equl : ",userData.seatNo)
        let editSpdid = (Number(userData.seatNo) - 1);
        return (editSpdid)
        
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

}
module.exports = ReadHtml