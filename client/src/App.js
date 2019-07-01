import React, { Component } from 'react';
import NavBar from './Components/NavBar/navBar';
import './App.css';
import axios from 'axios';
import $ from 'jquery';
import { List, ListItem } from "./Components/List";
const keyNum = "ce20d76cbeb544a88ae10aac2f037388";
const API_URL = "https://api.wmata.com/TrainPositions/TrainPositions?contentType={contentType}";
//import API from "../utils/API";

class About extends Component {

    constructor(props) {
        super(props);
    
        // for (let i = 0; i < 10; i++) {
        //     trains.push({
        //         name: chance.first(),
        //         country: chance.country({ full: true })
        //     });
        // }
    
        this.state = { 
            trains:[]
         };
    }

    //   componentDidMount() {
    //     var params = {
    //         "api_key": keyNum,
    //         // Request parameters
    //     };

    //     axios.get("https://api.wmata.com/TrainPositions/TrainPositions?contentType={contentType}&" + $.param(params),)
    //     .then((response) => {
    //         // handle success
    //         console.log("Number of trains: "+response.data.TrainPositions.length);
    //         const trainLength = response.data.TrainPositions.length;
    //         const trains = response.data.TrainPositions;
    //         console.log (trains)

    //         for(var i = 0; i<trainLength; i++){
                
    //         }

    //         this.setState = ({
    //             trains: trains
    //         })

    //     })
    //     .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //     })
    //     .finally(function () {
    //         // always executed
    //     });
    //      }

    componentDidMount() {
        this.getTrains();
    }


    getTrains(){
        var params = {
            "api_key": keyNum,
            // Request parameters
        };

        axios.get("https://api.wmata.com/TrainPositions/TrainPositions?contentType={contentType}&" + $.param(params),)
        .then((response) => {
            // handle success
            console.log("Number of trains: "+response.data.TrainPositions.length);
            console.log(response.data.TrainPositions);

            this.setState({
                trains: response.data.TrainPositions
            })

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }
    
  
  render() {
        return (
            <div>
                <NavBar />
                <div className="App">

                        <div className='filterTab'>

                        </div>

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
                                    <span className="col">{(train.SecondsAtLocation)/60}</span>

                                </div>
                                 </ListItem>
                            ))}
                            </List>
                        ) : (
                            <h3>No Results to Display</h3>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default About;