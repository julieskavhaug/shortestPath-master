let data = require("../data.json");
const Router = require("./routerV3");
const Packet = require("./packet");
const prompt = require('prompt'); 
const jsgraphs = require('js-graph-algorithms');

let routers = [];

const multipleRouters = () => {
    /**
     * 1. Iterate through the data and create the routers from it 
     * as well as add it to our array.
     */

    // your code here

    data.routers.forEach(router => {
        // initialize router
        let r = new Router(router.router, router.connections);

        // add to array
        routers.push(r);
    });



    /**
     * 2. build a weighted directional graph and adds the edges 
     * between the nodes through the data.json file
     */

    // your code here
    let dataLength = data.routers.length;
    let graph = new jsgraphs.WeightedDiGraph(dataLength);

    data.routers.forEach(r => {
        r.connections.forEach(c => {
            graph.addEdge(new jsgraphs.Edge(r.router, c.to, c.cost))
        })
        console.log("This works")
    });

    /**
     * 3. create a new packet. 
     * create a packet with a name, a source, a destination and a ttl.
     * the source should be 0, destination 3 and ttl > 3. 
     * the name can be whatever you'd like.
     */

    let id = 1337;
    let source = 0;
    let destination = 2;
    let ttl = 40;
    let demoPacket = new Packet(id, source, destination, ttl);
    // Add the shortest path to the packet.
    demoPacket.shortestPath = getShortestPath(graph, demoPacket.source, demoPacket.destination);
    console.log("This as well");
    /**
     * Prompt is a package to prompt the user though the terminal.
     * Can be found here: https://github.com/flatiron/prompt#readme
     */
    prompt.start();
    console.log("demo packet initialized. Send packet? (y/n)")
    prompt.get(["sendPacket"], function(err, res) {
        if(res.sendPacket == "y") {
            demoPacket.forwardPacket(demoPacket.source);
        }
        else {
            console.log("Bye!")
            process.exit(1);
        }
    })
}

/**
 * This methods gets the router names / indexes on the shortest path.
 */
const getShortestPath = (graph, from, to)  => {
    // 4. implement this.
    let sp = []
    let dijkstra = new jsgraphs.Dijkstra(graph,from);
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


multipleRouters();
