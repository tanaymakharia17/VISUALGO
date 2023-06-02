import React, { Component } from 'react';
import SimpleSelect from "./simpleSelect";
import { Link } from "react-router-dom";

class Navbar extends Component {

    render() {
        return (

            <nav className="navbar navbar-expand-lg navbar-light"
                style={{ backgroundColor: "#343a40" }}
            >
                <Link className="navbar-brand" to="/">
                    <img src="../logo192.png" alt="LogoImage" width="55" height="50" />
                </Link>
                <h1 className="navbar-brand" style={{ color: "white" }}>{this.state.appTitle}</h1>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>


            </nav>




        );
    }
}

export default Navbar;