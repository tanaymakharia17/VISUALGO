import React, { Component } from "react";
import { Link } from 'react-router-dom';
//import "./NavBar.css";
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from "./algorithms/dijkstra";
import { bfsdfs } from "./algorithms/bfs";
import './PathfindingVisualizer.css';
const START_NODE_ROW = 5;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 20;
const FINISH_NODE_COL = 50;
const ROW = 26;
const COL = 65;

export default class PathFindingVisualizer extends Component {

  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      algos: ["dijkstra", "A star", "BFS", "DFS"],
      appTitle: "PathFinding Visualizer",
      selectedAlgorithm: "dijkstra",

    };
  }
  //--------------------------


  visualizeDijkstra() {
    const grid = this.state.grid;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodesInOrder;
    switch (this.state.selectedAlgorithm) {
      case "dijkstra":
        visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        break;
      case "BFS":
        console.log("here");
        visitedNodesInOrder = bfsdfs(grid, startNode, finishNode, "bfs");
        break;
      default:
        visitedNodesInOrder = bfsdfs(grid, startNode, finishNode, "dfs");
    }
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  async animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {

      if (i === visitedNodesInOrder.length) {
        //  setTimeout(() => {
        await sleep(50);
        await this.animateShortestPath(nodesInShortestPathOrder);

        //  }, 10 * (i+10));
        return;
      }

      // setTimeout(() => {
      const node = visitedNodesInOrder[i];
      if ((node.row == START_NODE_ROW && node.col == START_NODE_COL) || (node.row == FINISH_NODE_ROW && node.col == FINISH_NODE_COL))
        continue;
      //this.setState({grid:newGrid});
      document.getElementById(`node-${node.row}-${node.col}`).className =
        'node node-visited';
      await sleep(5);
      // }, 10 * i);
    }
  }

  async animateShortestPath(nodesInShortestPathOrder) {
    const grid = this.state.grid;
    const newGrid = grid.slice();
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      //   setTimeout(() => {
      const node = nodesInShortestPathOrder[i];

      if ((node.row == START_NODE_ROW && node.col == START_NODE_COL) || (node.row == FINISH_NODE_ROW && node.col == FINISH_NODE_COL))
        continue;


      const newNode = { ...newGrid[node.row][node.col], ispathNode: true };
      newGrid[node.row][node.col] = newNode;
      if (i === nodesInShortestPathOrder.length - 1) {
        this.setState({ grid: newGrid });
      }
      document.getElementById(`node-${node.row}-${node.col}`).className =
        'node node-shortest-path';
      await sleep(25);
      //}, 50 * i);
    }
  }






  //--------------------------


  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }


  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }


  newGrid = () => {
    const grid = getInitialGrid();
    this.setState({ grid });
    for (let row = 0; row < ROW; row++) {
      for (let col = 0; col < COL; col++) {
        let varClass = 'node';
        if (row === START_NODE_ROW && col === START_NODE_COL) {
          varClass += ' node-start';
        }
        else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
          varClass += ' node-finish';
        }
        document.getElementById(`node-${row}-${col}`).className =
          varClass;
      }
    }
  }


  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light"
          style={{ backgroundColor: "#343a40" }}
        >
          <Link className="navbar-brand m-2" to="/">
                    <img src="../VisuAlgo-logo.jpg" alt="LogoImage" width="190" height="60"/>
                </Link>
          <h1 className="navbar-brand m-2" style={{ color: "white" }}>{this.state.appTitle}</h1>
          <select id="algo-Dropdown"
            className="btn btn-secondary dropdown-toggle m-2"
            onChange={this.handleChange}
          >
            {this.getAlgorithmRow()}
          </select>
          <button className="btn btn-warning m-2"
            onClick={() => this.visualizeDijkstra()}
          >Visualize</button>
          <button className="btn btn-danger m-2"
            onClick={this.newGrid}
          >Clear Board</button>
          {/*<p>{message}</p>*/}


        </nav>





        <div className="Grid" >
          {this.state.grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={this.state.mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }

  handleChange = (e) => {
    this.setState({ selectedAlgorithm: e.target.value });
  }
  getAlgorithmRow = () => {

    return this.state.algos.map((algo) => {
      return (
        <option value={algo}>{algo}</option>
      );
    });

  };


}



const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < ROW; row++) {
    const currentRow = [];
    for (let col = 0; col < COL; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};


const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};


const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const toggleVisit = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    visitedNode: !node.visitedNode
  };
  newGrid[row][col] = newNode;
  return newGrid;
} 