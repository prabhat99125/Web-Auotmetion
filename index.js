const puppeteer = require("puppeteer");
let setNo = 2441;
let spdId = 2022002955;
let students = 1;
let ExamYear = ".rcbitem:nth-child(7)";
let DegreName = ".rcbitem:nth-child(140)";

let page;
const browserProms = puppeteer.launch({
    headless: false,
    slowMo: true,
    debuggingPort: null,
    args: ["--start-maximized"]
})
    .then((browser) => {
        return page = browser.pages();
    }).then((browserPages) => {
        page = browserPages[0];
        return page.goto("https://sggu.gipl.in/Welcome.aspx");
    }).then(() => {
        let element = page.waitForSelector("[title='Click Here to View Student result']", { visible: true });
        return element;
    }).then(() => {
        return page.click("[title='Click Here to View Student result']")
        // result page starts
    }).then(() => {
        let yearOfExam = page.waitForSelector("#rcmbAcademicYear_Arrow", { visible: true });
        return yearOfExam
    }).then(() => {
        return page.click("#rcmbAcademicYear_Arrow")
    }).then(() => {
        return page.waitForSelector(".rcbItem", { visible: true })
    }).then(() => {
        return page.click(ExamYear)
    }).then(() => {
        return page.waitForSelector("#rcmbEaxm_Arrow", { visible: true });
    }).then(() => {
        return page.click("#rcmbEaxm_Arrow")
    }).then(() => {
        return page.waitForSelector(".rcbItem", { visible: true })
    }).then(() => {
        return page.click(DegreName)
    })
    //SPDID AND SET NO 

    .then(() => {
        return page.type("#txtSeatNo_text", "2441")
    }).then(() => {
        return page.type("#rtxtSPDID_text", "2022002955")
    }).then(() => {
        return page.click("#ibtnSubmit")
    })
    .catch((e) => {
        console.log(e);
    })

    .then(() => {
        const performSubmission = async (seatNo, spdId) => {
            await page.waitForSelector("#lblStudentName", { visible: true });
            await page.click("#txtSeatNo_text");

            // Simulate backspace for clearing Seat Number
            for (let i = 0; i < 5; i++) {
                await page.keyboard.press('Backspace');
            }

            await page.type("#txtSeatNo_text", seatNo);
            await page.click("#rtxtSPDID_text");

            // Simulate backspace for clearing SPDID
            for (let i = 0; i < 10; i++) {
                await page.keyboard.press('Backspace');
            }

            await page.type("#rtxtSPDID_text", spdId);
            await page.click("#ibtnSubmit");
            await page.waitForSelector("#lblSPDIDValue", {visible: true});
            let html = await page.content();
            console.log(html);

            // Wait for the page to reload
            await page.waitForSelector("#lblStudentName", { visible: true });
        };

        // Define an async function to handle the loop
        const submitEntries = async () => {
            for (let i = 1; i <= students; i++) {
                setNo = setNo + 1;
                spdId = spdId + 1;

                await performSubmission(String(setNo), String(spdId)); // Await here ensures order
                console.log(setNo);
                console.log(spdId);
            }
        };

        submitEntries().catch(console.error);

    });
