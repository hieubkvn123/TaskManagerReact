import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/notifications.css'
import $ from 'jquery'
import { fadeInUp, fadeOutUp} from 'react-animations'
import Radium, { StyleRoot } from 'radium'

class Notification extends Component {
	constructor(props){
		super(props)
		this.componentWillMount = this.componentWillMount.bind(this)
		this.onMouseEnter = this.onMouseEnter.bind(this)
		this.onMouseLeave = this.onMouseLeave.bind(this)
		this.state = {hidden : false}
	}

	componentWillMount(){
		this.setState({'animation' : {
				animation : 'x 2s',
				animationName : Radium.keyframes(fadeInUp, 'fadeInUp')
			}
		})

		this.setState({'timeout' : setTimeout(() => {
				// After 2 seconds, apply the fade out animation
				this.setState({'animation' : {
					animation : 'x 2s',
					animationName : Radium.keyframes(fadeOutUp, 'fadeOutUp')
				}})

				// Then make the box disappear after 2 seconds
				setTimeout(() => {
					this.setState({'hidden' : true})
				}, 2000)
			}, 3000)
		})
	}

	onMouseEnter(e) {
		clearTimeout(this.state.timeout)
	}

	onMouseLeave(e) {
		this.setState({'timeout' : setTimeout(() => {
				// After 2 seconds, apply the fade out animation
				this.setState({'animation' : {
					animation : 'x 2s',
					animationName : Radium.keyframes(fadeOutUp, 'fadeOutUp')
				}})

				// Then make the box disappear after 2 seconds
				setTimeout(() => {
					this.setState({'hidden' : true})
				}, 2000)
			}, 3000)
		})
	}

	componentWillUnmount(){
	}

	render = () => {
		return (
				<div className='notification-bar' id='home-notification-bar' 
					hidden={this.state.hidden} 
					onMouseEnter={this.onMouseEnter} 
					onMouseLeave={this.onMouseLeave}
					style={{
						bottom : '8px'
					}}
				>
					<StyleRoot>
						<div className='notification-item' style={this.state.animation} id='item-1'>
							<span>Current Activity :<br/> {this.props.text}</span>
						</div>	
					</StyleRoot>
				</div>
		)
	}
}

export default Notification
