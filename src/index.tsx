import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    return (
        <div>
            <p>Hello!</p>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));

interface Person {
    firstName: string;
    lastName: string;
}

function Greeter(person: Person) {
    return 'Hello ' + person.firstName + ' ' + person.lastName;
}

const user = {firstName: 'alex', lastName: 'lerner'};
const elem = document.getElementById('playing');
if (elem) {
    elem.innerHTML = Greeter(user);
}
