var jsgraphs = require('js-graph-algorithms');

// 1. Initialize your graph here.
var g = new jsgraphs.WeightedDiGraph(4); // 4 is the number vertices in the graph



// 2. Add edges to your graph below
g.addEdge(new jsgraphs.Edge(0, 1, 1.0)); // add undirected edge connecting vertex 0 to vertex 5
g.addEdge(new jsgraphs.Edge(0, 2, 3.0));
g.addEdge(new jsgraphs.Edge(0, 3, 7.0));
g.addEdge(new jsgraphs.Edge(1, 0, 1.0));
g.addEdge(new jsgraphs.Edge(1, 2, 1.0));
g.addEdge(new jsgraphs.Edge(2, 1, 1.0));
g.addEdge(new jsgraphs.Edge(2, 0, 3.0));
g.addEdge(new jsgraphs.Edge(2, 3, 2.0));
g.addEdge(new jsgraphs.Edge(3, 0, 7.0));
g.addEdge(new jsgraphs.Edge(3, 2, 2.0));



// 3. Create a function that takes a graph, a from node and a to node, 
//    and print the shortest path between the two nodes.





const shortestPath = (graph, to, from ) => {
    let dijkstra = new jsgraphs.Dijkstra(g, 0);
    let sp = [];
    for (var v = 1; v < g.V; ++v) {
        if (dijkstra.hasPathTo(v)) {
            var path = dijkstra.pathTo(v);
            for (var i = 0; i < path.length; ++i) {
                var e = path[i];
                console.log(e.from() + ' => ' + e.to() + ': ' + e.weight);
            }
            console.log('=====distance: ' + dijkstra.distanceTo(v) + '=========');
        }
        sp.push(v);
        console.log(sp)
    }

};

shortestPath(g);


// write the functionality here. Remember to look at the documentation!






// (4.) Modify above function to handle it, if a path doesn't exist. 
