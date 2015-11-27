from handlers.auth import UserLoginHandler, UserLogOutHandler
from handlers.template_loader import AdminPageHandler, LoginPageHandler, IndexHandler, StudentPageHandler
from handlers.user import UserInfoHandler
from handlers.v1.student import StudentInfoHandler, StudentItemHandler, StudentItemsHandler

handlers = (
    (r'/',IndexHandler),
    (r'/admin',AdminPageHandler),
    (r'/login',LoginPageHandler),
    (r'/student',StudentPageHandler),
    (r'/logout',UserLogOutHandler),

    (r'/v1/login',UserLoginHandler),
    (r'/v1/user',UserInfoHandler),

    (r'/v1/student/info',StudentInfoHandler),
    (r'/v1/student/item',StudentItemHandler),
    (r'/v1/student/items',StudentItemsHandler),

)
