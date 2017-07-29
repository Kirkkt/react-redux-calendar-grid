const Graph = function(n) {
  this.n = n;
  this.nodes = new Array(n);
  for (let i = 0; i < n; i++) {
    this.nodes[i] = {
      index: i,
    };
  }
  this.edges = new Array(n);
  for (let i = 0; i < n; i++) {
    this.edges[i] = [];
  }
};

Graph.prototype.addNode = function(index, data) {
  this.nodes[index].data = data;
};

Graph.prototype.addEdge = function(from, to) {
  this.edges[from].push(to);
  this.edges[to].push(from);
};

Graph.prototype.isConnected = function(from, to) {
  return this.edges[from].some(node => node === to);
};

Graph.prototype.getComponents = function() {
  const getAllConnectedNodesForNode = nodeIndex => {
    if (visited[nodeIndex]) {
      return [];
    }
    const result = [nodeIndex];
    visited[nodeIndex] = true;
    this.edges[nodeIndex].forEach(neighbor => {
      getAllConnectedNodesForNode(neighbor).forEach(element => result.push(element));
    });
    return result;
  };

  const resultIndices = [];
  const visited = [];
  for (let i = 0; i < this.n; i++) {
    if (visited[i]) {
      continue;
    }
    const newComponent = getAllConnectedNodesForNode(i);
    newComponent.sort((a, b) => a - b);
    resultIndices.push(newComponent);
  }
  return resultIndices;
};

Graph.prototype.getBucketsForComponent = function(component) {
  const buckets = [];
  component.forEach(node => {
    for (const b in buckets) {
      if (buckets[b].some(nodeInBucket => this.isConnected(nodeInBucket, node))) {
        continue;
      }
      buckets[b].push(node);
      return;
    }
    buckets.push([node]);
  });
  return buckets;
};

Graph.prototype.getBuckets = function() {
  return this.getComponents().map(component => this.getBucketsForComponent(component));
};

module.exports = Graph;
