from tornado.escape import json_decode
from tornado.options import options
from tornado.web import RequestHandler

class BaseHandler(RequestHandler):
    def get_current_user(self):
        return self.get_secure_cookie('user').decode()


    @property
    def db(self):
        return self.settings['mongo_client'][options.mongo_name]