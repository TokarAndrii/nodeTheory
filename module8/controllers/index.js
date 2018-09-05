const User = require('../model/user');

/*User.create({
    firstName: "Andrii",
    secondName: "Tokar",
    age: 35,
    date: Date.now(),
    maritalStatus: true,
    position: "developer",
    comments: "some comments"
});*/

module.exports = {

    async sendUser(req, res, next) {

        const {users, greeting} = req;

        res.set('Content-Type', 'text/html');

        const result = `
    <h3 style="text-align:center;">${greeting.message} date: ${greeting.date}</h3>
    <ul style="list-style-type: none; display: flex; flex-direction: column; justify-content: center; align-items: center">
            ${users.map(curr => (`
                <li style="border: 1px solid black; padding-left: 16px; padding-top: 8px; padding-bottom: 8px; width: 500px; margin-top: 8px">
                      <span>firstName: <b>${curr.firstName}</b> </span>
                     <span>secondName: <b>${curr.secondName}</b> </span>
                     <span>age: <b>${curr.age} </b></span>
                     <span>position: <b>${curr.position} </b></span>
                     <p>comments: <b>${curr.comments} </b></p>
                      <span>date: <b>${curr.date} </b></span>
                </li>`))}
   
    </ul>
`;

        res.send(result.replace(/,/g, ""))

    },

    getGreeting(req, res, next) {
        res.status(200);

        const greeting = {

            "date": new Date(),

            message: "Hello from my app, users:"
        };

        req.greeting = greeting;

        next();
    },

    async getAllUsers(req, res, next) {

        const users = await User.find();

        req.users = users;

        next();
    },

};

