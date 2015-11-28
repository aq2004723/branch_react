from tornado.escape import json_decode, json_encode
from tornado.gen import coroutine
from tornado.web import authenticated

from handlers.base import BaseHandler


class AdminBranchHandler(BaseHandler):
    @authenticated
    @coroutine
    def get(self):
        "获取当前有哪些专业"
        cursor = self.db.faculty.find()

        rs =[]

        while(yield cursor.fetch_next):
            faculty = cursor.next_object()

            rs.append(faculty['faculty'])

        self.finish(json_encode(
            {
                'state':'ok',
                'resule':rs
            }
        ))
