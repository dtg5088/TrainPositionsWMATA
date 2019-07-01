import React, { Component } from 'react';
import NavBar from './Components/NavBar/navBar';
import './App.css';
import axios from 'axios';
import $ from 'jquery'; //using for params
import { List, ListItem } from "./Components/List";
const keyNum = "ce20d76cbeb544a88ae10aac2f037388";


class About extends Component {

    state = { 
        trains:[]
     };

    componentDidMount() {
        this.getTrains();
    }

    async getTrains(){
        try {
            //using setInterval to update page every 7 to 10 seconds
            setInterval(async () => {
                var params = {
                    "api_key": keyNum,
                };

                const response = await axios.get("https://api.wmata.com/TrainPositions/TrainPositions?contentType={contentType}&" + $.param(params),)
                // handle success
                //setting state to response objects
                console.log(response.data.TrainPositions)
                this.setState({ trains: response.data.TrainPositions })
            }, 7000)
        }
        catch(error) {
            // handle error
            console.log(error);
        }
    }

  render() {
        return (
            <div>
                <NavBar />
                <div className="App">

                        <div className='headerSec row'>
                            <span className="col">Train #</span>
                            <span className="col">Train ID</span>
                            <span className="col">Car Count</span>
                            <span className="col">Line</span>
                            <span className="col">Destination</span>
                            <span className="col">Service</span>
                            <span className="col">Time Spent</span>

                        </div>

                    <div className = "pageBody">

                        {this.state.trains.length ? (
                            <List>
                            {this.state.trains.map(train => (
                                <ListItem key={train._id}>
                                <div className='row'>

                                    <span className="col">{train.TrainNumber}</span>
                                    <span className="col">{train.TrainId}</span>
                                    <span className="col">{train.CarCount}</span>
                                    <span className="col">{train.LineCode}</span>
                                    <span className="col">{train.DestinationStationCode}</span>
                                    <span className="col">{train.ServiceType}</span>
                                    <span className="col">{train.SecondsAtLocation}</span>

                                </div>
                                 </ListItem>
                            ))}
                            </List>
                        ) : (
                            <h3>No Results to Display</h3>
                        )}

                        <div className='metroImg'>
                            <img className='metroImgmap' src="https://wwwassets.rand.org/content/rand/about/locations/washington/metro/jcr:content/par/imagewithclass.aspectfit.0x0.png/x1485558831053.png.pagespeed.ic.6jWHmXTuti.png"></img>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;