let jsgraphs = require('js-graph-algorithms');

// to include the json data, we "require" it
let data = require('./data.json');

let dataConnections = data.routers[1].connections;
let datac = data.routers;

// investigate the data.
console.log("Here is your data:");
console.log(datac);
console.log(dataConnections);

// Try to log the connections of the router object below.
/*console.log("Here are your connections from router 0:");
console.log(dataConnections);
*/
// write a loop that prints the connections one by one.


/*for (i = 0; i < dataConnections.length; i++) {
    console.log("Here are your connections from router 0 1 by one:");
    console.log(dataConnections[i])
}
*/

// If you haven't done so already, finish your JSON-data file such that
// it represents the pictured graph.



// And now that you know how to access the routers and the connections,
// create the graph by iterating over the data.
function printGraphIterate(){
for (i = 0; i < dataConnections.length; i++) {

    console.log(dataConnections[i]);
}
}

// initialize graph below
//printGraphIterate();

// add edges dynamically.


// Hint: You need a nested loop. 
// The outer loop must iterate the routers, and the inner loop the connections. 

//pseudo code:
/**
 * forEach router (r) {
 *      forEach router.connection (c) {
 *          graph.addEdge(fromNodeIndex, toNodeIndex, cost)         
 *      }
 * }
 */

let dataLength = data.routers.length;

let g = new jsgraphs.WeightedDiGraph(dataLength);
/*for(let i = 0; i< dataLength; i++) {
    let dataRouters = data.routers[i];
    for (let k = 0; k < dataRouters.connections.length; k++) {
        g.addEdge(new jsgraphs.Edge(dataRouters.router, dataRouters.connections[k], dataRouters.connections[k].cost))
    }
}
console.log("graph has edges");
*/

data.routers.forEach(r => {
    r.connections.forEach(c => {
        g.addEdge(new jsgraphs.Edge(r.router, c.to, c.cost))
    })
});


 // now that you have your graph, make sure it looks the previous graph,
 // and again implement the shortest path function.

const shortestPathJson = (graph, start, to) => {
    let sp = [];
    let dijkstra = new jsgraphs.Dijkstra(g,start);
        try {
            let path = dijkstra.pathTo(to);
            for (let i = 0; i < path.length; i++) {
                let e = path[i];
                sp.push(e.to());
            }
            console.log(sp);
        }
        catch(e){
            console.log("Error: Path not found")
        }
    };
const printGraph = (g) => {
    console.log("\nNodes: ", g.V);
    g.adjList.forEach((edges,i) => {
        console.log("Node: ", i);
        edges.forEach(e => {
            console.log("\tconnected to " + e.w + " with a weight of " + e.weight)
        })
    })
};

printGraph(g);

shortestPathJson(g, 0, 3);
