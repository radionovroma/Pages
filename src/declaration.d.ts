declare module "\*.svg" {
  import React = require("react");
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module "*.png" {
  const value: any;
  export default value;
}
