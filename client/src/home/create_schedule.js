import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import './css/create_schedule_form.css'

class CreateSchedule extends Component {
	constructor(props){
		super(props)
		this.state = {enableDate : false, 'schedule-type' : 'default'}

		// You have to bind the events yourself
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	componentWillMount(){

	}

	componentWillUnmount(){

	}

	onSubmit(e) {
		e.preventDefault()

		console.log(this.state)
		var schedule_name = this.state['schedule-name']
		var schedule_type = this.state['schedule-type']
		var period_from = this.state['schedule-time-from'] 
		var period_to = this.state['schedule-time-to']

		var formData = new FormData()
		formData.append('name', schedule_name)
		formData.append('type', schedule_type)
		formData.append('from', period_from)
		formData.append('to', period_to)

		axios({
			method : 'post',
			data : formData,
			url : 'http://localhost:8080/scheduler/create',
			headers : {
				'Content-Type' : 'multipart/form-data'
			}
		}).then((response) => {
			if(response.data == 'default_exists'){
				alert('There can only be one default schedule, you can only modify it or delete then recreate')
			}else if(response.data == 'success'){
				alert('The schedule has been added successfully')
			}else if(response.data == 'fail'){
				alert('Some problem occurred while inserting this schedule, please try again later')
			}
		}).catch((err) => {
			console.log(err)
		})
	}

	onChange(e) {
		this.setState({[e.target.name] : e.target.value})

		if(e.target.name == 'schedule-type'){
			if(e.target.value == 'default'){
				this.setState({enableDate : false})
				this.setState({'schedule-type' : 'default'})
			}else{
				this.setState({enableDate : true})
				this.setState({'schedule-type' : 'periodic'})
			}
		}
	}

	// Create schedule, there will be 2 types of schedule
	// 1. The default schedule - has no start time or end-time
	// 2. The periodic schedule - has start time and end time
	render = () => {
		return (
			<div id='create-schedule'>
				<form id='create-schedule-form' onSubmit={this.onSubmit}>
					<label for='schedule-name'>Schedule Name</label>
					<input class='form-control' placeholder='Schedule Name' type='text' id='schedule-name' name='schedule-name' onChange={this.onChange}/>

					<label for='schedule-type'>Schedule Type</label>
					<select id='schedule-type' class='form-control' name='schedule-type' onChange={this.onChange}>
						<option value='default' selected>Default</option>
						<option value='periodic'>Periodic</option>
					</select>

					<table id='schedule-time-table'>
						<tr>
							<td><label for='schedule-time-from'>From</label></td>
							<td class='date-input'>
								<input class ='form-control' disabled={!this.state.enableDate} type='date' id='schedule-time-from' name='schedule-time-from' onChange={this.onChange}/>
							</td>
						</tr>


						<tr>
							<td><label for='schedule-time-to'>To</label></td>
							<td class='date-input'>
								<input class='form-control' disabled={!this.state.enableDate} type='date' id='schedule-time-to' name='schedule-time-to' onChange={this.onChange}/>
							</td>
						</tr>
					</table>

					<input type='submit' value='Add Schedule' class='btn btn-primary' id='submit'/>
				</form>
			</div>
		)
	}
}

export default CreateSchedule;
