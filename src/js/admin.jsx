var React = require('react');
var ReactDom = require('react-dom');
var AdminPage = require('./components/admin_page');
var NavBar = require('./components/navbar');
var FootBar = require('./components/footbar');

ReactDom.render(
    <div>
        <NavBar />
        <AdminPage />
        <FootBar />
    </div>,
    document.getElementById('content')
);