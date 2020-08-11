function start(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = { firstName: 'Jane', lastName: 'User' };
document.body.innerHTML = start(user);
