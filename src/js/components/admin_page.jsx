import React from 'react';
var ReactDom = require('react-dom');


var AdminPage = React.createClass({
    componentDidMount: function () {
        $('select').material_select();
    },
    getFaculties:function(){
        var faculties =[];
        $.ajax(
            '/v1/admin/faculties',
            {
                async:false
            }
        ).done((data)=>{
            var dataobj = $.parseJSON(data);
            if(dataobj.state==='ok'){
                faculties=dataobj.resule;
            }
        }).fail((err)=>{
            console.log(err);
        });

        return faculties;
    },
    getBranches:function(selection){
        var branches = [];
        $.ajax(
            '/v1/admin/branches',
            {
                async:false,
                data:{
                    faculty:selection
                }
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
                students=dataobj.result;
            }
        }).fail((err)=>{
            console.log(err);
        });

        return students;
    },
    getInitialState:function(){
        var faculties = this.getFaculties();
        var selection = faculties[0];
        var branches = this.getBranches(selection);
        var students = this.getStudents(faculties);
        return {
            faculties:faculties,
            students:students,
            selection:selection,
            branches:branches
        };
    },
    handleSelectChange:function(selection){
        var students = this.getStudents(selection);
        this.setState({
            students:students,
            selection:selection,
            branches:this.getBranches(selection)
        });
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
                        <AdminBranchSelection
                            faculties={this.state.faculties}
                            handleSelectChange={this.handleSelectChange}
                            selection = {this.state.selection}
                        />
                    </div>
                    <hr/>
                    <div className="row">
                        <AdminStudentInfoTbale
                            students={this.state.students}
                            branches={this.state.branches}
                        />
                    </div>
                </div>
            </div>
        );
    }
});

var AdminBranchSelection = React.createClass({
    handleSelectChange:function(selection){
        this.props.handleSelectChange(selection);
    },
    componentDidMount:function(){
        $(ReactDom.findDOMNode(this.refs.branch_select)).on('change', () => {
            var selection = this.refs.branch_select.value;
            this.handleSelectChange(selection);
        });
    },
    render:function(){
        var rows = [];
        this.props.faculties.forEach((faculty)=>{
            rows.push(<AdminBranchSelectionOption faculty={faculty} key={faculty}/>);
        });
        return(
            <div>
                <div className="input-field col s4">
                    <select ref="branch_select" >
                        <option disabled="disabled">按专业选择课程</option>
                        {rows}
                    </select>
                    <label>专业分支选择</label>
                </div>
                <p>当前选择{this.props.selection}</p>
            </div>
        );
    }
});

var AdminBranchSelectionOption = React.createClass({
    render:function(){
        return(
            <option value={this.props.faculty}>{this.props.faculty}</option>
        );
    }
});

var AdminStudentInfoTbale = React.createClass({
    render:function(){
        var rows = [];
        var ins = this;
        this.props.students.forEach((student)=>{
           rows.push(<AdminStudentInfoTbaleRow
               student={student}
               key={student}
               branches={ins.props.branches}
           />)
        });
        return(
            <table className="hoverable highlight centered">
                <thead>
                <tr>
                    <th>姓名</th>
                    <th>学生志愿</th>
                    <th>成绩</th>
                    <th>绩点</th>
                    <th>选择分流</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

var AdminStudentInfoTbaleRow = React.createClass({
    render:function(){
        var student = this.props.student;
        var rows = [];
        //this.props.branches.forEach((branch)=>{
        //    rows.push(<AdminStudentInfoTbaleRowOption branch={branch} key={branch} />);
        //});
        return(
            <tr>
                <td>{student.name}</td>
                <td>{student.branch?student.branch:"尚未选择"}</td>
                <td>{student.score}</td>
                <td>{student.point}</td>
            </tr>
        );
    }
});

var AdminStudentInfoTbaleRowOption = React.createClass({
    render:function(){
        return(
            <option value={this.props.branch}>{this.props.branch}</option>
        );
    }
});


module.exports = AdminPage;