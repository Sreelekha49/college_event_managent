//To connect to database MYSQL, school table using db5.js
//app5.js
/*Execution:
Run
node app.js
Browser
http://localhost:3000/students
*/

const express = require("express");
const db = require("./db1");

const app = express();
app.get("/events", (req, res) => {
    const sql = "SELECT * FROM `college event`";

    db.query(sql, (err, results) => {
        if (err) {
            console.log("MYSQL ERROR:", err);
            return res.status(500).json({
                message: "Database query failed",
                error: err.message
            });
        }

        console.log("Events fetched:", results);
        res.json(results);
    });
});

app.listen(3000, () => {

    console.log("Server Running");

});