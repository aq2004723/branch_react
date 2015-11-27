var React = require('react');
var ReactDom = require('react-dom');
var NavBar = require('./components/navbar');
var FootBar = require('./components/footbar');

ReactDom.render(
    <div>
        <NavBar />
        <FooterBar />
    </div>,
  document.getElementById('content')
);