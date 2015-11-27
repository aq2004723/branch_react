var React = require('react');
var ReactDom = require('react-dom');
var NavBar = require('./components/navbar');
var StudentPage = require('./components/student_page');
var FootBar = require('./components/footbar');

ReactDom.render(
    <div>
        <NavBar />
        <StudentPage/>
        <FootBar />
    </div>,
  document.getElementById('content')
);