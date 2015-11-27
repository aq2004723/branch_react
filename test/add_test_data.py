import pymongo

client = pymongo.Connection()
db = client['test2']

def add_test_data():

    user = db.user.find_one({"username":"coco"})
    print(user)

def add_student_user_info():
    coco = {'username':'coco','password':'coco0012','type':'student','faculty':'计算机'}
    db.user.insert(coco)

def add_faculty():
    jisuanji = {'faculty':'计算机','branch':['软件工程','嵌入式开发','人工智能']}
    db.faculty.insert(jisuanji)

if __name__ == '__main__':
    add_faculty()