# coding=utf-8
import hashlib

from tornado.escape import json_encode
from tornado.web import  MissingArgumentError, authenticated
from tornado.gen import coroutine, Return

from handlers.base import BaseHandler


class UserLoginHandler(BaseHandler):
    @coroutine
    def post(self):
        try:
            username = self.get_argument('username')
            password = self.get_argument('password')

            user_doc = yield self.db.user.find_one({'username':username,'password':password})
            # 检查用户名密码的正确性
            if not user_doc:
                self.finish(json_encode(
                    {
                        'state':'error',
                        'reason':'账号密码错误'
                    }
                ))
                raise Return()
            user = {
                '_id':str(user_doc['_id']),
                'username':user_doc['username'],
                'type':user_doc['type'],
            }
            self.set_secure_cookie('user',user['_id'],expires_days=1)
            self.finish(json_encode(
                dict(
                    state='ok',
                    result=user
                )
            ))
        except MissingArgumentError:
            self.finish(json_encode(
                dict(
                    state='error',
                    resule='缺少参数'
                )
            ))

class UserLogOutHandler(BaseHandler):
    @authenticated
    def get(self):
        self.clear_cookie('user')
        self.redirect('/')