from handlers.auth import UserLoginHandler, UserLogOutHandler
from handlers.template_loader import AdminPageHandler, LoginPageHandler, IndexHandler, StudentPageHandler, \
    InstructorPageHandler
from handlers.user import UserInfoHandler
from handlers.v1.admin import AdminFacultyHandler, AdminBranchesHandler, AdminStudentHandler
from handlers.v1.instructor import InstructorStudentsHandler, InstructorItemsHandler, InstructorItemHandler
from handlers.v1.student import StudentInfoHandler, StudentItemHandler, StudentItemsHandler, BranchesHandler, \
    StudentBranchHandler

handlers = (
    (r'/', IndexHandler),
    (r'/admin', AdminPageHandler),
    (r'/login', LoginPageHandler),
    (r'/student', StudentPageHandler),
    (r'/logout', UserLogOutHandler),
    (r'/instructor', InstructorPageHandler),

    (r'/v1/login', UserLoginHandler),
    (r'/v1/user', UserInfoHandler),

    (r'/v1/student/info', StudentInfoHandler),
    (r'/v1/student/item', StudentItemHandler),
    (r'/v1/student/items', StudentItemsHandler),
    (r'/v1/student/branches', BranchesHandler),
    (r'/v1/student/branch', StudentBranchHandler),

    (r'/v1/instructor/students', InstructorStudentsHandler),
    (r'/v1/instructor/items', InstructorItemsHandler),
    (r'/v1/instructor/item', InstructorItemHandler),

    (r'/v1/admin/faculties', AdminFacultyHandler),
    (r'/v1/admin/branches', AdminBranchesHandler),
    (r'/v1/admin/students', AdminStudentHandler),

)
