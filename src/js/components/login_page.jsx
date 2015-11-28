var React = require('react');

var LoginPage = React.createClass({
    handlerUserLogin:function(){
        var username = this.refs.username.value;
        var password = this.refs.password.value;

        $.post(
            '/v1/login',
            {
                username:username,
                password:password
            },
            function(data){
                var data = $.parseJSON(data);
                if(data.state==='ok'){
                    var user = data.result;
                    window.location.href='/' + user.type;
                }else{
                    Materialize.toast(data.reason, 4000)
                }
            }
        )
    },
    render:function(){
        var imgUrl = '/static/image/q.jpg';
        var loginPageSytle = {
            height:'100vh',
            backgroundImage:'url(' + imgUrl + ')'
        };
        return(
            <div className="valign-wrapper " style={loginPageSytle}>
                <div className="valign container center" style={{width: '40%'}}>
                    <div className="container center" >
                        <h4 className="grey-text  text-lighten-5">欢迎使用专业分流系统，请登陆</h4>
                        <br/>
                        <br/>
                        <div className="input-field ">
                            <input id="username" type="text" className="validate" ref="username"/>
                            <label htmlFor="username">用户名</label>
                        </div>
                        <div className="input-field">
                            <input id="password" type="password" className="validate" ref="password"/>
                            <label htmlFor="password">密码</label>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <button className="btn waves-effect waves-light" onClick={this.handlerUserLogin}>Submit
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = LoginPage;
