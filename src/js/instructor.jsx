var React = require('react');
var ReactDom = require('react-dom');
var NavBar = require('./components/navbar');
var InstructorPage = require('./components/instructor_page');
var FootBar = require('./components/footbar');

ReactDom.render(
    <div>
        <NavBar />
        <InstructorPage />
        <FootBar />
    </div>,
  document.getElementById('content')
);