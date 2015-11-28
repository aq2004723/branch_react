var React = require('react');

var InstructorPage = React.createClass({
    getInitialState:function(){
        var ins = this;
        var rs ={
            students:[],
            items:[]
        };
        $.ajax(
            '/v1/instructor/students',
            {
                async:false
            }
        ).done(function(data){
            var dataobj = $.parseJSON(data);
            if(dataobj.state==='ok'){
                rs.students = dataobj.result;
            }else{
                Materialize.toast(dataobj.reason,4000);
            }
        });
        return rs;
    },
    render:function(){
        var pageStyle = {marginTop: '140px'};
        var rowStyle = {marginTop: "40px",marginBottom: "40px"};
        return(
            <div className="container" style={pageStyle}>

                <div className="row" style={rowStyle}>
                    <h2 className="center">学生信息</h2>
                    <hr/>
                    <InstructorStudentsTable students={this.state.students}/>
                </div>
                <div className="row" style={rowStyle}>
                    <h2 className="center">审核加分项目</h2>
                    <hr/>
                    <div className="row">
                        <InstructorItems />
                    </div>
                </div>
            </div>
        );
    }
});

var InstructorStudentsTable = React.createClass({
    render:function(){
        var rows = [];
        this.props.students.forEach(function(student){
            rows.push(<InstructorStudentTableRow student={student} key={student._id}/>);
        });

        return(
            <table className="hoverable highlight centered">
                <thead>
                <tr>
                    <th>姓名</th>
                    <th>总加分项目分数</th>
                    <th>绩点</th>
                    <th>转系绩点</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }
});

var InstructorStudentTableRow = React.createClass({
    render:function(){
        var student = this.props.student;
        return(
            <tr>
                <td>{student.name}</td>
                <td>{student.score}</td>
                <td>{student.point}</td>
                <td>{student.point*0.7 + student.score*0.3}</td>
            </tr>
        );
    }
});

var InstructorItems = React.createClass({
    getItems:function(){
        var items=[];
        $.ajax(
            '/v1/instructor/items',
            {
                async:false
            }
        ).done(function(data){
            var dataobj = $.parseJSON(data);
            if(dataobj.state==='ok'){
                items = dataobj.result;
            }else{
                Materialize.toast(dataobj.reason,4000);
            }
        });

        return items;
    },
    getInitialState:function(){
        var rs = {
            items:this.getItems()
        };

        return rs;
    },
    handleConfirm: function (score,item_id) {
        //修改item 的分
        var ins = this;
        $.ajax(
            '/v1/instructor/item',
            {
                async:false,
                method:"PUT",
                data:{
                    score:score,
                    item_id:item_id
                }
            }
        ).done(function(data){
            var dataobj = $.parseJSON(data);
            if(dataobj.state==='ok'){
                Materialize.toast("修改成功",4000);
                var items = ins.getItems();
                ins.setState({items:items});
            }else{
                Materialize.toast(dataobj.reason,4000);
            }
        }).fail(function(err){
            console.log(err);
            Materialize.toast(err,4000);
        });

    },
    render:function(){
        var rows = [];
        this.state.items.forEach((item)=>{
            rows.push(<InstructorItemsRow item={item} key={item._id} handleConfirm={this.handleConfirm}/>)
        });
        return(
            <table className="hoverable highlight centered">
                <thead>
                <tr>
                    <th data-field="name">姓名</th>
                    <th data-field="price">加分项目</th>
                    <th data-field="price">加分数</th>
                    <th data-field="price">操作</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }
});

var InstructorItemsRow = React.createClass({
    handleConfirm:function(){
        var score = this.refs.score_input.value;
        var item_id = this.props.item._id;
        this.props.handleConfirm(score,item_id);
    },
    render:function(){
        var item = this.props.item;
        return(
            <tr>
                <td>{item.name}</td>
                <td>{item.detail}</td>
                <td>
                    <div className="input-field">
                        <input ref="score_input" id="last_name" type="text" className="validate"/>
                        <label htmlFor="last_name">加分数</label>
                    </div>
                </td>
                <td>
                    <button className="waves-effect waves-light btn" onClick={this.handleConfirm}>同意</button>
                    <button className="waves-effect waves-light btn red" onClick={this.handleNotConfirm}>不同意</button></td>
            </tr>
        );
    }
});

module.exports=InstructorPage;