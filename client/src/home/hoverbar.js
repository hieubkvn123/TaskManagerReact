import React, { Component } from 'react'
import axios from 'axios'
import './css/hoverbar.css'

class ScheduleButton extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}

	onClick(e){
		e.preventDefault()

		if(e.target.className == 'fa fa-close'){
			var confirmed = window.confirm('Do you really want to delete schedule ' + e.target.id + '? ')

			if(confirmed){
				// Send a request to server to delete it
				var schedule_name = e.target.id

				var formData = new FormData()
				formData.append("schedule_name", schedule_name)

				axios({
					method : 'post',
					data : formData,
					url : 'http://localhost:8080/scheduler/delete',
					headers : {
						'Content-Type':'multipart/form-data'
					}
				})
				.then(response => response.data)
				.then(response => {
					alert(response)
				})
			}
		}else{
			// Basically show a modal dialog to let people modify schedule details
			// then forward to server when submitting the form enclosed in the dialog
			alert('Edit button clicked')
		}
	}

	render = () => { 
		return (
			<a href={this.props.href} id={this.props.id} name={this.props.text}>
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
				<button class='btn edit-button'><i id={this.props.text} class="fa fa-edit" onClick={this.onClick}></i></button>
				<button class='btn del-button'><i id={this.props.text} class="fa fa-close" onClick={this.onClick}></i></button>
				{this.props.text}
			</a>
		)
	}
}

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
				{this.state.schedules.length >= 1 && <ScheduleButton href='#' id='top-schedule-1' text={this.state.schedules[0]}/>}
				{this.state.schedules.length >= 2 && <ScheduleButton href='#' id='top-schedule-2' text={this.state.schedules[1]}/>}
				{this.state.schedules.length >= 3 && <ScheduleButton href='#' id='top-schedule-3' text={this.state.schedules[2]}/>}
				{this.state.schedules.length >= 4 && <ScheduleButton href='#' id='top-schedule-4' text={this.state.schedules[3]}/>}
			</div>
		)
	}
}

export default HoverNavbar;
