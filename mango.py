from pymongo import MongoClient

client = MongoClient('mongodb+srv://cyka:blyat@hope-fjmi9.mongodb.net/test?retryWrites=true&w=majority')

hope_db = client.get_database('hopedb')

users_collection = hope_db.get_collection('users')

class user:

    def save_user(username, email, password):                                                           #Call this funtion to push login info to database
        users_collection.insert_one({'_id': username, 'email': email, 'password': password})

""" save_user('nam','aa@b.com','pass') """