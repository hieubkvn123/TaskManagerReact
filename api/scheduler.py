from flask import Blueprint
from flask import request
from flask_cors import CORS
import pymongo
import json
import logging

scheduler = Blueprint("scheduler", __name__, template_folder='templates')
CORS(scheduler)

### Set logging level to ERROR ###
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

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
    schedules = []
    all_docs = my_collection.find({})

    for i in all_docs:
        schedule = {}

        schedule['name'] = i['name']
        schedule['type'] = i['type']

        if(schedule['type'] != 'default'):
            schedule['from'] = i['from']
            schedule['to'] = i['to']

        schedules.append(schedule)

    return json.dumps(schedules)

@scheduler.route("/delete", methods = ['POST'])
def delete():
    col = db['Schedules']
    result = col.delete_one({'name' : request.form['schedule_name']})

    if(result.deleted_count > 0):
        return 'success'
    else: 
        return 'failed'

