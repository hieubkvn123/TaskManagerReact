import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateSchedule from './home/create_schedule'
import ScheduleNavbar from './home/navbar'
import HoverNavbar from './home/hoverbar'
import Notification from './home/notifications'

function App() {
  return (
    <div className="App">
			<Notification/>
	  	<div class='bg'></div>
	  	<ScheduleNavbar/>
	  	<HoverNavbar/>
    	<CreateSchedule/>
	</div>
  );
}

export default App;
