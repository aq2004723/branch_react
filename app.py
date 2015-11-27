# coding=utf-8

from __future__ import print_function, absolute_import, with_statement, division
import motor
from tornado.ioloop import IOLoop
from tornado.web import Application, os
from tornado.options import parse_command_line, define, options
from tornado_mysql import pools
from tornado_mysql.cursors import DictCursor

from routes import handlers

define("port", default=8888, help="本地监听端口", type=int)
define("mysql_host", default="127.0.0.1", help="数据库地址", type=str)
define("mysql_port", default=3306, help="数据库端口", type=int)
define("mysql_user", default="root", help="数据库用户名", type=str)
define("mysql_pass", default="coco0012", help="密码", type=str)
define("mysql_dbname", default="branch", help="数据库名", type=str)

define("mongo_host", default="127.0.0.1", help="数据库地址", type=str)
define("mongo_port", default=27017, help="数据库port", type=int)
define("mongo_name", default="test2", help="数据库名字", type=str)

application = Application(
    handlers=handlers,
    static_path=os.path.join(os.path.dirname(__file__), 'dist'),
    template_path=os.path.join(os.path.dirname(__file__), 'template'),
    login_url='/login',
    cookie_secret='asdasdqddsqekldaskldaskldasklakjfkjbfbn',
    debug=True,
    mongo_client=motor.MotorClient(options.mongo_host, options.mongo_port),
    # database=pools.Pool(
    #     dict(host=options.mysql_host, port=options.mysql_port, user=options.mysql_user,
    #          passwd=options.mysql_pass, db=options.mysql_dbname, cursorclass=DictCursor, charset='utf8'
    #          ),
    #     max_idle_connections=1,
    #     max_recycle_sec=3,
    #     max_open_connections=2,
    # ),
)

if __name__ == "__main__":
    parse_command_line()
    application.listen(options.port)
    IOLoop.current().start()
