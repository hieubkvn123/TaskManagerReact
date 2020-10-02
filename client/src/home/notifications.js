import React, {Component} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/notifications.css'

class Notification extends Component {
	constructor(props){
		super(props)
		this.state = {}
		this.componentWillMount = this.componentWillMount.bind(this)
	}

	componentWillMount(){
		// check the server the current schedule and coming activities
		axios({
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
	}

	componentWillUnmount(){
	}

	render = () => {
		return (
			<div className='notification-bar'>
				<div className='notification-item'>
					<span>{this.state.current_activity}</span>
				</div>	
			</div>
		)
	}
}

export  default Notification
