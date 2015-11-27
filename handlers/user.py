from bson import ObjectId
from tornado.escape import json_encode, json_decode
from tornado.gen import coroutine
from tornado.web import authenticated

from handlers.base import BaseHandler


class UserInfoHandler(BaseHandler):
    @authenticated
    @coroutine
    def get(self):
        "获取当前用户信息"
        user_id = self.get_secure_cookie('user')
        user_id = user_id.decode()
        user = yield self.db.user.find_one({"_id":ObjectId(user_id)})

        if user:
            self.finish(json_encode(
                {
                    'state':'ok',
                    'result':{
                        '_id':str(user['_id']),
                        'username':user['username'],
                        'type':user['type']
                    }
                }

            ))