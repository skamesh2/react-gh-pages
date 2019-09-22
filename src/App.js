import React, {Component} from 'react';
import { render } from "react-dom";
import HI_logo from './HI_logo.png';
import FB from './facebook.413893b7.svg';
import IG from './instagram.8b73ec2e.svg';
import TWITTER from './twitter.29663de0.svg';
import GIT from './github.c1193649.svg';
import './App.css';


function App() {
  return (
    /*<div className="App">*/
    <header className="App-header">
      <br />
      <img src={HI_logo} className="App-HI-logo" alt="logo"/>
      <br />
      <a href="https://www.facebook.com/hackillinois">
      <img src={FB} className="App-logo" alt="facebook" /></a>
      <a href="https://www.instagram.com/hackillinois">
      <img src={IG} className="App-logo" alt="instagram" /></a>
      <a href="https://twitter.com/hackillinois"><img src={TWITTER} className="App-logo" alt="twitter" /></a>
      <a href="https://www.github.com/hackillinois"><img src={GIT} className="App-logo" alt="github" /></a>
      <br />
      <br />
      <GetEvents/>
    </header>
    /*</div>*/
  );
}

class GetEvents extends Component {
    constructor(props) {
      super(props);
      this.state = {
        my_events: [],
      };
    }
//Multiply time by 1000
    componentDidMount() {
      fetch('https://api.hackillinois.org/event/',{
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => response.json())
      .then(data => {
          //console.log(data.events);
          this.setState({my_events: data.events});
            //()=>{console.log("Component state: ",this.state);})
      });
    }
//<p key={idx}> {event.name} </p>
     /*return(
        <div>
        {my_events.map((event, idx) => {
          return (
            <input type="button" class="Events" value={event.name} />
          )
        }}
        </div>*/

    render() {
      const { my_events } = this.state;
      console.log("Render State: ", my_events);
      return(
        <div>
        {my_events.map((event, idx) => {
          var locations = event.locations[0]
          console.log("Locations: ",locations.description);
          var st_timestamp = new Date(event.startTime*1000).toLocaleString();
          var end_timestamp = new Date(event.endTime*1000).toLocaleString();
          var length = end_timestamp.length;
          var end_time = end_timestamp.substr(10,(length-9));
          var e_string = st_timestamp + " - " + end_time;
          var maps_link = locations.latitude + "," + locations.longitude;
          return (
            <div className="container">
            <span class="app">
            {event.name}
            <br />
            {e_string}
            <br />
            <a href={'http://www.google.com/maps/place/'+ maps_link}>
            {locations.description}
            </a>
            <br />
            </span>
            </div>
          )
        })}
        </div>
      )
    }
}

// var my_events = new GetEvents();
// my_events.componentDidMount();
//render(<GetEvents />, document.getElementById('root'));
export default App;
