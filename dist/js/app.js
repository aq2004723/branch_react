var Example = Example || {}; Example["app"] =
webpackJsonpExample__name_([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(158);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _navbar = __webpack_require__(161);

	var _navbar2 = _interopRequireDefault(_navbar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_reactDom2.default.render(_react2.default.createElement(_navbar2.default, null), document.getElementById('content'));

/***/ },

/***/ 161:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);

	var NavBar = React.createClass({
	    displayName: "NavBar",

	    getDefaultProps: function getDefaultProps() {
	        var rs = {
	            user: {}
	        };
	        return rs;
	    },
	    render: function render() {
	        return React.createElement(
	            "nav",
	            null,
	            React.createElement(
	                "div",
	                { className: "nav-wrapper blue accent-1" },
	                React.createElement(
	                    "div",
	                    { className: "container" },
	                    React.createElement(
	                        "a",
	                        { href: "#", className: "brand-logo" },
	                        "Logo"
	                    ),
	                    React.createElement(
	                        "ul",
	                        { id: "nav-mobile", className: "right hide-on-med-and-down" },
	                        React.createElement(
	                            "li",
	                            null,
	                            React.createElement(
	                                "a",
	                                { href: "#" },
	                                "欢迎",
	                                this.props.user.type,
	                                ":",
	                                this.props.user.username
	                            )
	                        ),
	                        React.createElement(
	                            "li",
	                            null,
	                            React.createElement(
	                                "a",
	                                { href: "/v1/logout" },
	                                "注销登陆"
	                            )
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = NavBar;

/***/ }

});