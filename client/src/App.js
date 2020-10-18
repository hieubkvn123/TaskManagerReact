import React, {Component} from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import CreateSchedule from './home/create_schedule'
import ScheduleNavbar from './home/navbar'
import HoverNavbar from './home/hoverbar'
import Notification from './home/notifications'


class App extends Component {
	constructor(props){
		super(props)
	
		this.state = {}
		axios ({
			method : 'post',
			url : 'http://localhost:8080/scheduler/get_current_activity',
			headers : {
				'Content-Type' : 'multipart/form-data'
			}
		}).then(response => {
			this.setState({current_activity : response.data})
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
		}).catch(err => {
			console.log(err)
		})
	}

  render(){
		return (
			<div className="App">
				<Notification text={this.state.reminders}/>
				<div class='bg'></div>
				<ScheduleNavbar/>
				<HoverNavbar/>
				<CreateSchedule/>
		</div>
		);
	}
}

export default App;
