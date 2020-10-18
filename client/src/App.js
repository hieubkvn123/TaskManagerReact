import React, {Component} from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import CreateSchedule from './home/create_schedule'
import ScheduleNavbar from './home/navbar'
import HoverNavbar from './home/hoverbar'
import Notification from './home/notifications'

import CreateReminder from './reminder/create_reminder'

/* Dependencies for routing ... */
import {
	BrowserRouter as Router,
	Switch,
	Route, 
	Redirect
} from 'react-router-dom'

/* To remember location history */
import { LastLocationProvider } from 'react-router-last-location'

class App extends Component {
	constructor(props){
		super(props)
	
		this.componentWillMount = this.componentWillMount.bind(this)
		this.state = {reminders:[], current_activity: ""}
	}

	componentWillMount(){
		axios ({
			method : 'post',
			url : 'http://localhost:8080/scheduler/get_current_activity',
			headers : {
				'Content-Type' : 'multipart/form-data'
			}
		}).then(response => {
			var obj = response.data
			var current_activity = obj['current_activity']
			var current_schedule = obj['current_schedule']
			var time = obj['time']
			var message = `${current_activity}\nTime : ${time}\nFrom schedule : ${current_schedule}`

			this.setState({current_activity : message})
		}).catch(err => {
			console.log(err)
		})

		axios ({
			method : 'post',
			url : 'http://localhost:8080/reminder/list',
			headers : {
				'Content-Type' : 'multipart/form-data'
			}
		}).then(response => {
			this.setState({reminders : response.data})
			console.log(response.data)
		}).catch(err => {
			console.log(err)
		})
	}

  render(){
		return (
			<div className="App">
				{/* Render reminder notification */}
				{
					this.state['reminders'].map((value, index)=> {
						var message = `Upcomming reminder : ${value['title']}\n`
						var time = value['time_remain']
						var time_str = `${time['days']}D - ${time['hours']}H - ${time['minutes']}M`
						message += `Time remaining : ${time_str}`
						return (
							<Notification text={message} bottom={index*12} type='reminder'/>
						)
					})
				}

				<Notification text={this.state.current_activity} bottom={this.state.reminders.length*12} type='activity'/>
				<div class='bg'></div>
				<ScheduleNavbar/>
				<HoverNavbar/>
				<Router>
					{/* Add a location history provider */}
					<LastLocationProvider>
						<Switch>
							<Route path='/home'>
								<CreateSchedule/>
							</Route>

							<Route path='/reminder'>
								<CreateReminder/>
							</Route>

							{/* Always put default path as exact */}
							<Route exact path='/' render={()=>{
								{/* Redirect to /home when endpoint is empty */}
								return (<Redirect to='/home'/>)
							}}/>
						</Switch>
					</LastLocationProvider>
				</Router>
		</div>
		);
	}
}

export default App;
