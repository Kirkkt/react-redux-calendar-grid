import test from 'ava';
import Graph from '../../src/common/Graph';

test('constructor', t => {
  const graph = new Graph(3);
  t.is(graph.n, 3);
  // nodes
  t.is(graph.nodes instanceof Array, true);
  t.is(graph.nodes.length, 3);
  t.is(graph.nodes[0] instanceof Object, true);
  t.is(graph.nodes[1] instanceof Object, true);
  t.is(graph.nodes[2] instanceof Object, true);
  t.is(graph.nodes[0].index, 0);
  t.is(graph.nodes[1].index, 1);
  t.is(graph.nodes[2].index, 2);
  t.is(graph.nodes[0].data, undefined);
  t.is(graph.nodes[1].data, undefined);
  t.is(graph.nodes[2].data, undefined);
  // edges
  t.is(graph.edges instanceof Array, true);
  t.is(graph.edges.length, 3);
  t.is(graph.edges[0] instanceof Array, true);
  t.is(graph.edges[1] instanceof Array, true);
  t.is(graph.edges[2] instanceof Array, true);
  t.is(graph.edges[0].length, 0);
  t.is(graph.edges[1].length, 0);
  t.is(graph.edges[2].length, 0);
});

test('addNode', t => {
  const graph = new Graph(3);
  t.is(graph.nodes[0].data, undefined);
  t.is(graph.nodes[1].data, undefined);
  t.is(graph.nodes[2].data, undefined);
  graph.addNode(1, 'data value');
  t.is(graph.nodes[0].data, undefined);
  t.is(graph.nodes[1].data, 'data value');
  t.is(graph.nodes[2].data, undefined);
});

test('addEdge', t => {
  const graph = new Graph(3);
  t.is(graph.edges[0].length, 0);
  t.is(graph.edges[1].length, 0);
  t.is(graph.edges[2].length, 0);
  graph.addEdge(0, 1);
  t.is(graph.edges[0].length, 1);
  t.is(graph.edges[0][0], 1);
  t.is(graph.edges[1].length, 1);
  t.is(graph.edges[1][0], 0);
  t.is(graph.edges[2].length, 0);
});

test('isConnected', t => {
  const testBothDirections = (from, to, expected) => {
    t.is(graph.isConnected(from, to), expected);
    t.is(graph.isConnected(to, from), expected);
  };
  const graph = new Graph(3);
  testBothDirections(0, 1, false);
  testBothDirections(0, 2, false);
  testBothDirections(1, 2, false);
  graph.edges[0].push(1);
  graph.edges[1].push(0);
  testBothDirections(0, 1, true);
  testBothDirections(0, 2, false);
  testBothDirections(1, 2, false);
  graph.edges[0].push(2);
  graph.edges[2].push(0);
  testBothDirections(0, 1, true);
  testBothDirections(0, 2, true);
  testBothDirections(1, 2, false);
  graph.edges[1].push(2);
  graph.edges[2].push(1);
  testBothDirections(0, 1, true);
  testBothDirections(0, 2, true);
  testBothDirections(1, 2, true);
});

test('getComponents for island graph', t => {
  const graph = new Graph(3);
  const actual = graph.getComponents();
  t.is(actual.length, 3);
  t.is(actual instanceof Array, true);
  t.is(actual[0] instanceof Array, true);
  t.is(actual[0].length, 1);
  t.is(actual[0][0], 0);
  t.is(actual[1] instanceof Array, true);
  t.is(actual[1].length, 1);
  t.is(actual[1][0], 1);
  t.is(actual[2] instanceof Array, true);
  t.is(actual[2].length, 1);
  t.is(actual[2][0], 2);
});

test('getComponents for partially connected partially island graph', t => {
  const graph = new Graph(5);
  graph.addEdge(0, 1);
  graph.addEdge(3, 4);
  const actual = graph.getComponents();
  t.is(actual.length, 3);
  t.is(actual instanceof Array, true);
  t.is(actual[0] instanceof Array, true);
  t.is(actual[0].length, 2);
  t.is(actual[0][0], 0);
  t.is(actual[0][1], 1);
  t.is(actual[1] instanceof Array, true);
  t.is(actual[1].length, 1);
  t.is(actual[1][0], 2);
  t.is(actual[2] instanceof Array, true);
  t.is(actual[2].length, 2);
  t.is(actual[2][0], 3);
  t.is(actual[2][1], 4);
});

test('getComponents for partially connected no island graph', t => {
  const graph = new Graph(5);
  graph.addEdge(0, 1);
  graph.addEdge(1, 2);
  graph.addEdge(3, 4);
  const actual = graph.getComponents();
  t.is(actual.length, 2);
  t.is(actual instanceof Array, true);
  t.is(actual[0] instanceof Array, true);
  t.is(actual[0].length, 3);
  t.is(actual[0][0], 0);
  t.is(actual[0][1], 1);
  t.is(actual[0][2], 2);
  t.is(actual[1] instanceof Array, true);
  t.is(actual[1].length, 2);
  t.is(actual[1][0], 3);
  t.is(actual[1][1], 4);
});

