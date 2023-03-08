import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  MarkerType,
} from 'reactflow';

import 'reactflow/dist/style.css';
import './index.css';
import TextUpdaterNode from './TextUpdaterNode/TextUpdaterNode';

const nodeTypes = { textUpdater: TextUpdaterNode };

const initialNodes = [
  {
    id: '0',
    type: 'textUpdater',
    position: { x: 0, y: 0 },
  },
  {
    id: '1',
    type: 'textUpdater',
    position: { x: 0, y: 100 },
  },
];

const initialEdges = [
  {
    id: 'edges-e5-7',
    source: '0',
    target: '1',
    label: '+',
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  }
]

let id = 1;
const getId = () => `${id++}`;

const fitViewOptions = {
  padding: 3,
};

const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const [addChildNode, setAddChildNode] = useState(false);
  const [parentNode, setParentNode] = useState(null);

  useEffect(()=>{  
    if(addChildNode){
      setEdges((eds) => eds.concat({
        id: String(parseInt(Math.random(100000000)*1000000)),
        source: parentNode.id,
        target: nodes[nodes.length-1].id,
        label: '+',
        labelBgPadding: [8, 4],
        labelBgBorderRadius: 4,
        labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      }));
      setAddChildNode(false);
      setParentNode(null);
    }
  },[nodes])

  const handleNodeClick = (e, data) => {
    const filterNodeswithSameSource = nodes.filter((node)=>node?.data?.parentId===data?.id);
    setNodes((nds) => nds.concat({
      id : getId(),
      type: 'textUpdater',
      position : { x: data.position.x+filterNodeswithSameSource.length*160, y: data.position.y+100},
      data: { label: 'New Node', parentId: data.id },
      width: 150,
    }));
    setAddChildNode(true);
    setParentNode(data);
  }

  return (
    <div className="wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={fitViewOptions}
      />
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
);