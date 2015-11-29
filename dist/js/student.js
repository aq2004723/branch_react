var Example = Example || {}; Example["student"] =
webpackJsonpExample__name_([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var ReactDom = __webpack_require__(158);
	var NavBar = __webpack_require__(160);
	var StudentPage = __webpack_require__(164);
	var FootBar = __webpack_require__(161);

	ReactDom.render(React.createElement(
	    'div',
	    null,
	    React.createElement(NavBar, null),
	    React.createElement(StudentPage, null),
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

/***/ 164:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var ReactDom = __webpack_require__(158);

	var StudentPage = React.createClass({
	    displayName: 'StudentPage',

	    getInitialState: function getInitialState() {
	        var rs = {
	            student: {},
	            items: []
	        };
	        $.ajax('/v1/student/info', {
	            async: false,
	            cache: false
	        }).done(function (data) {
	            var dataobj = $.parseJSON(data);
	            if (dataobj.state === 'ok') {
	                rs.student = dataobj.result;
	            } else {
	                Materialize.toast(dataobj.reason, 4000);
	            }
	        });
	        $.ajax('/v1/student/items', {
	            async: false,
	            cache: false
	        }).done(function (data) {
	            var dataobj = $.parseJSON(data);
	            if (dataobj.state === 'ok') {
	                rs.items = dataobj.result;
	            } else {
	                Materialize.toast(dataobj.reason, 4000);
	            }
	        });
	        return rs;
	    },
	    _handleRefreshItems: function _handleRefreshItems() {
	        var reactIns = this;
	        $.getJSON('/v1/student/items', {}, function (data) {
	            if (data.state === 'ok') {
	                reactIns.setState({
	                    items: data.result
	                });
	            }
	        });
	    },
	    handleUserSubmitBranch: function handleUserSubmitBranch(data) {
	        var ins = this;
	        var userState = this.state.student;
	        $.ajax('/v1/student/branch', {
	            data: {
	                branch: data
	            },
	            method: 'post'
	        }).done(function (newdata) {
	            var dataobj = $.parseJSON(newdata);
	            if (dataobj.state === 'ok') {
	                Materialize.toast('修改成功', 4000);
	                userState.branch = data;
	                ins.setState({
	                    student: userState
	                });
	            }
	        }).fail(function (err) {
	            Materialize.toast(err, 4000);
	        });
	    },
	    render: function render() {
	        var high_margin_top = {
	            marginTop: '140px'
	        };
	        var choice_sytle = {
	            marginTop: '40px',
	            marginBottom: '40px'
	        };
	        return React.createElement(
	            'div',
	            { className: 'container', style: high_margin_top },
	            React.createElement(
	                'div',
	                { className: 'row' },
	                React.createElement(StudentInfn, { student: this.state.student }),
	                React.createElement(StudentAddItemForm, { handleRefreshItems: this._handleRefreshItems })
	            ),
	            React.createElement(
	                'div',
	                { className: 'row' },
	                React.createElement(
	                    'h2',
	                    { className: 'center' },
	                    '加分项目'
	                ),
	                React.createElement('hr', null),
	                React.createElement(StudentPlusScoreItemTable, { items: this.state.items, handleRefreshItems: this._handleRefreshItems })
	            ),
	            React.createElement(
	                'div',
	                { className: 'row' },
	                React.createElement(
	                    'div',
	                    { className: 'row', style: choice_sytle },
	                    React.createElement(
	                        'h2',
	                        { className: 'center' },
	                        '专业分支选择'
	                    ),
	                    React.createElement('hr', null),
	                    React.createElement(StudentBrcnchChoice, { handleUserSubmitBranch: this.handleUserSubmitBranch })
	                )
	            )
	        );
	    }
	});

	var StudentInfn = React.createClass({
	    displayName: 'StudentInfn',

	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'col s12 l6 m6' },
	            React.createElement(
	                'div',
	                { className: 'card blue-grey darken-1' },
	                React.createElement(
	                    'div',
	                    { className: 'card-content white-text' },
	                    React.createElement(
	                        'span',
	                        { className: 'card-title' },
	                        '用户信息'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '用户名称: ',
	                        this.props.student.username
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '院系:',
	                        this.props.student.faculty
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '当期分流信息:',
	                        this.props.student.branch
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '当前分数排名:',
	                        this.props.student.rank
	                    )
	                )
	            )
	        );
	    }
	});

	var StudentAddItemForm = React.createClass({
	    displayName: 'StudentAddItemForm',

	    _handleUserSubmit: function _handleUserSubmit() {
	        var reactIns = this;
	        var value = this.refs.item.value;
	        $.ajax('/v1/student/item', {
	            async: false,
	            cache: false,
	            data: {
	                detail: value
	            },
	            method: 'POST'
	        }).done(function (data) {
	            var dataobj = $.parseJSON(data);
	            if (dataobj.state === 'ok') {
	                Materialize.toast("创建成功，等待审核", 4000);
	                reactIns.props.handleRefreshItems();
	            } else {
	                Materialize.toast(dataobj.reason, 4000);
	            }
	        });
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'col s12 l6 m6' },
	            React.createElement(
	                'div',
	                { className: 'input-field' },
	                React.createElement('textarea', { id: 'textarea1', className: 'materialize-textarea', ref: 'item', length: '120' }),
	                React.createElement(
	                    'label',
	                    { htmlFor: 'textarea1' },
	                    '填写新的加分项目'
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'input-field' },
	                React.createElement(
	                    'button',
	                    { className: 'btn waves-effect waves-light', name: 'action', onClick: this._handleUserSubmit },
	                    'Submit',
	                    React.createElement(
	                        'i',
	                        { className: 'material-icons right' },
	                        'send'
	                    )
	                )
	            )
	        );
	    }
	});
	var StudentPlusScoreItemTable = React.createClass({
	    displayName: 'StudentPlusScoreItemTable',

	    render: function render() {
	        var ins = this;
	        var items = this.props.items;
	        var rows = [];
	        items.forEach(function (item) {
	            rows.push(React.createElement(StudentPlusScoreItemTableRow, { item: item, key: item._id, handleRefreshItems: ins.props.handleRefreshItems }));
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
	                        '加分项目描述'
	                    ),
	                    React.createElement(
	                        'th',
	                        null,
	                        '状态'
	                    ),
	                    React.createElement(
	                        'th',
	                        null,
	                        '加分'
	                    ),
	                    React.createElement(
	                        'th',
	                        null,
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

	var StudentPlusScoreItemTableRow = React.createClass({
	    displayName: 'StudentPlusScoreItemTableRow',

	    _handlerDeleteClick: function _handlerDeleteClick(ev) {
	        var item_id = ev.target.dataset.itemid;
	        var ins = this;
	        //删除这个项目
	        $.ajax('/v1/student/item', {
	            method: 'DELETE',
	            data: {
	                item_id: item_id
	            }
	        }).done(function (data) {
	            var dataobj = $.parseJSON(data);
	            if (dataobj.state === 'ok') {
	                Materialize.toast("删除成功!", 4000);
	                ins.props.handleRefreshItems();
	            } else {
	                Materialize.toast(dataobj.reason, 4000);
	            }
	        }).fail(function (err) {
	            Materialize.toast(err.reason, 4000);
	        });
	    },
	    render: function render() {
	        return React.createElement(
	            'tr',
	            null,
	            React.createElement(
	                'td',
	                null,
	                this.props.item.detail
	            ),
	            React.createElement(
	                'td',
	                null,
	                this.props.item.state
	            ),
	            React.createElement(
	                'td',
	                null,
	                this.props.item.score
	            ),
	            React.createElement(
	                'td',
	                null,
	                React.createElement(
	                    'button',
	                    { 'data-itemid': this.props.item._id, className: 'waves-effect waves-light btn red', onClick: this._handlerDeleteClick },
	                    '删除'
	                )
	            )
	        );
	    }
	});

	var StudentBrcnchChoice = React.createClass({
	    displayName: 'StudentBrcnchChoice',

	    getDefaultProps: function getDefaultProps() {
	        var rs = {
	            branches: []
	        };
	        $.ajax('/v1/student/branches', {
	            async: false
	        }).done(function (data) {
	            var dataobj = $.parseJSON(data);
	            if (dataobj.state === 'ok') {
	                rs.branches = dataobj.result;
	            } else {
	                Materialize.toast(dataobj.reason, 4000);
	            }
	        }).fail(function (err) {
	            Materialize.toast(err, 4000);
	        });

	        return rs;
	    },
	    componentDidMount: function componentDidMount() {
	        $('select').material_select();
	    },
	    handleUserSubmitBranch: function handleUserSubmitBranch() {
	        var data = this.refs.branchSelect.value;
	        this.props.handleUserSubmitBranch(data);
	    },
	    render: function render() {
	        var rows = [];
	        this.props.branches.forEach(function (branch) {
	            rows.push(React.createElement(StudentBranchChoiceOption, { branch: branch, key: branch }));
	        });
	        return React.createElement(
	            'div',
	            { className: 'row' },
	            React.createElement(
	                'div',
	                { className: 'col s6 l6 m6' },
	                React.createElement(
	                    'p',
	                    { className: 'center' },
	                    '当前选择专业'
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'input-field col s4' },
	                React.createElement(
	                    'select',
	                    { ref: 'branchSelect' },
	                    React.createElement(
	                        'option',
	                        { value: '', disabled: 'disabled' },
	                        '选择专业分流方向'
	                    ),
	                    rows
	                ),
	                React.createElement(
	                    'label',
	                    null,
	                    '专业分支选择'
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'input-field col s2' },
	                React.createElement(
	                    'button',
	                    { onClick: this.handleUserSubmitBranch, className: 'waves-effect waves-light btn' },
	                    React.createElement(
	                        'i',
	                        { className: 'material-icons left' },
	                        'cloud'
	                    ),
	                    'submit'
	                )
	            )
	        );
	    }
	});

	var StudentBranchChoiceOption = React.createClass({
	    displayName: 'StudentBranchChoiceOption',

	    render: function render() {
	        return React.createElement(
	            'option',
	            { value: this.props.branch },
	            this.props.branch
	        );
	    }
	});

	module.exports = StudentPage;

/***/ }

});