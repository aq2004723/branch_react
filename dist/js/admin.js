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
	    getFaculties: function getFaculties() {
	        var faculties = [];
	        $.ajax('/v1/admin/faculties', {
	            async: false
	        }).done(function (data) {
	            var dataobj = $.parseJSON(data);
	            if (dataobj.state === 'ok') {
	                faculties = dataobj.resule;
	            }
	        }).fail(function (err) {
	            console.log(err);
	        });

	        return faculties;
	    },
	    getBranches: function getBranches(selection) {
	        var branches = [];
	        $.ajax('/v1/admin/branches', {
	            async: false,
	            data: {
	                faculty: selection
	            }
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
	    getStudents: function getStudents(faculty) {
	        var students = [];
	        $.ajax('/v1/admin/students', {
	            async: false,
	            data: {
	                faculty: faculty
	            }
	        }).done(function (data) {
	            var dataobj = $.parseJSON(data);
	            if (dataobj.state === 'ok') {
	                students = dataobj.result;
	            }
	        }).fail(function (err) {
	            console.log(err);
	        });

	        return students;
	    },
	    getInitialState: function getInitialState() {
	        var faculties = this.getFaculties();
	        var selection = faculties[0];
	        var branches = this.getBranches(selection);
	        var students = this.getStudents(faculties);
	        return {
	            faculties: faculties,
	            students: students,
	            selection: selection,
	            branches: branches
	        };
	    },
	    handleSelectChange: function handleSelectChange(selection) {
	        var students = this.getStudents(selection);
	        this.setState({
	            students: students,
	            selection: selection,
	            branches: this.getBranches(selection)
	        });
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
	                    _react2.default.createElement(AdminBranchSelection, {
	                        faculties: this.state.faculties,
	                        handleSelectChange: this.handleSelectChange,
	                        selection: this.state.selection
	                    })
	                ),
	                _react2.default.createElement('hr', null),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'row' },
	                    _react2.default.createElement(AdminStudentInfoTbale, {
	                        students: this.state.students,
	                        branches: this.state.branches
	                    })
	                )
	            )
	        );
	    }
	});

	var AdminBranchSelection = _react2.default.createClass({
	    displayName: 'AdminBranchSelection',

	    handleSelectChange: function handleSelectChange(selection) {
	        this.props.handleSelectChange(selection);
	    },
	    componentDidMount: function componentDidMount() {
	        var _this = this;

	        $(ReactDom.findDOMNode(this.refs.branch_select)).on('change', function () {
	            var selection = _this.refs.branch_select.value;
	            _this.handleSelectChange(selection);
	        });
	    },
	    render: function render() {
	        var rows = [];
	        this.props.faculties.forEach(function (faculty) {
	            rows.push(_react2.default.createElement(AdminBranchSelectionOption, { faculty: faculty, key: faculty }));
	        });
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
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
	            ),
	            _react2.default.createElement(
	                'p',
	                null,
	                '当前选择',
	                this.props.selection
	            )
	        );
	    }
	});

	var AdminBranchSelectionOption = _react2.default.createClass({
	    displayName: 'AdminBranchSelectionOption',

	    render: function render() {
	        return _react2.default.createElement(
	            'option',
	            { value: this.props.faculty },
	            this.props.faculty
	        );
	    }
	});

	var AdminStudentInfoTbale = _react2.default.createClass({
	    displayName: 'AdminStudentInfoTbale',

	    render: function render() {
	        var rows = [];
	        var ins = this;
	        this.props.students.forEach(function (student) {
	            rows.push(_react2.default.createElement(AdminStudentInfoTbaleRow, {
	                student: student,
	                key: student,
	                branches: ins.props.branches
	            }));
	        });
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
	                        '成绩'
	                    ),
	                    _react2.default.createElement(
	                        'th',
	                        null,
	                        '绩点'
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
	                rows
	            )
	        );
	    }
	});

	var AdminStudentInfoTbaleRow = _react2.default.createClass({
	    displayName: 'AdminStudentInfoTbaleRow',

	    render: function render() {
	        var student = this.props.student;
	        var rows = [];
	        //this.props.branches.forEach((branch)=>{
	        //    rows.push(<AdminStudentInfoTbaleRowOption branch={branch} key={branch} />);
	        //});
	        return _react2.default.createElement(
	            'tr',
	            null,
	            _react2.default.createElement(
	                'td',
	                null,
	                student.name
	            ),
	            _react2.default.createElement(
	                'td',
	                null,
	                student.branch ? student.branch : "尚未选择"
	            ),
	            _react2.default.createElement(
	                'td',
	                null,
	                student.score
	            ),
	            _react2.default.createElement(
	                'td',
	                null,
	                student.point
	            )
	        );
	    }
	});

	var AdminStudentInfoTbaleRowOption = _react2.default.createClass({
	    displayName: 'AdminStudentInfoTbaleRowOption',

	    render: function render() {
	        return _react2.default.createElement(
	            'option',
	            { value: this.props.branch },
	            this.props.branch
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