import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { 
	Nav,
	Form,
	FormControl,
	Button
} from 'react-bootstrap'

class ScheduleNavbar extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}

	componentWillMount() {

	}

	componentWillUnmount() {

	}

	render = () => {
		return (
			<div id='schedule-navbar'>
			  <Navbar bg="dark" variant="dark">
				<Navbar.Brand href="#home"></Navbar.Brand>
				<Nav className="mr-auto">
				  <Nav.Link href="#home">Home</Nav.Link>
				  <Nav.Link href="#features">Reminder</Nav.Link>
				  <Nav.Link href="#pricing">Pricing</Nav.Link>
				</Nav>
				<Form inline>
				  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
				  <Button variant="outline-info">Search</Button>
				</Form>
			  </Navbar>
			</div>
		)
	}
}

export default ScheduleNavbar;
