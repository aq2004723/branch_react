var Example = Example || {}; Example["login"] =
webpackJsonpExample__name_([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var ReactDom = __webpack_require__(158);
	var LoginPage = __webpack_require__(163);

	ReactDom.render(React.createElement(LoginPage, null), document.getElementById('content'));

/***/ },

/***/ 163:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);

	var LoginPage = React.createClass({
	    displayName: 'LoginPage',

	    handlerUserLogin: function handlerUserLogin() {
	        var username = this.refs.username.value;
	        var password = this.refs.password.value;

	        $.post('/v1/login', {
	            username: username,
	            password: password
	        }, function (data) {
	            var data = $.parseJSON(data);
	            if (data.state === 'ok') {
	                var user = data.result;
	                window.location.href = '/' + user.type;
	            } else {
	                Materialize.toast(data.reason, 4000);
	            }
	        });
	    },
	    render: function render() {
	        var imgUrl = '/static/image/q.jpg';
	        var loginPageSytle = {
	            height: '100vh',
	            backgroundImage: 'url(' + imgUrl + ')'
	        };
	        return React.createElement(
	            'div',
	            { className: 'valign-wrapper ', style: loginPageSytle },
	            React.createElement(
	                'div',
	                { className: 'valign container center', style: { width: '40%' } },
	                React.createElement(
	                    'div',
	                    { className: 'container center' },
	                    React.createElement(
	                        'h4',
	                        { className: 'grey-text  text-lighten-5' },
	                        '欢迎使用专业分流系统，请登陆'
	                    ),
	                    React.createElement('br', null),
	                    React.createElement('br', null),
	                    React.createElement(
	                        'div',
	                        { className: 'input-field ' },
	                        React.createElement('input', { id: 'username', type: 'text', className: 'validate', ref: 'username' }),
	                        React.createElement(
	                            'label',
	                            { htmlFor: 'username' },
	                            '用户名'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'input-field' },
	                        React.createElement('input', { id: 'password', type: 'password', className: 'validate', ref: 'password' }),
	                        React.createElement(
	                            'label',
	                            { htmlFor: 'password' },
	                            '密码'
	                        )
	                    ),
	                    React.createElement('br', null),
	                    React.createElement('br', null),
	                    React.createElement('br', null),
	                    React.createElement(
	                        'button',
	                        { className: 'btn waves-effect waves-light', onClick: this.handlerUserLogin },
	                        'Submit',
	                        React.createElement(
	                            'i',
	                            { className: 'material-icons right' },
	                            'send'
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = LoginPage;

/***/ }

});