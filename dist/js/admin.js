var Example = Example || {}; Example["admin"] =
webpackJsonpExample__name_([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var ReactDom = __webpack_require__(158);
	var AdminPage = __webpack_require__(159);
	var NavBar = __webpack_require__(160);
	var FootBar = __webpack_require__(161);

	ReactDom.render(React.createElement(
	    'div',
	    null,
	    React.createElement(NavBar, null),
	    React.createElement(AdminPage, null),
	    React.createElement(FootBar, null)
	), document.getElementById('content'));

/***/ },

/***/ 159:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ReactDom = __webpack_require__(158);

	var AdminPage = _react2.default.createClass({
	    displayName: 'AdminPage',

	    componentDidMount: function componentDidMount() {
	        $('select').material_select();
	    },
	    render: function render() {
	        var margin_top = {
	            marginTop: "140px"
	        };
	        var rowstyle = {
	            marginTop: '40px',
	            marginBottom: '40px'
	        };
	        return _react2.default.createElement(
	            'div',
	            { className: 'container', style: margin_top },
	            _react2.default.createElement(
	                'div',
	                { className: 'row', style: rowstyle },
	                _react2.default.createElement(
	                    'h2',
	                    { className: 'center' },
	                    '学生信息'
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'row' },
	                    _react2.default.createElement(AdminBranchSelection, null)
	                ),
	                _react2.default.createElement('hr', null),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'row' },
	                    _react2.default.createElement(AdminStudentInfoTbale, null)
	                )
	            )
	        );
	    }
	});

	var AdminBranchSelection = _react2.default.createClass({
	    displayName: 'AdminBranchSelection',

	    getBranches: function getBranches() {
	        var branches = [];
	        $.ajax('/v1/admin/branches', {
	            async: false
	        }).done(function (data) {
	            var dataobj = $.parseJSON(data);
	            if (dataobj.state === 'ok') {
	                branches = dataobj.resule;
	            }
	        }).fail(function (err) {
	            console.log(err);
	        });

	        return branches;
	    },
	    getStudents: function getStudents() {
	        $.ajax('/v1/admin/students', {
	            async: false
	        }).done(function (data) {
	            var dataobj = $.parseJSON(data);
	            if (dataobj.state === 'ok') {
	                rs.branches = dataobj.resule;
	            }
	        }).fail(function (err) {
	            console.log(err);
	        });
	    },
	    getInitialState: function getInitialState() {
	        return {
	            branches: this.getBranches(),
	            students: []
	        };
	    },
	    handleSelectChange: function handleSelectChange() {
	        console.log(this.refs.branch_select_multiple.value);
	    },
	    componentDidMount: function componentDidMount() {
	        var _this = this;

	        $(ReactDom.findDOMNode(this.refs.branch_select)).on('change', function () {
	            var value = _this.refs.branch_select.value;
	        });
	    },
	    render: function render() {
	        var rows = [];
	        this.state.branches.forEach(function (branch) {
	            rows.push(_react2.default.createElement(AdminBranchSelectionOption, { branch: branch }));
	        });
	        return _react2.default.createElement(
	            'div',
	            { className: 'input-field col s4' },
	            _react2.default.createElement(
	                'select',
	                { ref: 'branch_select' },
	                _react2.default.createElement(
	                    'option',
	                    { disabled: 'disabled' },
	                    '按专业选择课程'
	                ),
	                rows
	            ),
	            _react2.default.createElement(
	                'label',
	                null,
	                '专业分支选择'
	            )
	        );
	    }
	});

	var AdminBranchSelectionOption = _react2.default.createClass({
	    displayName: 'AdminBranchSelectionOption',

	    render: function render() {
	        return _react2.default.createElement(
	            'option',
	            { value: this.props.branch },
	            this.props.branch
	        );
	    }
	});

	var AdminStudentInfoTbale = _react2.default.createClass({
	    displayName: 'AdminStudentInfoTbale',

	    render: function render() {
	        return _react2.default.createElement(
	            'table',
	            { className: 'hoverable highlight centered' },
	            _react2.default.createElement(
	                'thead',
	                null,
	                _react2.default.createElement(
	                    'tr',
	                    null,
	                    _react2.default.createElement(
	                        'th',
	                        null,
	                        '学号'
	                    ),
	                    _react2.default.createElement(
	                        'th',
	                        null,
	                        '姓名'
	                    ),
	                    _react2.default.createElement(
	                        'th',
	                        null,
	                        '学生志愿'
	                    ),
	                    _react2.default.createElement(
	                        'th',
	                        null,
	                        '成绩排名'
	                    ),
	                    _react2.default.createElement(
	                        'th',
	                        null,
	                        '绩点排名'
	                    ),
	                    _react2.default.createElement(
	                        'th',
	                        null,
	                        '选择分流'
	                    )
	                )
	            ),
	            _react2.default.createElement(
	                'tbody',
	                null,
	                _react2.default.createElement(AdminStudentInfoTbaleRow, null)
	            )
	        );
	    }
	});

	var AdminStudentInfoTbaleRow = _react2.default.createClass({
	    displayName: 'AdminStudentInfoTbaleRow',

	    render: function render() {
	        return _react2.default.createElement(
	            'tr',
	            null,
	            _react2.default.createElement(
	                'td',
	                null,
	                '2131206'
	            ),
	            _react2.default.createElement(
	                'td',
	                null,
	                '王大锤'
	            ),
	            _react2.default.createElement(
	                'td',
	                null,
	                '高富帅'
	            ),
	            _react2.default.createElement(
	                'td',
	                null,
	                '70/140'
	            ),
	            _react2.default.createElement(
	                'td',
	                null,
	                '60/140'
	            ),
	            _react2.default.createElement(
	                'td',
	                null,
	                _react2.default.createElement(
	                    'div',
	                    { className: 'input-field' },
	                    _react2.default.createElement(
	                        'select',
	                        null,
	                        _react2.default.createElement(
	                            'option',
	                            { value: 'selected', disabled: true },
	                            '选择分流'
	                        ),
	                        _react2.default.createElement(
	                            'option',
	                            { value: '1' },
	                            'Option 1'
	                        ),
	                        _react2.default.createElement(
	                            'option',
	                            { value: '2' },
	                            'Option 2'
	                        ),
	                        _react2.default.createElement(
	                            'option',
	                            { value: '3' },
	                            'Option 3'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'label',
	                        null,
	                        '专业分支选择'
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = AdminPage;

/***/ },

/***/ 160:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);

	var NavBar = React.createClass({
	    displayName: 'NavBar',

	    getDefaultProps: function getDefaultProps() {
	        var rs = {
	            user: {}
	        };
	        $.ajax('/v1/user', {
	            async: false,
	            cache: false
	        }).done(function (data) {
	            var dataobj = $.parseJSON(data);
	            if (dataobj.state === 'ok') {
	                rs.user = dataobj.result;
	            } else {
	                Materialize.toast(dataobj.reason, 4000);
	            }
	        }).fail(function (err) {
	            Materialize.toast("出错了！", 4000);
	        });
	        return rs;
	    },
	    render: function render() {
	        return React.createElement(
	            'nav',
	            null,
	            React.createElement(
	                'div',
	                { className: 'nav-wrapper blue accent-1' },
	                React.createElement(
	                    'div',
	                    { className: 'container' },
	                    React.createElement(
	                        'a',
	                        { href: '#', className: 'brand-logo' },
	                        'Logo'
	                    ),
	                    React.createElement(
	                        'ul',
	                        { id: 'nav-mobile', className: 'right hide-on-med-and-down' },
	                        React.createElement(
	                            'li',
	                            null,
	                            React.createElement(
	                                'a',
	                                { href: '#' },
	                                '欢迎',
	                                this.props.user.type,
	                                ':',
	                                this.props.user.username
	                            )
	                        ),
	                        React.createElement(
	                            'li',
	                            null,
	                            React.createElement(
	                                'a',
	                                { href: '/logout' },
	                                '注销登陆'
	                            )
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = NavBar;

/***/ },

/***/ 161:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);

	var FootBar = React.createClass({
	    displayName: "FootBar",

	    render: function render() {
	        return React.createElement(
	            "footer",
	            { className: "page-footer  blue accent-1" },
	            React.createElement(
	                "div",
	                { className: "container" },
	                React.createElement(
	                    "div",
	                    { className: "row" },
	                    React.createElement(
	                        "div",
	                        { className: "col l6 s12" },
	                        React.createElement(
	                            "h5",
	                            { className: "white-text" },
	                            "Footer Content"
	                        ),
	                        React.createElement(
	                            "p",
	                            { className: "grey-text text-lighten-4" },
	                            "You can use rows and columns here to organize your footer content."
	                        )
	                    ),
	                    React.createElement(
	                        "div",
	                        { className: "col l4 offset-l2 s12" },
	                        React.createElement(
	                            "h5",
	                            { className: "white-text" },
	                            "Links"
	                        ),
	                        React.createElement(
	                            "ul",
	                            null,
	                            React.createElement(
	                                "li",
	                                null,
	                                React.createElement(
	                                    "a",
	                                    { className: "grey-text text-lighten-3", href: "#!" },
	                                    "Link 1"
	                                )
	                            ),
	                            React.createElement(
	                                "li",
	                                null,
	                                React.createElement(
	                                    "a",
	                                    { className: "grey-text text-lighten-3", href: "#!" },
	                                    "Link 2"
	                                )
	                            ),
	                            React.createElement(
	                                "li",
	                                null,
	                                React.createElement(
	                                    "a",
	                                    { className: "grey-text text-lighten-3", href: "#!" },
	                                    "Link 3"
	                                )
	                            ),
	                            React.createElement(
	                                "li",
	                                null,
	                                React.createElement(
	                                    "a",
	                                    { className: "grey-text text-lighten-3", href: "#!" },
	                                    "Link 4"
	                                )
	                            )
	                        )
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "footer-copyright" },
	                React.createElement(
	                    "div",
	                    { className: "container" },
	                    "© 2014 Copyright Text",
	                    React.createElement(
	                        "a",
	                        { className: "grey-text text-lighten-4 right", href: "#!" },
	                        "More Links"
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = FootBar;

/***/ }

});