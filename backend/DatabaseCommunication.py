from pymongo import MongoClient


class DatabaseCommunication:

    def __init__(self):
        self.mongo = MongoClient(
            "mongodb://Dawid:Dawid@dawbal-shard-00-00-4vrjk.mongodb.net:27017,"
            "dawbal-shard-00-01-4vrjk.mongodb.net:27017,"
            "dawbal-shard-00-02-4vrjk.mongodb.net:27017/test?ssl=true&replicaSet=DawBal-shard-0&authSource=admin"
            "&retryWrites=true")

    def add_to_collection(self, collection_name, data):
        collection = self.mongo.db[collection_name]
        inserted = collection.insert_one(data)
        print(inserted.inserted_id)

    def get_all_from_collection(self, collection_name):
        collection = self.mongo.db[collection_name]
        return collection.find()

    def get_collection(self, collection_name):
        collection = self.mongo.db[collection_name]
        return collection
