import React from "react";
import MainNavBar from "./MainNavBar";
import MainContent from "./MainContent";

export default class Main extends React.Component{
    render(){
        return(
            <React.Fragment>
                <MainNavBar/>
                <MainContent/>
            </React.Fragment>
        );
    }
}
