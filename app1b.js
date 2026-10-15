// CRUD operations of college event table
// Database name: college
// Table name: college event table

// Initialize project:
// npm init -y
// npm install express mysql2
require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.json());

// Read HTML files from public1 folder
app.use(express.static("public1"));

// Connect to college database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((err) => {
if (err) {
console.log("MySQL connection error:", err.message);
return;
}

console.log("Connected to MySQl");

});

// GET: Display all events
app.get("/events", (req, res) => {
db.query(
"SELECT * FROM `college event table`",
(err, result) => {
if (err) {
return res.status(500).send(err.message);
}

        res.json(result);
    }
);

});

// GET: Display one event
app.get("/events/:id", (req, res) => {
db.query(
"SELECT * FROM `college event table` WHERE event_id = ?",
[req.params.id],
(err, result) => {
if (err) {
return res.status(500).send(err.message);
}

        res.json(result);
    }
);

});

// POST: Insert event
app.post("/events", (req, res) => {
const {
event_id,
event_name,
event_time,
event_day,
venue,
description
} = req.body;

const sql = `
    INSERT INTO \`college event table\`
    (event_id, event_name, event_time, event_day, venue, description)
    VALUES (?, ?, ?, ?, ?, ?)
`;

db.query(
    sql,
    [
        event_id,
        event_name,
        event_time,
        event_day,
        venue,
        description
    ],
    (err, result) => {
        if (err) {
            return res.status(500).send(err.message);
        }

        res.send("Event Inserted Successfully");
    }
);

});

// PUT: Update event
app.put("/events/:id", (req, res) => {
const {
event_name,
event_time,
event_day,
venue,
description
} = req.body;

const sql = `
    UPDATE \`college event table\`
    SET event_name = ?,
        event_time = ?,
        event_day = ?,
        venue = ?,
        description = ?
    WHERE event_id = ?
`;

db.query(
    sql,
    [
        event_name,
        event_time,
        event_day,
        venue,
        description,
        req.params.id
    ],
    (err, result) => {
        if (err) {
            return res.status(500).send(err.message);
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Event Not Found");
        }

        res.send("Event Updated Successfully");
    }
);


});

// DELETE: Delete event
app.delete("/events/:id", (req, res) => {
db.query(
"DELETE FROM `college event table` WHERE event_id = ?",
[req.params.id],
(err, result) => {
if (err) {
return res.status(500).send(err.message);
}


        if (result.affectedRows === 0) {
            return res.status(404).send("Event Not Found");
        }

        res.send("Event Deleted Successfully");
    }
);


});

// Start server
app.listen(3000, () => {
console.log("Server running at http://localhost:3000");
});
