from tornado.escape import json_decode, json_encode
from tornado.gen import coroutine, Return
from tornado.web import authenticated, MissingArgumentError
from handlers.base import BaseHandler


class AdminFacultyHandler(BaseHandler):
    @authenticated
    @coroutine
    def get(self):
        "获取当前有哪些专业"
        cursor = self.db.faculty.find()

        rs = []

        while (yield cursor.fetch_next):
            faculty = cursor.next_object()

            rs.append(faculty['faculty'])

        self.finish(json_encode(
            {
                'state': 'ok',
                'resule': rs
            }
        ))


class AdminBranchesHandler(BaseHandler):
    @authenticated
    @coroutine
    def get(self):
        try:
            faculty = self.get_argument('faculty')
            faculty_obj = yield self.db.faculty.find_one({'faculty': faculty})
            if not faculty_obj:
                self.finish(json_encode(
                    {
                        'state': 'ok',
                        'result': []
                    }
                ))
                raise Return

            self.finish(json_encode(
                {
                    'state': 'ok',
                    'result': faculty_obj['branch']
                }
            ))
        except MissingArgumentError as e:
            self.finish(json_encode(
                {
                    'state': 'error',
                    'reason': '参数faculty不存在'
                }
            ))


class AdminStudentHandler(BaseHandler):
    @authenticated
    @coroutine
    def get(self):
        try:
            faculty = self.get_argument('faculty')
            cursor = self.db.user.find({'faculty': faculty, 'type': 'student'})
            students = []
            while (yield cursor.fetch_next):
                student = cursor.next_object()
                students.append(
                    {
                        'name': student['name'],
                        'branch': student['branch'] if 'branch' in student else '',
                        'score': student['score'],
                        'point': student['point']
                    }
                )
            print(students)
            self.finish(json_encode(
                {
                    'state': 'ok',
                    'result': students
                }
            ))
        except MissingArgumentError as e:
            self.finish(json_encode(
                {
                    'state': 'error',
                    'reason': '参数faculty不存在'
                }
            ))
