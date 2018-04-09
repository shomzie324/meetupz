import React, { Component } from 'react';
import axios from 'axios';
import MeetupItem from './MeetupItem';

class Meetups extends Component{
    constructor(){
        super();
        this.state = {
            meetups: []
        }
    }

    //life cycle method
    //fires automatically when the component renders
    componentWillMount(){
        this.getMeetups();
    }
    
    //use axios (lightweight http req handler) to request data from db
    //returns a promise
    // needs to be put in a life cycle method
    getMeetups(){
        axios.get('http://localhost:3000/api/meetups')
        .then(response => {
            //response puts data into a data obj
            //must call response.data to get db records
            //set state with the state parameter & data
            this.setState({meetups: response.data}, () => {
                //console.log(this.state);
            })
        })
        .catch(err => console.log(err));
    }

    // get the state's meetup array, store in a var then
    // map each meetup to an li item
    render(){
        const meetupItems = this.state.meetups.map((meetup, i) => {
            return(
                <MeetupItem  key={meetup.id} item={meetup}/>
            )
        })
        return (
            <div>
                <h1>Meetups</h1>
                <ul className="collection">
                    {meetupItems}
                </ul>
            </div>
        )
    }

}
export default Meetups;