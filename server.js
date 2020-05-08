const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const dbconfig = require('./config/database.config.js');

//creating the app
const app = express();

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

//connect to mongodb
mongoose.connect(dbconfig.url, { useNewUrlParser: true }, (err) => {
    if (!err) console.log('mongodb connected successfully');
    else console.log('failed to connect mongodb');
}
);
mongoose.Promise = global.Promise;
app.get("/", (req, res) => {
    res.json(
        {
            "message": " Welcome to note manager"
        }
    );
})

const port = process.env.port || 3000;
app.listen(port, () => console.log(`server running at port ${port}`));
require('./app/routes/note.route.js')(app);