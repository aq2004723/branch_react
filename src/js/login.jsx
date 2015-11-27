var React = require('react');
var ReactDom = require('react-dom');
var LoginPage = require('./components/login_page');


ReactDom.render(
  <LoginPage />,
  document.getElementById('content')
);