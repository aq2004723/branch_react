import React from 'react';
import $ from 'jquery';

var AdminPage = React.createClass({
    componentDidMount:function(){
        $('select').material_select();
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
                        <AdminBranchSelection />
                    </div>
                    <hr/>
                    <div className="row">
                        <AdminStudentInfoTbale />
                    </div>
                </div>
            </div>
        );
    }
});

var AdminBranchSelection = React.createClass({
    handleSelectChange:function(){
        console.log(this.refs.branch_select_multiple.value);
    },
    render:function(){
        return(
            <div className="input-field col s4">
                <select  onChange={this.handleSelectChange}>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                </select>
                <label>专业分支选择</label>
            </div>
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