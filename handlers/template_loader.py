#coding=utf-8
from __future__ import print_function, division, with_statement, absolute_import


from handlers.base import BaseHandler
from tornado.web import authenticated


class AdminPageHandler(BaseHandler):
    @authenticated
    def get(self):
        self.render('admin.html')

class StudentPageHandler(BaseHandler):
    @authenticated
    def get(self):
        self.render('student.html')

class LoginPageHandler(BaseHandler):
    "登录页面"
    def get(self):
        self.render('login.html')


class IndexHandler(BaseHandler):
    "用户首页"
    def get(self):
        user = self.get_current_user()

        if user:
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




