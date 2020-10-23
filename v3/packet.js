const seaport = require('seaport');
var ports = seaport.connect('localhost', 9090);
const fetch = require('node-fetch');

class Packet{
    constructor(id, source, destination, ttl, routingHistory=[], shortestPath = []) {
        this.id = id;
        this.source = source;
        this.destination = destination;
        this.routingHistory = routingHistory;
        this.ttl = ttl;
        this.shortestPath = shortestPath;
    }

    popShortestPath() {
        /**
         The shift method removes the element at the zeroeth index
         and shifts the values at consecutive indexes down,
         then returns the removed value. If the length property is 0, undefined is returned.
         shift is intentionally generic; this method can
         be called or applied to objects resembling arrays.
         */
        return this.shortestPath.shift();
    }

    getTotalCost() {
        /**
         The reduce() method reduces the array to a single value.
         The reduce() method executes a provided function for each value of the array (from left-to-right).
         The return value of the function is stored in an accumulator (result/total).
         Note: reduce() does not execute the function for array elements without values
         */
        return this.routingHistory.reduce((acc, route) => acc+route.cost, 0);
    }

    addRouteToHistory(route) {
        this.routingHistory.push(route);
    }

    prettyPrint() {
        let out = "\nPacket source: router" + this.source;
        out += "\nPacket destination: router" + this.destination;
        out += "\nPacket reached destination and followed ";
        this.routingHistory.forEach(route => {
            out += "\n\trouter"+route.to + " at cost " + route.cost + ". ttl: " + route.ttl;
        })
        out += "\nTotal cost of: " + this.getTotalCost();
        console.log(out)
    }

    forwardPacket(to) {
        let sourceRouter = ports.query("router"+to)[0];
        var host = sourceRouter.host.split(":").reverse()[0];
        var port = sourceRouter.port;
        /**
         * node-fetch is a library to send http-requests. 
         * In this case, we use it to post / forward the package.
         * The documentation can be found here: 
         * https://github.com/node-fetch/node-fetch
         */
        fetch("http://" + host + ":" + port, {
            method: 'post',
            body:    JSON.stringify(this),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(json => {
            if(json.msg) {
                console.log(json.msg);
            } else {
                let packet = new Packet(json.id, json.source, json.destination, json.ttl, json.routingHistory, json.shortestPath);
                packet.prettyPrint();
            }
            process.exit(1);
        });
    }
}

module.exports = Packet;