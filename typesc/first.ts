interface ps {
    firstName: string;
    lastName: string;
}

function start (person: ps) {
    return "Hello, "+person.firstName + " " + person.lastName;
}

var user = {firstName: 'Jane', lastName: 'User'};
document.body.innerHTML = start(user);