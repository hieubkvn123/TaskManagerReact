import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateSchedule from './home/create_schedule'
import ScheduleNavbar from './home/navbar'
import HoverNavbar from './home/hoverbar'

function App() {
  return (
    <div className="App">
	  	<div class='bg'></div>
	  	<ScheduleNavbar/>
	  	<HoverNavbar/>
    	<CreateSchedule/>
	</div>
  );
}

export default App;
