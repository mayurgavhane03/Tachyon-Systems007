export interface NodeData {
  id: string;
  type: string;
  name: string;
  details: any;
  "correlation-id": string;
  next?: string;
  prev?: string;
  position?: { x: number; y: number };
  nodeType?: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface Edge {
  source: NodeData;
  target: NodeData;
}

export interface GraphData {
  nodes: NodeData[];
  title: string;
  scale?: any;
}


//node detail 
export interface NodeDetails {
  browser?: string;
  "anonymous-user"?: boolean;
  method?: string;
  component?: string;
  endpoint?: string;
  access?: string;
  Parameters?: string;
  return?: string;
  type?: string;
  Provider?: string;
  table?: string;
}
