import pymongo


def add_test_data():
    client = pymongo.Connection()
    db = client['test2']
    user = db.user.find_one({"username":"coco"})
    print(user)

def add_student_user_info():
    coco = {'username':'coco','password':'coco0012','type':'student','faculty':'计算机'}

if __name__ == '__main__':
    add_test_data()