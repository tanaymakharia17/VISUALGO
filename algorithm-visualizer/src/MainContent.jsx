import React from "react";
import { Link } from 'react-router-dom';
import "./MainContent.css";
export default class MainContent extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div>
<div style={{marginTop:"5%", display: "flex", marginLeft:"15%"}} >

<div className="card p-2 m-5" style={{width: "22rem", border:"3px solid #dc3545"}}>

<img src="../path_img.jpg" class="card-img-top" alt="..."/>

    <div className="card-body">
    <h5 className="card-title">PathFinding-Algorithm Visualizer</h5>
    <p className="card-text">A go to store for all your college needs and to sell unused items
    </p>
    <Link to="/PathFindingVisualizer">
    <div className="btn btn-outline-primary">Visualize</div>
    </Link>
    </div>
</div>

<div className="card p-2 m-5 mx-auto" style={{width: "22rem", border:"3px solid #dc3545"}}>
    <img src="../sort_img.jpg" class="card-img-top" style={{marginTop:"10%", marginBottom:"14%"}} alt="..."/>
    <div className="card-body">
        <h5 className="card-title">Sorting Algorithm Visualizer</h5>
        <p className="card-text" style={{marginBottom:"11%"}} >Find your ride along companion for your City rides with ease
        </p>
        <Link to="/SortingVisulizer">
            <div className="btn btn-outline-warning" >Visualize</div>
        </Link>
    </div>
</div>
</div>
          </div>      

            </React.Fragment>
        );
    }
}
