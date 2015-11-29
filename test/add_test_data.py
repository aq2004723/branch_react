import pymongo
client = pymongo.Connection()
db = client['test2']


def add_test_data():
    user = db.user.find_one({"username": "coco"})
    print(user)


def add_student_user_info():
    coco = {
        'username': 'coco', 'password': 'coco0012', 'type': 'student', 'faculty': '计算机', 'name': '王大锤', 'score': 0,
        'point': 2.736,'items':[]
    }
    db.user.insert(coco)


def add_faculty():
    jisuanji = {'faculty': '计算机', 'branch': ['软件工程', '嵌入式开发', '人工智能']}
    db.faculty.insert(jisuanji)


def add_instructor():
    instructor1 = {
        'username': 'aq2004723', 'password': 'coco0012', 'type': 'instructor', 'faculty': '计算机', 'name': '你们辅导员'
    }
    db.user.insert(instructor1)

def add_admin():
    admin = {
        'username':'aq2004721','password':'coco0012','type':'admin'
    }
    db.user.insert(admin)


if __name__ == '__main__':
    add_test_data()
    add_student_user_info()
    add_faculty()
    add_admin()
