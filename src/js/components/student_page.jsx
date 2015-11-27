var React = require('react');
var ReactDom = require('react-dom');

var StudentPage = React.createClass({
    getInitialState:function(){
        var rs={
            student:{},
            items:[]
        };
        $.ajax('/v1/student/info',{
            async:false,
            cache:false
        }).done(function(data){
            var dataobj = $.parseJSON(data);
            if(dataobj.state==='ok'){
                rs.student = dataobj.result
            }else{
                Materialize.toast(dataobj.reason,4000);
            }
        });
        $.ajax('/v1/student/items',{
            async:false,
            cache:false
        }).done(function (data) {
            var dataobj = $.parseJSON(data);
            if(dataobj.state==='ok'){
                rs.items = dataobj.result;
            }else{
                Materialize.toast(dataobj.reason,4000);
            }
        });
        return rs
    },
    _handleRefreshItems:function(){
        var reactIns = this;
        $.getJSON('/v1/student/items',{},function(data){
            if(data.state==='ok'){
                reactIns.setState({
                    items:data.result
                });
            }
        });
    },
    handleUserSubmitBranch:function(data){
        var ins = this;
        var userState = this.state.student;
        $.ajax('/v1/student/branch',
            {
                data:{
                    branch:data
                },
                method:'post'
            }
        ).done(function(newdata){
            var dataobj = $.parseJSON(newdata);
            if(dataobj.state === 'ok'){
                Materialize.toast('修改成功',4000);
                userState.branch=data;
                ins.setState({
                    student:userState
                })
            }
        }).fail(function(err){
            Materialize.toast(err,4000);
        });
    },
    render:function(){
        var high_margin_top = {
            marginTop:'140px'
        };
        var choice_sytle = {
            marginTop:'40px',
            marginBottom:'40px'
        };
        return(
            <div className="container" style={high_margin_top}>
                <div className="row">
                    <StudentInfn student={this.state.student}/>
                    <StudentAddItemForm handleRefreshItems={this._handleRefreshItems}/>
                </div>
                <div className="row">
                    <h2 className="center">加分项目</h2>
                    <hr/>
                    <StudentPlusScoreItemTable items={this.state.items}  handleRefreshItems={this._handleRefreshItems}/>
                </div>
                <div className="row">
                    <div className="row" style={choice_sytle}>
                        <h2 className="center">专业分支选择</h2>
                        <hr/>
                        <StudentBrcnchChoice handleUserSubmitBranch={this.handleUserSubmitBranch}/>
                    </div>
                </div>
            </div>
        );
    }
});


var StudentInfn = React.createClass({
    render:function(){
        return(
            <div className="col s12 l6 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">用户信息</span>
                        <p>用户名称: {this.props.student.username}</p>
                        <p>院系:{this.props.student.faculty}</p>
                        <p>当期分流信息:{this.props.student.branch}</p>
                        <p>当前分数排名:{this.props.student.rank}</p>
                    </div>
                </div>
            </div>
        );
    }
});

var StudentAddItemForm = React.createClass({
    _handleUserSubmit:function(){
        var reactIns = this;
        var value = this.refs.item.value;
        $.ajax('/v1/student/item',
            {
                async:false,
                cache:false,
                data:{
                    detail:value
                },
                method:'POST'
            }
        ).done(function(data){
            var dataobj = $.parseJSON(data);
            if(dataobj.state==='ok'){
                Materialize.toast("创建成功，等待审核",4000);
                reactIns.props.handleRefreshItems();
            }else{
                Materialize.toast(dataobj.reason,4000)
            }
        });
    },
    render:function(){
        return (
            <div className="col s12 l6 m6">
                <div className="input-field">
                    <textarea id="textarea1" className="materialize-textarea" ref="item" length="120"></textarea>
                    <label htmlFor="textarea1">填写新的加分项目</label>
                </div>
                <div className="input-field">
                    <button className="btn waves-effect waves-light"  name="action" onClick={this._handleUserSubmit}>Submit
                        <i className="material-icons right">send</i>
                    </button>
                </div>
            </div>
        );
    }
});
var StudentPlusScoreItemTable = React.createClass({
    render:function(){
        var ins = this;
        var items = this.props.items;
        var rows = [];
        items.forEach(function(item){
            rows.push(<StudentPlusScoreItemTableRow item={item} key={item._id} handleRefreshItems={ins.props.handleRefreshItems}/>);
        });
        return(
            <table className="hoverable highlight centered">
                <thead>
                <tr>
                    <th>加分项目描述</th>
                    <th>状态</th>
                    <th>加分</th>
                    <th>操作</th>
                </tr>
                </thead>

                <tbody>{rows}</tbody>
            </table>
        );
    }
});

var StudentPlusScoreItemTableRow = React.createClass({
    _handlerDeleteClick:function(ev){
        var item_id = ev.target.dataset.itemid;
        var ins = this;
        //删除这个项目
        $.ajax(
            '/v1/student/item',{
                method:'DELETE',
                data:{
                    item_id:item_id
                }
            }
        ).done(function(data){
            var dataobj = $.parseJSON(data);
            if(dataobj.state==='ok'){
                Materialize.toast("删除成功!",4000);
                ins.props.handleRefreshItems();
            }else{
                Materialize.toast(dataobj.reason,4000);
            }
        }).fail(function(err){
            Materialize.toast(err.reason,4000);
        });
    },
    render:function(){
        return(
            <tr>
                <td>{this.props.item.detail}</td>
                <td>{this.props.item.state}</td>
                <td>{this.props.item.score}</td>
                <td><button data-itemid={this.props.item._id} className="waves-effect waves-light btn red" onClick={this._handlerDeleteClick}>删除</button></td>
            </tr>
        );
    }
});

var StudentBrcnchChoice = React.createClass({
    getDefaultProps: function () {
        var rs = {
            branches:[]
        };
        $.ajax('/v1/student/branches',{
            async:false
        }).done(function(data){
            var dataobj = $.parseJSON(data);
            if(dataobj.state === 'ok'){
                rs.branches = dataobj.result;
            }else{
                Materialize.toast(dataobj.reason,4000);
            }
        }).fail(function(err){
            Materialize.toast(err,4000);
        });

        return rs;
    },
    componentDidMount: function () {
        $('select').material_select();
    },
    handleUserSubmitBranch:function(){
        var data = this.refs.branchSelect.value;
        this.props.handleUserSubmitBranch(data);
    },
    render:function(){
        var rows = [];
        this.props.branches.forEach(function(branch){
            rows.push(<StudentBranchChoiceOption branch={branch} key={branch}/>);
        });
        return(
            <div className="row">
                <div className="col s6 l6 m6">
                    <p className="center">当前选择专业</p>
                </div>

                <div className="input-field col s4">
                    <select ref="branchSelect">
                        <option value="" disabled="disabled">选择专业分流方向</option>
                        {rows}
                    </select>
                    <label>专业分支选择</label>

                </div>
                <div className="input-field col s2">
                    <button onClick={this.handleUserSubmitBranch} className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>submit</button>
                </div>
            </div>
        );
    }
});

var StudentBranchChoiceOption = React.createClass({
    render:function(){
        return(
            <option value={this.props.branch}>{this.props.branch}</option>
        );
    }
});


module.exports = StudentPage;