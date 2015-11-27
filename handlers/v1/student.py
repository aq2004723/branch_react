from bson import ObjectId
from tornado.escape import json_encode, json_decode
from tornado.gen import coroutine
from tornado.web import authenticated

from handlers.base import BaseHandler


class StudentItemHandler(BaseHandler):
    @authenticated
    @coroutine
    def post(self):
        "创建学生加分项目"
        detail = self.get_argument('detail')
        user_id = self.get_current_user()

        item = {
            'user_id':ObjectId(user_id),
            'detail':detail,
            'score':0,
            'state':'not passed'
        }

        _id = yield self.db.item.insert(item)
        self.finish(
            json_encode(
                {
                    'state':'ok',
                    'result':str(_id)
                }
            )
        )

    @authenticated
    def put(self,item_id):
        "修改加分项目"

    @authenticated
    def delete(self):
        "删除加分项目"


class StudentInfoHandler(BaseHandler):
    @authenticated
    @coroutine
    def get(self):
        "获取当前用户信息"
        user_id = self.get_current_user()
        user = yield self.db.user.find_one({"_id":ObjectId(user_id)})
        if user:
            self.finish(json_encode(
                dict(
                    state='ok',
                    result={
                        '_id':str(user['_id']),
                        'username':user['username'],
                        'faculty':getattr(user,'faculty',''),
                        'branch':getattr(user,'branch',''),
                        'rank':'11/70'
                    }
                )
            ))
        else:
            self.finish(
                json_encode(
                    {
                        'state':'error',
                        'reason':'登陆失效'
                    }
                )
            )

class StudentBranchHandler(BaseHandler):
    @authenticated
    def post(self):
        "用户提交新的分支信息ｓ"
        branch_name = self.get_argument('branch')


class BranchsHandler(BaseHandler):
    @authenticated
    @coroutine
    def get(self):
        "获得当前用户专业下的分支"
        user_id = self.current_user

        user = yield self.db.user.find_one({"_id":ObjectId(user_id)})



class StudentItemsHandler(BaseHandler):
    @authenticated
    @coroutine
    def get(self):
        "获取用户的加分项目"
        user_id = self.get_current_user()

        cursor = self.db.item.find({'user_id':ObjectId(user_id)})
        rs = []
        while (yield cursor.fetch_next):
            item = cursor.next_object()
            item['_id'] = str(item['_id'])
            item['user_id'] = str(item['user_id'])
            rs.append(item)
        self.finish(json_encode(
            {
                'state':'ok',
                'result':rs
            }
        ))


