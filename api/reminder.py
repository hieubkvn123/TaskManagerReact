import json
import logging
import pymongo
import datetime

from flask import Blueprint
from flask import request
from flask_cors import CORS

reminder = Blueprint("reminder", __name__, template_folder='templates')
CORS(reminder)

### Set logging level to ERROR ###
log = logging.getLogger("werkzeug")
log.setLevel(logging.ERROR)

### Create a mongo client ###
client = pymongo.MongoClient("mongodb://localhost:27017")
db = client['productivity']

'''
    Structure of the Reminder model :
    1. Reminder title
    2. Type : [Recurring, One time]
    3. Date of reminder (%Y-%m-%d)
    4. Time of reminder (%H:%M:%S)
    5. Status : [Completed, Pending, Snoozed]
'''

def get_datetime_difference(d1, d2):
    diff = (d1 - d2).seconds
    days = (d1 - d2).days

    if(days is None):
        days = 0

    hours = diff // 3600
    minutes = (diff - hours * 3600) // 60
    seconds = diff - hours * 3600 - minutes * 60

    return days, hours, minutes, seconds

@reminder.route('/create', methods=['POST'])
def create():
    if(request.method == 'POST'):
        my_doc = {}
        my_collection = db['Reminders']
        
        my_doc['title'] = request.form['reminder-title']
        my_doc['type'] = request.form['reminder-type']
        my_doc['date'] = request.form['reminder-date']
        my_doc['time'] = request.form['reminder-time']

        result = my_collection.insert_one(my_doc)

        if(result.inserted_id):
            return 'success'
        else:
            return 'fail'

@reminder.route('/list', methods=['POST'])
def get_current_reminder():
    if request.method == 'POST':
        my_docs = {}
        collection = db['Reminders']
        reminders = []

        all_docs = collection.find({})

        '''
            We need to check two things :
            1. How many reminders have been overdued, if there are more than one
            then prompt the user to complete it or delete it
            2. How many reminders is dued within the next one week. If there are 
            more than one, remind the user
        '''
        today = datetime.datetime.now()
        for i in all_docs:
            reminder = {}
            reminder['title'] = i['title']
            reminder_day = i['date'] + ' ' + i['time']
            reminder_day = datetime.datetime.strptime(reminder_day, "%Y-%m-%d %H:%M") 
            days, hours, minutes, seconds = get_datetime_difference(reminder_day, datetime.datetime.now())

            reminder['time_remain'] = {'days': days, 'hours':hours, 'minutes':minutes,'seconds':seconds}
            reminders.append(reminder)

        return json.dumps(reminders)
        
