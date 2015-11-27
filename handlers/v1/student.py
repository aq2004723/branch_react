from bson import ObjectId
from tornado.escape import json_encode, json_decode
from tornado.gen import coroutine, Return
from tornado.web import authenticated, MissingArgumentError
from handlers.base import BaseHandler


class StudentItemHandler(BaseHandler):
    @authenticated
    @coroutine
    def post(self):
        "创建学生加分项目"
        detail = self.get_argument('detail')
        user_id = self.get_current_user()

        item = {
            'user_id': ObjectId(user_id),
            'detail': detail,
            'score': 0,
            'state': '未审核'
        }

        _id = yield self.db.item.insert(item)
        self.finish(
            json_encode(
                {
                    'state': 'ok',
                    'result': str(_id)
                }
            )
        )

    @authenticated
    @coroutine
    def delete(self):
        try:
            item_id = self.get_argument('item_id')
            item = yield self.db.item.find_one({'_id':ObjectId(item_id)})
            if not item:
                self.finish(
                    json_encode(
                        {
                            'state':'error',
                            'reason': 'id不存在'
                        }
                    )
                )
                raise Return()

            if item['state'] == '未审核':
                yield self.db.item.remove(item)
                self.finish(
                    json_encode(
                        {
                            'state':'ok'
                        }
                    )
                )
                raise Return()

            else:
                self.finish(
                    json_encode(
                        {
                            'state':'error',
                            'reason':'该项目已经被审核，无法删除'
                        }
                    )
                )
        except MissingArgumentError as e:
            self.finish(
                json_encode(
                    {
                        'state': 'error',
                        'reason': '缺少参数'
                    }
                )
            )


class StudentInfoHandler(BaseHandler):
    @authenticated
    @coroutine
    def get(self):
        "获取当前用户信息"
        user_id = self.get_current_user()
        user = yield self.db.user.find_one({"_id": ObjectId(user_id)})
        print(user,)
        if user:
            self.finish(json_encode(
                dict(
                    state='ok',
                    result={
                        '_id': str(user['_id']),
                        'username': user['username'],
                        'faculty': user['faculty'] if 'faculty' in user else '',
                        'branch': user['branch'] if 'branch' in user else '',
                        'rank': '11/70'
                    }
                )
            ))
        else:
            self.finish(
                json_encode(
                    {
                        'state': 'error',
                        'reason': '登陆失效'
                    }
                )
            )


class StudentBranchHandler(BaseHandler):
    @authenticated
    @coroutine
    def post(self):
        "用户提交新的分支信息ｓ"
        branch_name = self.get_argument('branch')
        user_id = self.current_user
        if not user_id:
            self.clear_all_cookies()
            self.finish(json_encode({
                'state':'error',
                'reason':'登陆失效'
            }))
            raise Return()

        user = yield self.db.user.find_one({"_id":ObjectId(user_id)})
        faculty = yield self.db.faculty.find_one({"faculty":user['faculty']})
        if not branch_name in faculty['branch']:
            self.finish(json_encode({
                'state':'error',
                'reason':"传送参数错误"
            }))

        user['branch'] = branch_name
        yield self.db.user.save(user)

        self.finish(json_encode({
            'state':'ok',
        }))

class BranchesHandler(BaseHandler):
    @authenticated
    @coroutine
    def get(self):
        "获得当前用户专业下的分支"
        user_id = self.current_user

        user = yield self.db.user.find_one({"_id": ObjectId(user_id)})
        if not user:
            self.finish(
                json_encode(
                    {
                        'state':'ok',
                        'error':'登陆失效，请重新登陆'
                    }
                )
            )
            self.clear_all_cookies()
            self.redirect('/login')

        faculty = user['faculty']
        branch = yield self.db.faculty.find_one({'faculty':faculty})
        self.finish(json_encode(
            {
                'state':'ok',
                'result':branch['branch']
            }
        ))



class StudentItemsHandler(BaseHandler):
    @authenticated
    @coroutine
    def get(self):
        "获取用户的加分项目"
        user_id = self.get_current_user()

        cursor = self.db.item.find({'user_id': ObjectId(user_id)})
        rs = []
        while (yield cursor.fetch_next):
            item = cursor.next_object()
            item['_id'] = str(item['_id'])
            item['user_id'] = str(item['user_id'])
            rs.append(item)
        self.finish(json_encode(
            {
                'state': 'ok',
                'result': rs
            }
        ))


