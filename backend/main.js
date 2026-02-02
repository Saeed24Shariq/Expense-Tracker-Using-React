import express from 'express';
import cors from 'cors';
import Papa from 'papaparse';
import fs from 'fs';

const app = express();
// Adding middleware
app.use(cors());
app.use(express.json());

// file Path of CSV
const filePath = './../expense-tracker/Results/Result.csv';

app.post('/add-expense', (req, res) => {
    const newRow = req.body;    // fetching data from frontend
    const file = fs.readFileSync(filePath, 'utf-8'); // opening a file stream
    const parsed = Papa.parse(file, {
        header: true,
        skipEmptyLines: true
    })  // parsing data of existing csv file

    let new_id = parsed.data.length;
    newRow.id = new_id;
    parsed.data.push(newRow);   // pushing a new row


    const csv = Papa.unparse(parsed.data)   // unparsing again

    fs.writeFileSync(filePath, csv);    // saving file

    res.json({
        success: true
    }); // sending response that file is saved

    console.log("file added successfully")

})


app.post('/delete-expense', (req, res) => {
    const { id } = req.body;    // fetching data from frontend
    const file = fs.readFileSync(filePath, 'utf-8'); // opening a file stream
    let parsed = Papa.parse(file, {
        header: true,
        skipEmptyLines: true
    })  // parsing data of existing csv file
    console.log(parsed);
    parsed.data = parsed.data.filter((item) => item.id !== id)

    const csv = Papa.unparse(parsed.data)   // unparsing again

    fs.writeFileSync(filePath, csv);    // saving file

    res.json({
        success: true
    }); // sending response that file is saved

    console.log("file Updated successfully")

})

app.get('/report', (req, res) => {
    const file = fs.readFileSync(filePath, 'utf-8'); // opening a file stream
    let parsed = Papa.parse(file, {
        header: true,
        skipEmptyLines: true
    })  // parsing data of existing csv file

    let data = parsed.data;

    let labels = [];
    let totalIn = [];
    let totalOut = [];


    for (let element of data) {
        if (labels.includes(element.Date)) {
            continue;
        }
        else {
            labels.push(element.Date);
        }
        console.log(labels);
    }


    for (let date of labels) {
        let sum = 0;
        for (let element of parsed.data) {
            if ((date === element.Date) && element.Expense >= 0) {
                sum += Number(element.Expense);
            }
        }
        totalIn.push(sum);
    }

    for (let date of labels) {
        let sum = 0;
        for (let element of parsed.data) {
            if ((date === element.Date) && element.Expense < 0) {
                sum += Number(element.Expense);
            }
        }
        totalOut.push(sum)
        console.log(totalOut)
    }

    res.json({
        labels: labels,
        totalOut: totalOut,
        totalIn: totalIn,
        success: true
    }); // sending response that file is saved

})

app.listen(8080, () => {
    console.log(`Server is Listening on the port ${8080}`);
})