import React, {useState, Component} from 'react'
import {Modal, Button} from 'react-bootstrap'
import ContextMenu from './context_menu'
import ReactDOM from 'react-dom'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import './css/create_schedule_form.css'

class WeeklyCalendar extends Component {
	constructor(props){
		super(props)
		console.log(props.open)
		this.state = { isOpen : false }
		this.dates = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
		this.time_slots = ['9:00 a.m - 12:00 p.m', '13:00 p.m - 16:00 p.m', '18:00 p.m - 21:00 p.m']

		this.onSubmit = this.onSubmit.bind(this)
		this.context_menu = React.createRef()
		this.modal_content = React.createRef()
	}

	componentWillMount () { 
		var activities = []

		for (var i = 0; i < this.dates.length; i++){
			activities.push([])

			for (var j = 0; j < this.time_slots.length; j++){
				activities[i].push(null)
			}
		}

		this.setState({'activities' : activities})
	}

	componentWillUnmount() {
	}

	openModal = (data) => {
		// check if schedule name is there
		if(this.props.schedule == null){
			alert('Please fill in schedule name ... ')
		}else{
			this.setState({ isOpen : true })
		}

		this.setState({'data' : data})
	}
	closeModal = () => {
		this.setState({isOpen : false})
	}

	reset = () => {
		var activities = []

		for (var i = 0; i < this.dates.length; i++){
			activities.push([])

			for (var j = 0; j < this.time_slots.length; j++){
				activities[i].push(null)
			}
		}

		this.setState({'activities' : activities})
	}

	setCurrentTimeDate = (e) => {}

	handleContextMenu = (e) => {
		e.preventDefault()
		// Get size from reference to modal content's body
		var window_w = this.modal_content.current.clientWidth
		var window_h = this.modal_content.current.clientHeight

		// Calculate the margin since now the context menu position is
		// relative to the modal dialog not the page itself. So we need the margin
		// of the modal dialog w.r.t the page
		var margin_x = Math.floor((window.innerWidth - window_w) / 2)
		var margin_y = Math.floor((window.innerHeight - window_h) / 2)

		// final coordinate
		var x = e.pageX - (margin_x)
		var y = e.pageY - margin_y

		var current_time = this.time_slots[this.state.current_time]
		var current_date = this.dates[this.state.current_date]

		var current_activity = this.state.activities[this.state.current_date][this.state.current_time]
	
		/* You can pass 'this' as a reference to other element's handler function */
		this.context_menu.current.showMenu(x,y, current_time, current_date, this, current_activity) 
	}
	
	onSubmit(e) {
		e.preventDefault()

		var schedule_name = this.state.data['schedule_name']
		var schedule_type = this.state.data['schedule_type']
		var period_from = this.state.data['period_from']
		var period_to = this.state.data['period_to']

		var formData = new FormData()
		formData.append('name', schedule_name)
		formData.append('type', schedule_type)
		formData.append('from', period_from)
		formData.append('to', period_to)
		formData.append('activities', JSON.stringify(this.state.activities))

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
			}else if(response.data == 'schedule_exists'){
				alert('The schedule name has already existed, please choose another name')
			}else if(response.data == 'success'){
				alert('The schedule has been added successfully')
			}else if(response.data == 'fail'){
				alert('Some problem occurred while inserting this schedule, please try again later')
			}
		}).catch((err) => {
			console.log(err)
		})

		this.closeModal()
	}

	render = () => {
		return (
			<Modal  show={this.state.isOpen} onHide={this.closeModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			  <ContextMenu ref={this.context_menu}/>
			  <Modal.Header className={this.props.className} closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
				  Weekly activities for {this.props.schedule}
				</Modal.Title>
			  </Modal.Header>
			  <Modal.Body className={this.props.className}>
			  	<div ref={this.modal_content}>
				<table border='1'>
					<tr>
						<th onMouseEnter={this.disableMenu}>Date</th>
						{
							this.time_slots.map((value, index) => {
								return	(<th onMouseEnter={this.disableMenu} index={index}>{value}</th>)
							})
						}
					</tr>
					{
						this.dates.map((value, date_index)=>{
							return (
								<tr>
									<th onMouseEnter={this.disableMenu}>{value}</th>
									{
										this.time_slots.map((value, time_index) => {
											return (
												<td onMouseEnter={()=>this.setState({'current_time' : time_index, 'current_date':date_index})} 
												        onContextMenu={this.handleContextMenu}> 
													{this.state.activities[date_index][time_index]}
												</td>
											)
										})
									}
								</tr>
							)
						})
					}
				</table>
				</div>
			</Modal.Body>
			  <Modal.Footer className={this.props.className}>
				<Button onClick={this.reset}>Reset</Button>
				<Button onClick={this.onSubmit}>Create Schedule</Button>
			  </Modal.Footer>
			</Modal>
		)
	}
}

class CreateSchedule extends Component {
	constructor(props){
		super(props)
		this.state = {enableDate : false, 'schedule-type' : 'default', modalIsOpen : false}
		this.weeklyCalendar = React.createRef()

		// You have to bind the events yourself
		this.onChange = this.onChange.bind(this)
	}

	componentWillMount(){

	}

	componentWillUnmount(){

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

	openModal = () => {
		var schedule_name = this.state['schedule-name']
		var schedule_type = this.state['schedule-type']
		var period_from = this.state['schedule-time-from'] 
		var period_to = this.state['schedule-time-to']

		var data = {
			'schedule_name' : schedule_name,
			'schedule_type' : schedule_type,
			'period_from' : period_from,
			'period_to' : period_to
		}

		this.weeklyCalendar.current.openModal(data)
	}

	// Create schedule, there will be 2 types of schedule
	// 1. The default schedule - has no start time or end-time
	// 2. The periodic schedule - has start time and end time
	render = () => {
		return (
			<div id='create-schedule'>
				<form id='create-schedule-form' onSubmit={this.onSubmit}>
					<label for='schedule-name'>Schedule Name</label>
					<input className='form-control' placeholder='Schedule Name' type='text' id='schedule-name' name='schedule-name' onChange={this.onChange}/>

					<label for='schedule-type'>Schedule Type</label>
					<select id='schedule-type' className='form-control' name='schedule-type' onChange={this.onChange}>
						<option value='default' selected>Default</option>
						<option value='periodic'>Periodic</option>
					</select>

					<table id='schedule-time-table'>
						<tr>
							<td><label for='schedule-time-from'>From</label></td>
							<td className='date-input'>
								<input className ='form-control' disabled={!this.state.enableDate} type='date' id='schedule-time-from' name='schedule-time-from' onChange={this.onChange}/>
							</td>
						</tr>


						<tr>
							<td><label for='schedule-time-to'>To</label></td>
							<td className='date-input'>
								<input className='form-control' disabled={!this.state.enableDate} type='date' id='schedule-time-to' name='schedule-time-to' onChange={this.onChange}/>
							</td>
						</tr>
					</table>

					<input type='button' onClick={this.openModal} value='Add Schedule' className='btn btn-primary' id='submit'/>
				</form>
				<WeeklyCalendar schedule={this.state['schedule-name']} className='weekly-calendar' ref={this.weeklyCalendar}/>
			</div>
		)
	}
}

export default CreateSchedule;
