var Example = Example || {}; Example["instructor"] =
webpackJsonpExample__name_([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var ReactDom = __webpack_require__(158);
	var NavBar = __webpack_require__(160);
	var InstructorPage = __webpack_require__(162);
	var FootBar = __webpack_require__(161);

	ReactDom.render(React.createElement(
	    'div',
	    null,
	    React.createElement(NavBar, null),
	    React.createElement(InstructorPage, null),
	    React.createElement(FootBar, null)
	), document.getElementById('content'));

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

/***/ },

/***/ 162:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);

	var InstructorPage = React.createClass({
	    displayName: 'InstructorPage',

	    getInitialState: function getInitialState() {
	        var ins = this;
	        var rs = {
	            students: [],
	            items: []
	        };
	        $.ajax('/v1/instructor/students', {
	            async: false
	        }).done(function (data) {
	            var dataobj = $.parseJSON(data);
	            if (dataobj.state === 'ok') {
	                rs.students = dataobj.result;
	            } else {
	                Materialize.toast(dataobj.reason, 4000);
	            }
	        });
	        return rs;
	    },
	    render: function render() {
	        var pageStyle = { marginTop: '140px' };
	        var rowStyle = { marginTop: "40px", marginBottom: "40px" };
	        return React.createElement(
	            'div',
	            { className: 'container', style: pageStyle },
	            React.createElement(
	                'div',
	                { className: 'row', style: rowStyle },
	                React.createElement(
	                    'h2',
	                    { className: 'center' },
	                    '学生信息'
	                ),
	                React.createElement('hr', null),
	                React.createElement(InstructorStudentsTable, { students: this.state.students })
	            ),
	            React.createElement(
	                'div',
	                { className: 'row', style: rowStyle },
	                React.createElement(
	                    'h2',
	                    { className: 'center' },
	                    '审核加分项目'
	                ),
	                React.createElement('hr', null),
	                React.createElement(
	                    'div',
	                    { className: 'row' },
	                    React.createElement(InstructorItems, null)
	                )
	            )
	        );
	    }
	});

	var InstructorStudentsTable = React.createClass({
	    displayName: 'InstructorStudentsTable',

	    render: function render() {
	        var rows = [];
	        this.props.students.forEach(function (student) {
	            rows.push(React.createElement(InstructorStudentTableRow, { student: student, key: student._id }));
	        });

	        return React.createElement(
	            'table',
	            { className: 'hoverable highlight centered' },
	            React.createElement(
	                'thead',
	                null,
	                React.createElement(
	                    'tr',
	                    null,
	                    React.createElement(
	                        'th',
	                        null,
	                        '姓名'
	                    ),
	                    React.createElement(
	                        'th',
	                        null,
	                        '总加分项目分数'
	                    ),
	                    React.createElement(
	                        'th',
	                        null,
	                        '绩点'
	                    ),
	                    React.createElement(
	                        'th',
	                        null,
	                        '转系绩点'
	                    )
	                )
	            ),
	            React.createElement(
	                'tbody',
	                null,
	                rows
	            )
	        );
	    }
	});

	var InstructorStudentTableRow = React.createClass({
	    displayName: 'InstructorStudentTableRow',

	    render: function render() {
	        var student = this.props.student;
	        return React.createElement(
	            'tr',
	            null,
	            React.createElement(
	                'td',
	                null,
	                student.name
	            ),
	            React.createElement(
	                'td',
	                null,
	                student.score
	            ),
	            React.createElement(
	                'td',
	                null,
	                student.point
	            ),
	            React.createElement(
	                'td',
	                null,
	                student.point * 0.7 + student.score * 0.3
	            )
	        );
	    }
	});

	var InstructorItems = React.createClass({
	    displayName: 'InstructorItems',

	    getItems: function getItems() {
	        var items = [];
	        $.ajax('/v1/instructor/items', {
	            async: false
	        }).done(function (data) {
	            var dataobj = $.parseJSON(data);
	            if (dataobj.state === 'ok') {
	                items = dataobj.result;
	            } else {
	                Materialize.toast(dataobj.reason, 4000);
	            }
	        });

	        return items;
	    },
	    getInitialState: function getInitialState() {
	        var rs = {
	            items: this.getItems()
	        };

	        return rs;
	    },
	    handleConfirm: function handleConfirm(score, item_id) {
	        //修改item 的分
	        var ins = this;
	        $.ajax('/v1/instructor/item', {
	            async: false,
	            method: "PUT",
	            data: {
	                score: score,
	                item_id: item_id
	            }
	        }).done(function (data) {
	            var dataobj = $.parseJSON(data);
	            if (dataobj.state === 'ok') {
	                Materialize.toast("修改成功", 4000);
	                var items = ins.getItems();
	                ins.setState({ items: items });
	            } else {
	                Materialize.toast(dataobj.reason, 4000);
	            }
	        }).fail(function (err) {
	            console.log(err);
	            Materialize.toast(err, 4000);
	        });
	    },
	    render: function render() {
	        var _this = this;

	        var rows = [];
	        this.state.items.forEach(function (item) {
	            rows.push(React.createElement(InstructorItemsRow, { item: item, key: item._id, handleConfirm: _this.handleConfirm }));
	        });
	        return React.createElement(
	            'table',
	            { className: 'hoverable highlight centered' },
	            React.createElement(
	                'thead',
	                null,
	                React.createElement(
	                    'tr',
	                    null,
	                    React.createElement(
	                        'th',
	                        { 'data-field': 'name' },
	                        '姓名'
	                    ),
	                    React.createElement(
	                        'th',
	                        { 'data-field': 'price' },
	                        '加分项目'
	                    ),
	                    React.createElement(
	                        'th',
	                        { 'data-field': 'price' },
	                        '加分数'
	                    ),
	                    React.createElement(
	                        'th',
	                        { 'data-field': 'price' },
	                        '操作'
	                    )
	                )
	            ),
	            React.createElement(
	                'tbody',
	                null,
	                rows
	            )
	        );
	    }
	});

	var InstructorItemsRow = React.createClass({
	    displayName: 'InstructorItemsRow',

	    handleConfirm: function handleConfirm() {
	        var score = this.refs.score_input.value;
	        var item_id = this.props.item._id;
	        this.props.handleConfirm(score, item_id);
	    },
	    render: function render() {
	        var item = this.props.item;
	        return React.createElement(
	            'tr',
	            null,
	            React.createElement(
	                'td',
	                null,
	                item.name
	            ),
	            React.createElement(
	                'td',
	                null,
	                item.detail
	            ),
	            React.createElement(
	                'td',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'input-field' },
	                    React.createElement('input', { ref: 'score_input', id: 'last_name', type: 'text', className: 'validate' }),
	                    React.createElement(
	                        'label',
	                        { htmlFor: 'last_name' },
	                        '加分数'
	                    )
	                )
	            ),
	            React.createElement(
	                'td',
	                null,
	                React.createElement(
	                    'button',
	                    { className: 'waves-effect waves-light btn', onClick: this.handleConfirm },
	                    '同意'
	                ),
	                React.createElement(
	                    'button',
	                    { className: 'waves-effect waves-light btn red', onClick: this.handleNotConfirm },
	                    '不同意'
	                )
	            )
	        );
	    }
	});

	module.exports = InstructorPage;

/***/ }

});