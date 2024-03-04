const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const port = 3000;

const budgetSchema = require("./models/budget_schema");

const url = 'mongodb://127.0.0.1:27017/personal-budget';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/budget', async (req, res) => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to the database");

        const data = await budgetSchema.find({});
        res.json(data);
    } catch (error) {
        console.error("Error fetching budget data:", error);
        res.status(500).send("Internal Server Error");
    } finally {
        mongoose.connection.close();
    }
});

app.post("/insertBudget", async (req, res) => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to the database to insert data");

        const newData = new budgetSchema(req.body);
        const savedData = await newData.save();

        res.json(savedData);
    } catch (error) {
        console.error("Error inserting budget data:", error);
        res.status(500).send("Internal Server Error");
    } finally {
        mongoose.connection.close();
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
