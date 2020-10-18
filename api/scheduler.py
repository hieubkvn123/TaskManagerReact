import pymongo
import json
import datetime
import logging

from flask import Blueprint
from flask import request
from flask_cors import CORS

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
        my_docs['activities'] = json.loads(request.form['activities'])

        ### Check if there is a name collision in existing schedules ###
        check = my_collection.count_documents(filter={'name' : my_docs['name']})
        if(check > 0):
            return 'schedule_exists'

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

@scheduler.route('/get_current_activity', methods=['POST'])
def get_current_activity():
    ### check all none-default schedules ###
    col = db['Schedules']
    today = datetime.datetime.now()

    ### find all names and types ###
    current_schedule = None
    activities = 'no_activity' 
    for entry in col.find({}):
        if(entry['type'] == 'default'):
            current_schedule = entry['name']
            activities = entry['activities']

        if(entry['type'] != 'default'):
            from_ = datetime.datetime.strptime(entry['from'], '%Y-%m-%d')
            to_ = datetime.datetime.strptime(entry['to'], '%Y-%m-%d')

            if(today > from_ and today < to_):
                current_schedule = entry['name']
                activities = entry['activities']

    ### Check what is the current time slot ###
    time_index = None
    time_str = 'None'
    if(today.hour > 9 and today.hour < 12):
        time_index = 0
        time_str = '09:00 A.M to 12:00 P.M'
    if(today.hour > 13 and today.hour < 16):
        time_index = 1
        time_str = '13:00 P.M to 16:00 P.M'
    elif(today.hour > 18 and today.hour < 21):
        time_index = 2
        time_str = '18:00 P.M to 21:00 P.M'

    ### Check what day is it in the schedule ###
    date_index = today.today().weekday()

    if(time_index is not None):
        current_activity = activities[date_index][time_index]
    else:
        current_activity = 'No Activity'

    object_ = {}
    object_['current_activity'] = current_activity 
    object_['current_schedule'] = current_schedule
    object_['time'] = time_str

    return json.dumps(object_)