test('getComponents for fully connected graph', t => {
  const graph = new Graph(5);
  graph.addEdge(0, 1);
  graph.addEdge(0, 4);
  graph.addEdge(1, 2);
  graph.addEdge(3, 4);
  const actual = graph.getComponents();
  t.is(actual.length, 1);
  t.is(actual instanceof Array, true);
  t.is(actual[0] instanceof Array, true);
  t.is(actual[0].length, 5);
  t.is(actual[0][0], 0);
  t.is(actual[0][1], 1);
  t.is(actual[0][2], 2);
  t.is(actual[0][3], 3);
  t.is(actual[0][4], 4);
});

test('getBucketsForComponent for single-node component', t => {
  const graph = new Graph(5);
  const actual = graph.getBucketsForComponent([0]);
  t.deepEqual(actual, [[0]]);
});

test('getBucketsForComponent for partially connected component', t => {
  const graph = new Graph(5);
  graph.addEdge(0, 1);
  graph.addEdge(0, 2);
  const actual = graph.getBucketsForComponent([0, 1, 2]);
  t.deepEqual(actual, [[0], [1, 2]]);
});

test('getBucketsForComponent for partially connected component another', t => {
  const graph = new Graph(5);
  graph.addEdge(0, 1);
  graph.addEdge(1, 2);
  const actual = graph.getBucketsForComponent([0, 1, 2]);
  t.deepEqual(actual, [[0, 2], [1]]);
});

test('getBucketsForComponent for partially connected component larger', t => {
  const graph = new Graph(5);
  graph.addEdge(0, 1);
  graph.addEdge(0, 2);
  graph.addEdge(1, 2);
  graph.addEdge(0, 3);
  graph.addEdge(0, 4);
  const actual = graph.getBucketsForComponent([0, 1, 2, 3, 4]);
  t.deepEqual(actual, [[0], [1, 3, 4], [2]]);
});

test('getBucketsForComponent for fully connected component', t => {
  const graph = new Graph(5);
  graph.addEdge(0, 1);
  graph.addEdge(0, 2);
  graph.addEdge(1, 2);
  const actual = graph.getBucketsForComponent([0, 1, 2]);
  t.deepEqual(actual, [[0], [1], [2]]);
});

test('getBuckets for island graph', t => {
  const graph = new Graph(5);
  const actual = graph.getBuckets();
  t.deepEqual(actual, [[[0]], [[1]], [[2]], [[3]], [[4]]]);
});

test('getBuckets for partially connected no island graph', t => {
  const graph = new Graph(5);
  graph.addEdge(0, 1);
  graph.addEdge(0, 2);
  const actual = graph.getBuckets();
  t.deepEqual(actual, [[[0], [1, 2]], [[3]], [[4]]]);
});

test('getBuckets for partially connected islang graph', t => {
  const graph = new Graph(5);
  graph.addEdge(0, 1);
  graph.addEdge(0, 2);
  graph.addEdge(3, 4);
  const actual = graph.getBuckets();
  t.deepEqual(actual, [[[0], [1, 2]], [[3], [4]]]);
});

test('getBuckets for fully connected graph', t => {
  const graph = new Graph(5);
  graph.addEdge(0, 1);
  graph.addEdge(0, 2);
  graph.addEdge(2, 3);
  graph.addEdge(3, 4);
  const actual = graph.getBuckets();
  t.deepEqual(actual, [[[0, 3], [1, 2, 4]]]);
});

test('getBuckets for fully connected graph another', t => {
  const graph = new Graph(5);
  graph.addEdge(0, 1);
  graph.addEdge(0, 2);
  graph.addEdge(1, 2);
  graph.addEdge(2, 3);
  graph.addEdge(3, 4);
  const actual = graph.getBuckets();
  t.deepEqual(actual, [[[0, 3], [1, 4], [2]]]);
});

test('getBuckets for almost full graph', t => {
  const graph = new Graph(5);
  graph.addEdge(0, 1);
  graph.addEdge(0, 2);
  graph.addEdge(1, 2);
  graph.addEdge(0, 3);
  graph.addEdge(1, 3);
  graph.addEdge(2, 3);
  graph.addEdge(0, 4);
  graph.addEdge(1, 4);
  graph.addEdge(3, 4);
  const actual = graph.getBuckets();
  t.deepEqual(actual, [[[0], [1], [2, 4], [3]]]);
});

test('getBuckets for full graph', t => {
  const graph = new Graph(5);
  graph.addEdge(0, 1);
  graph.addEdge(0, 2);
  graph.addEdge(1, 2);
  graph.addEdge(0, 3);
  graph.addEdge(1, 3);
  graph.addEdge(2, 3);
  graph.addEdge(0, 4);
  graph.addEdge(1, 4);
  graph.addEdge(2, 4);
  graph.addEdge(3, 4);
  const actual = graph.getBuckets();
  t.deepEqual(actual, [[[0], [1], [2], [3], [4]]]);
});

