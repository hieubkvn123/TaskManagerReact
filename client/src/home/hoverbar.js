import React, { Component } from 'react'
import './css/hoverbar.css'

class HoverNavbar extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}

	componentWillMount() {
		const headers = {
			method : 'post',
			mode : 'cors',
			cache : 'no-cache',
			credentials : 'same-origin',
			headers : {
				'Content-Type' : 'application/json'
			}
		}

		fetch('http://localhost:8080/scheduler/list', headers)
			.then(data => {
				console.log(data)
			})
	}

	componentWillUnmount() {

	}

	render = () => {
		return (
			<div id="mySidenav" class="sidenav">
				<a href="#" id="about">About</a>
				<a href="#" id="blog">Blog</a>
				<a href="#" id="projects">Projects</a>
				<a href="#" id="contact">Contact</a>
			</div>
		)
	}
}

export default HoverNavbar;
