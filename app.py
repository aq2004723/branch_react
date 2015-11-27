import motor
from tornado.ioloop import IOLoop
from tornado.web import Application, os
from tornado.options import parse_command_line, define, options

from routes import handlers

define("port", default=8888, help="本地监听端口", type=int)
define("mongo_host", default="127.0.0.1", help="数据库地址", type=str)
define("mongo_port", default=27017, help="数据库port", type=int)
define("mongo_name", default="test", help="数据库名字", type=str)

application = Application(
    handlers=handlers,
    static_path=os.path.join(os.path.dirname(__file__),'dist'),
    template_path=os.path.join(os.path.dirname(__file__),'template'),
    login_url='/login',
    cookie_secret='asdasdqddsqekldaskldaskldasklakjfkjbfbn',
    debug=True,
    mongo_client=motor.MotorClient(options.mongo_host, options.mongo_port),
)

if __name__ == "__main__":
    parse_command_line()
    application.listen(options.port)
    IOLoop.current().start()
