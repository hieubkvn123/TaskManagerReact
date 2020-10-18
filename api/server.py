from flask import Flask
from flask_cors import CORS
# from history import history 
from scheduler import scheduler
from reminder import reminder

PORT = 8080
app = Flask(__name__)

'''
    1. Create and manage schedules
    2. Among schedules there will be default and side schedules
    3. In each schedule, there will be activities and timeslots
    4. Each schedule activity is assigned a priority
'''
#app.register_blueprint(History)
app.register_blueprint(scheduler, url_prefix='/scheduler')
app.register_blueprint(reminder, url_prefix='/reminder')
CORS(app)

@app.route('/')
def home():
    return "<h1>Hello World</h1>"

if __name__ == '__main__':
    app.run(port=PORT, host='0.0.0.0', debug=True)
