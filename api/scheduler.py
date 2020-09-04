from flask import Blueprint
from flask import request
from flask_cors import CORS
import pymongo

scheduler = Blueprint("scheduler", __name__, template_folder='templates')
CORS(scheduler)

### Create a mongo client ###
client = pymongo.MongoClient('mongodb://localhost:27017')
db = client['productivity']

'''
    Inside of Schedule model :
    1. Schedule name
    2. Type : (Default, Non-default)
    3. If non-default, from which time to which time 
'''
@scheduler.route('/create', methods=['POST'])
def create_schedule():
    if request.method == 'POST':
        my_docs = {}
        my_collection = db['Schedules']
    
        my_docs['name'] = request.form['name']
        my_docs['type'] = request.form['type']

        ### If this is not a default schedule ###
        if(request.form['type'] != 'default'):
            my_docs['from']  = request.form['from']
            my_docs['to'] = request.form['to']
        else: ### If this is a default schedule ### 
            ### Check if there is any default schedules ###
            count = my_collection.count_documents(filter={'type' : 'default'})
            if(count >= 1):
                print('Cannot insert another default schedule')
                return 'default_exists'
            
        result = my_collection.insert_one(my_docs)

        if(result.inserted_id):
            return 'success'
        else:
            return 'fail'

@scheduler.route('/list', methods = ['POST'])
def list():
    my_collection = db['Schedules']
    all_docs = my_collection.find({})

    print(all_docs)

    return str(all_docs)
