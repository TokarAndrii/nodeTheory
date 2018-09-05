const bodyParser = require('body-parser');
const fs = require('fs');
var path = require('path');

const jsdom = require("jsdom");
const {JSDOM} = jsdom;

const app = require('express')();

const config = require('./config/dev.json');

app.listen(config.port);

console.log(`app listen port ${config.port}`);

const DESCRIPTION = {
    'Node.js': false,
    'NoSql': false,
    'Self-learner': false,
    ' C#': false,
    "PHP": false,
    "Pyton": false,
    "Title": null,
};


const getTech = (req, res, next) => {
    /*    Notice that the query strings are really just { key: value } pairs
        in a slightly different format: ?key1=value1&key2=value2&key3=value3.*/
    const vacancy = req.query.vacancy;
    console.log(vacancy, 'vacancy param');


    JSDOM.fromURL(vacancy,).then(dom => {

        console.log(dom.window.document.getElementById('h1-name').textContent);
        const title = dom.window.document.getElementById('h1-name').textContent;

        const card = dom.window.document.getElementsByClassName('wordwrap');
        console.log(card[0].textContent);

        DESCRIPTION.Title = title;

        Object.keys(DESCRIPTION).map(current => {
            console.log(current);
            card[0].textContent.includes(current) ? DESCRIPTION[current] = true : false;
        });


        res.status(200);

        const arr = Object.entries(DESCRIPTION);
        console.log(arr)

        /*        fs.writeFile('index.html', `<h1>${DESCRIPTION.Title}</h1>
                                             ${arr.map((curr, index) => {
                        if (index === arr.length - 1) {
                            return;
                        }
                        return `<div>${arr[index][0]}: ${arr[index][1]}</div>`
                    })})`,
                    function (err) {
                        if (err) throw err;
                        console.log('Saved!');
                    });

                res.sendFile(path.join(__dirname + '/index.html'));*/

        res.json(DESCRIPTION)


    });


    //res.json(DESCRIPTION)

};


app.get('/technologies/', getTech);

app.use((req, res, next) => {
    console.log(`${req.url} --> ${req.method}, Date:${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`);
    next();
});

app.use(bodyParser.json()); //for parsing application/json

app.use(bodyParser.urlencoded({extended: true})); //for parsing application/

app.use(function (req, res, next) {

    if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
        return res.sendStatus(204);
    }

    return next();

});


//Not found error
app.use((req, res, next) => {

    const error = new Error('404 Not Found!');

    next(error);
});

//All error
app.use((err, req, res, next) => {

    res.status(500);

    res.json({

        error: err.message,

        stack: err.stack
    });

    console.error(err.stack)
});