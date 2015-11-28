#coding=utf-8
from __future__ import print_function, division, with_statement, absolute_import

from bson import ObjectId
from tornado.gen import coroutine

from handlers.base import BaseHandler
from tornado.web import authenticated


class AdminPageHandler(BaseHandler):
    @authenticated
    @coroutine
    def get(self):
        user_id = self.current_user
        user = yield self.db.user.find_one({"_id":ObjectId(user_id)})
        if user['type']!= 'admin':
            self.redirect('/')
        self.render('admin.html')

class StudentPageHandler(BaseHandler):
    @authenticated
    @coroutine
    def get(self):
        # user_id = self.current_user
        # user = yield self.db.user.find_one({"_id":ObjectId(user_id)})
        # if user['type']!= 'student':
        #     self.redirect('/')
        self.render('student.html')

class LoginPageHandler(BaseHandler):
    "登录页面"
    def get(self):
        self.render('login.html')

class InstructorPageHandler(BaseHandler):
    @authenticated
    @coroutine
    def get(self):
        user_id = self.current_user
        user = yield self.db.user.find_one({"_id":ObjectId(user_id)})
        if user['type']!= 'instructor':
            self.redirect('/')
        self.render('instructor.html')


class IndexHandler(BaseHandler):
    "用户首页"
    @coroutine
    def get(self):
        user_id = self.get_current_user()


        if user_id:
            user = yield self.db.user.find_one({"_id":ObjectId(user_id)})
            if not user:
                self.clear_all_cookies()
                self.redirect('/login')
            if user['type'] == 'student':
                self.redirect('/student')
            elif user['type'] == 'admin':
                self.redirect('/admin')
            elif user['type'] == 'instructor':
                self.redirect('/instructor')
            else:
                self.clear_all_cookies()
                self.redirect('/login')

        else:
            self.redirect('/login')




