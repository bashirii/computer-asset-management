var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // Fix typo here

var server = app.listen(8080, function () {
    console.log('Server is listening on http://localhost:8080');
});

const colors = require('colors');
const moment = require('moment');

// database connection
const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'bashiri',
  password: 'Bashiri@2023',
  database: 'node_cams'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');

  // db.end();

});

// Express functionalities
app.use(bodyParser.json());

// Serve static files (e.g., CSS)
app.use(express.static('public'));

app.set("view engine", "pug");

// Middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: true }));

  
  // // Route for handling form submission
  // app.post('/login', (req, res) => {
  //   const { firstname, lastname, email, password } = req.body;
  
  //   // Insert data into the database
  //   const sql = 'INSERT INTO admin (firstname, lastname, email, password) VALUES (?, ?, ?, ?)';
  //   db.query(sql, [firstname, lastname, email, password], (err, result) => {
  //     if (err) {
  //       console.error('Error inserting data into the database:', err);
  //       return res.status(500).send('Internal Server Error');
  //     }
  
  //     console.log('Data inserted into the database:', result);
  //     //res.status(200).send('Login successful');
  //     res.redirect("/login");
  //   });
  // });


app.get('/', function (req, res) { // Fix parentheses to curly braces
    res.render('index');
});

app.get('/dashboard', function (req, res) {
  res.render('dashboard');
});

app.get('/conditions', async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      db.connect((err) => {
        if (err) reject(err);
        const query = 'SELECT * FROM conditions';

        db.query(query, (error, results, fields) => {
          if (error) reject(error);
          res.render('conditions', { conditions: results });

          resolve({ conditions: results, fields: fields });
        });

        db.end();
      });
    });

  } catch (err) {
    console.error(err.red);
    res.sendStatus(500);
  }

});



app.get('/staffs', async (req, res) => { // Fix parentheses to curly braces
  try {
    await new Promise((resolve, reject) => {
      db.connect((err) => {
        if (err) reject(err);
        const query = 'SELECT * FROM users';

        db.query(query, (error, results, fields) => {
          if (error) reject(error);
          res.render('staffs', { staffs: results });

          resolve({ staffs: results, fields: fields });
        });

        db.end();
      });
    });

  } catch (err) {
    console.error(err.red);
    res.sendStatus(500);
  }

});

app.get('/add_asset', async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      db.connect((err) => {
        if (err) reject(err);
        const query = 'SELECT * FROM conditions';

        db.query(query, (error, results, fields) => {
          if (error) reject(error);
          res.render('add_asset', { conditions: results });

          resolve({ conditions: results, fields: fields });
        });

        db.end();
      });
    });

  } catch (err) {
    console.error(err.red);
    res.sendStatus(500);
  }
  
});

app.get('/assets',  async (req, res) => { // Fix parentheses to curly braces
  try {
    await new Promise((resolve, reject) => {
      db.connect((err) => {
        if (err) reject(err);
        const query = 'SELECT assets.*, conditions.Condition_name AS ConditionName FROM assets JOIN conditions ON assets.ConditionID = conditions.ConditionID';

        db.query(query, (error, results, fields) => {
          if (error) reject(error);

          results.forEach((result) => {
            // result.AcquisitionDate = moment(result.AcquisitionDate).format('MMMM Do YYYY, h:mm:ss a');
            result.AcquisitionDate = moment(result.AcquisitionDate).format('MMMM Do, YYYY');

          });

          res.render('assets', { assets: results });

          resolve({ assets: results, fields: fields });
        });

        db.end();
      });
    });

  } catch (err) {
    console.error(err.red);
    res.sendStatus(500);
  }

});

app.get('/assigned_assets', async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      db.connect((err) => {
        if (err) reject(err);
        const query = 'SELECT assignments.*, assets.AssetName AS AssetName, assets.Serial_no AS SerialNo, CONCAT(admin.First_name, " ", admin.Last_name) AS Admin, CONCAT(staff.First_name, " ", staff.Last_name) AS Staff FROM assignments JOIN assets ON assignments.AssetID = assets.AssetID JOIN users AS admin ON assignments.AdminID = admin.UserID JOIN users AS staff ON assignments.StaffID = staff.UserID';

        db.query(query, (error, results, fields) => {
          if (error) reject(error);

          results.forEach((result) => {
            result.AssignDate = moment(result.AssignDate).format('MMMM Do, YYYY');

          });

          res.render('assigned_assets', { assignments: results });

          resolve({ assignments: results, fields: fields });
        });

        db.end();
      });
    });

  } catch (err) {
    console.error(err.red);
    res.sendStatus(500);
  }

});

app.get('/assign_asset',  async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      db.connect((err) => {
        if (err) reject(err);
        const query = 'SELECT assets.*, conditions.Condition_name AS ConditionName FROM assets JOIN conditions ON assets.ConditionID = conditions.ConditionID WHERE assets.Status = "Not in use"';

        db.query(query, (error, results, fields) => {
          if (error) reject(error);

          results.forEach((result) => {
            result.AcquisitionDate = moment(result.AcquisitionDate).format('MMMM Do, YYYY');

          });

          res.render('assign_asset', { assets: results });

          resolve({ assets: results, fields: fields });
        });

        db.end();
      });
    });

  } catch (err) {
    console.error(err.red);
    res.sendStatus(500);
  }

});
