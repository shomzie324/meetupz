import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class MeetupItem extends Component{
    //when passing properties to a component add it in the constructor
    constructor(props){
        super(props);
        this.state = {
            item:props.item
        }
    }

    //Link uses template string (es6)
    render(){
        return (
        <li className="collection-item">
            <Link to={`/meetups/${this.state.item.id}`}>{this.state.item.name}</Link>
        </li>
    )
    }

}
export default MeetupItem;