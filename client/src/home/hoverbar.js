import React, { Component } from 'react'
import axios from 'axios'
import './css/hoverbar.css'

class HoverNavbar extends Component {
	constructor(props){
		super(props)
		this.state = {'schedules' : []}
		this.componentWillMount = this.componentWillMount.bind(this)
		this.timer = this.timer.bind(this)
		this.interval = null
	}

	componentWillMount() {
		clearInterval(this.interval)
	}

	componentWillMount() {
		this.timer()
		this.interval = setInterval(this.timer, 1000)
	}

	timer() {	
		var formData = new FormData()

		axios({
			method : 'post',
			data : formData,
			url : 'http://localhost:8080/scheduler/list',
			headers : {
				'Content-Type' : 'multipart/form-data'
			}
		})
		.then(response => response.data)
		.then((response) => {
			var schedules = new Array()
			for(var i = 0; i < response.length; i++){
				schedules.push(response[i].name)
			}
			this.setState({ 'schedules' : schedules })
		}).catch((err) => {
			console.log(err)
		})
	}

	render = () => {
		return (
			<div id="mySidenav" class="sidenav">
				{this.state.schedules.length >= 1 && <a href="/" id="top-schedule-1">{this.state.schedules[0]}</a>}
				{this.state.schedules.length >= 2 && <a href="/" id="top-schedule-2">{this.state.schedules[1]}</a>}
				{this.state.schedules.length >= 3 && <a href="/" id="top-schedule-3">{this.state.schedules[2]}</a>}
				{this.state.schedules.length >= 4 && <a href="/" id="top-schedule-4">{this.state.schedules[3]}</a>}
			</div>
		)
	}
}

export default HoverNavbar;
