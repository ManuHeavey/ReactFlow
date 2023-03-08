import { Handle, Position } from "reactflow";

export default function TextUpdaterNode({ isConnectable }) {
    return (
      <div className="text-updater-node">
        <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
        <div>
          <label htmlFor="text">Texto:</label>
          <button className='btnAddChildNode'>Add Child Node</button>
        </div>
        <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
      </div>
    );
  }
