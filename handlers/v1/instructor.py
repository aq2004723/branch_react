from bson import ObjectId
from tornado.escape import json_encode
from tornado.gen import coroutine, Return
from tornado.web import authenticated, MissingArgumentError
from handlers.base import BaseHandler


class InstructorStudentsHandler(BaseHandler):
    @authenticated
    @coroutine
    def get(self):
        user_id = self.current_user

        user = yield self.db.user.find_one({"_id":ObjectId(user_id)})

        if not user:
            self.finish(json_encode({
                'state':'error',
                'reason':'出现问题'
            }))
            raise Return

        cursor = self.db.user.find({'faculty':user['faculty'],'type':'student'})
        students = []
        while (yield cursor.fetch_next):
            student = cursor.next_object()
            students.append(
                {
                    '_id':str(student['_id']),
                    'name':student['name'],
                    'score':student['score'],
                    'point':student['point']
                }
            )



        self.finish(json_encode({
            'state':'ok',
            'result':students
        }))

class InstructorItemsHandler(BaseHandler):
    @authenticated
    @coroutine
    def get(self):
        user_id = self.current_user

        user = yield self.db.user.find_one({"_id":ObjectId(user_id)})

        if not user:
            self.finish(json_encode({
                'state':'error',
                'reason':'出现问题'
            }))
            raise Return
        cursor = self.db.user.find({'faculty':user['faculty'],'type':'student'})
        students = []
        while (yield cursor.fetch_next):
            student = cursor.next_object()
            students.append(student['_id'])

        cursor = self.db.item.find({'user_id':{'$in':students},'state':'未审核'})
        items = []

        while (yield cursor.fetch_next):
            item = cursor.next_object()
            user = yield self.db.user.find_one({'_id':item['user_id']})
            items.append(
                {
                    '_id':str(item['_id']),
                    'detail':item['detail'],
                    'name':user['name']
                }
            )

        self.finish(json_encode({
            'state':'ok',
            'result':items
        }))

class InstructorItemHandler(BaseHandler):
    @authenticated
    @coroutine
    def put(self):
        try:
            item_id = self.get_argument('item_id')
            score = self.get_argument('score')
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
                item['score'] = int(score)
                item['state'] = '已经审核'
                yield self.db.item.save(item)
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
                            'reason':'该项目已经被审核'
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
