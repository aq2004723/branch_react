var React = require('react');




var InstructorPage = React.createClass({
    render:function(){
        var pageStyle = {marginTop: '140px'};
        var rowStyle = {marginTop: "40px",marginBottom: "40px"};
        return(
            <div className="container" style={pageStyle}>

                <div className="row" style={rowStyle}>
                    <h2 className="center">学生信息</h2>
                    <hr/>
                    <InstructorStudentsTable />
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
        return(
            <table className="hoverable highlight centered">
                <thead>
                <tr>
                    <th data-field="id">学号</th>
                    <th data-field="name">姓名</th>
                    <th data-field="price">成绩排名</th>
                    <th data-field="price">绩点排名</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>2131206</td>
                    <td>王大锤</td>
                    <td>70/140</td>
                    <td>60/140</td>
                </tr>
                </tbody>
            </table>
        );
    }
});

var InstructorItems = React.createClass({
    render:function(){
        return(
            <table className="hoverable highlight centered">
                <thead>
                <tr>
                    <th data-field="id">学号</th>
                    <th data-field="name">姓名</th>
                    <th data-field="price">加分项目</th>
                    <th data-field="price">加分数</th>
                    <th data-field="price">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>2131206</td>
                    <td>王大锤</td>
                    <td>长得特别帅，长得特别帅长得特别帅长得特别帅，长得特别帅，长得特别帅</td>
                    <td>
                        <div className="input-field">
                            <input id="last_name" type="text" className="validate"/>
                            <label htmlFor="last_name">加分数</label>
                        </div>
                    </td>
                    <td><a className="waves-effect waves-light btn">同意</a><a className="waves-effect waves-light btn red">不同意</a></td>
                </tr>
                </tbody>
            </table>
        );
    }
});

module.exports=InstructorPage;