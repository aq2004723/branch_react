var React = require('react');

var NavBar = React.createClass({
    getDefaultProps:function(){
        var rs={
            user:{}
        };
        $.ajax('/v1/user',{
            async:false,
            cache:false
        }).done(function(data){
            var dataobj = $.parseJSON(data);
            if(dataobj.state==='ok'){
                rs.user = dataobj.result;
            }else{
                Materialize.toast(dataobj.reason,4000);
            }
        }).fail(function(err){
            Materialize.toast("出错了！",4000);
        });
        return rs;
    },
    render:function(){
        return(
            <nav>
                <div className="nav-wrapper blue accent-1">
                    <div className="container">
                        <a href="#" className="brand-logo">Logo</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="#">欢迎{this.props.user.type}:{this.props.user.username}</a></li>
                            <li><a href="/logout">注销登陆</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

module.exports = NavBar;