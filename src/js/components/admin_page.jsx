import React from 'react';
var ReactDom = require('react-dom');


var AdminPage = React.createClass({
    componentDidMount: function () {
        $('select').material_select();
    },
    getBranches:function(){
        var branches =[];
        $.ajax(
            '/v1/admin/branches',
            {
                async:false
            }
        ).done((data)=>{
            var dataobj = $.parseJSON(data);
            if(dataobj.state==='ok'){
                branches=dataobj.resule;
            }
        }).fail((err)=>{
            console.log(err);
        });

        return branches;
    },
    getStudents:function(faculty){
        var students = [];
        $.ajax(
            '/v1/admin/students',
            {
                async:false,
                data:{
                    faculty:faculty
                }
            }
        ).done((data)=>{
            var dataobj = $.parseJSON(data);
            if(dataobj.state==='ok'){
                students=dataobj.resule;
            }
        }).fail((err)=>{
            console.log(err);
        });

        return students;
    },
    getDefaultProps:function(){
        return {
            branches:this.getBranches()
        };
    },
    getInitialState:function(){
        var branch = this.props.branches[0];
        return {
            students:this.getStudents(branch)
        };
    },
    render:function(){
        var margin_top = {
            marginTop:"140px"
        };
        var rowstyle = {
            marginTop:'40px',
            marginBottom:'40px'
        };
        return(
            <div className="container" style={margin_top}>
                <div className="row" style={rowstyle}>
                    <h2 className="center">学生信息</h2>
                    <div className="row">
                        <AdminBranchSelection branches={this.props.branches} />
                    </div>
                    <hr/>
                    <div className="row">
                        <AdminStudentInfoTbale students={this.state} />
                    </div>
                </div>
            </div>
        );
    }
});

var AdminBranchSelection = React.createClass({

    getInitialState:function(){
        return {
            branches:this.getBranches(),
            students:[]
        };
    },
    handleSelectChange:function(){
        console.log(this.refs.branch_select_multiple.value);
    },
    componentDidMount:function(){
        $(ReactDom.findDOMNode(this.refs.branch_select)).on('change', () => {
            var value = this.refs.branch_select.value;
        });
    },
    render:function(){
        var rows = [];
        this.state.branches.forEach((branch)=>{
            rows.push(<AdminBranchSelectionOption branch={branch}/>);
        });
        return(
            <div className="input-field col s4">
                <select ref="branch_select">
                    <option disabled="disabled">按专业选择课程</option>
                    {rows}
                </select>
                <label>专业分支选择</label>
            </div>
        );
    }
});

var AdminBranchSelectionOption = React.createClass({
    render:function(){
        return(
            <option value={this.props.branch}>{this.props.branch}</option>
        );
    }
});

var AdminStudentInfoTbale = React.createClass({
    render:function(){
        return(
            <table className="hoverable highlight centered">
                <thead>
                <tr>
                    <th>学号</th>
                    <th>姓名</th>
                    <th>学生志愿</th>
                    <th>成绩排名</th>
                    <th>绩点排名</th>
                    <th>选择分流</th>
                </tr>
                </thead>
                <tbody><AdminStudentInfoTbaleRow /></tbody>
            </table>
        );
    }
});

var AdminStudentInfoTbaleRow = React.createClass({
    render:function(){
        return(
            <tr>
                <td>2131206</td>
                <td>王大锤</td>
                <td>高富帅</td>
                <td>70/140</td>
                <td>60/140</td>
                <td>
                    <div className="input-field">
                        <select>
                            <option value="selected" disabled>选择分流</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                        </select>
                        <label>专业分支选择</label>
                    </div>
                </td>
            </tr>
        );
    }
});


module.exports = AdminPage;