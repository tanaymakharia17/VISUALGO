import React, {Component} from "react";
import { Link } from 'react-router-dom';
export default class MainNavbar extends Component {

    state = {appTitle:""}
    render(){
        return(

<nav className="navbar navbar-expand-lg navbar-light" 
style={{backgroundColor: "#343a40"}}
>
<Link className="navbar-brand" to="/">
    <img src="../VisuAlgo-logo.jpg" alt="LogoImage" width="190" height="60" style={{marginLeft:"10px"}}/>
    </Link>
<h1 className="navbar-brand" style={{color: "white"}}>{this.state.appTitle}</h1>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
<span className="navbar-toggler-icon"></span>
</button>    
</nav>


                
         );
    }
};
