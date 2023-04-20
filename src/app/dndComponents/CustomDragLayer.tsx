import React, { Component } from 'react';
// import { useDragLayer } from 'react-dnd';
// import snapToTheGrid from '../utils/snapToTheGrid';
// import ElementDragPreview from './ElementDragPreview';

// interface CustomDragLayerProps {
//   item: object,
//   itemType: string,
//   initialOffset: {
//     x: number,
//     y: number,
//   },
//   currentOffset: {
//     x: number,
//     y: number,
//   },
//   isDragging: boolean,
//   snapToGrid: any,
// };

// const CustomDragLayer = ({item, itemType, initialOffset, currentOffset, isDragging, snapToGrid}:CustomDragLayerProps): JSX.Element => {

//   const layerStyles = {
//     position: 'fixed',
//     pointerEvents: 'none',
//     zIndex: 100,
//     left: 0,
//     top: 0,
//     width: '100%',
//     height: '100%',
//   };

//   function getItemStyles() {
//     if (!initialOffset || !currentOffset) {
//       return {
//         display: 'none',
//       };
//     }
  
//     let { x, y } = currentOffset;
  
//     if (snapToGrid) {
//       x -= initialOffset.x;
//       y -= initialOffset.y;
//       [x, y] = snapToTheGrid(x, y);
//       x += initialOffset.x;
//       y += initialOffset.y;
//     }
  
//     const transform = `translate(${x}px, ${y}px)`;
//     return {
//       transform,
//       WebkitTransform: transform,
//     };
//   }

//   return (
//     <div style={{layerStyles}}>
//       <div style={getItemStyles()}>
//         <ElementDragPreview {...item} />
//       </div>
//     </div>
//   );
// }

// export default DragLayer(monitor => ({
//   item: monitor.getItem(),
//   itemType: monitor.getItemType(),
//   initialOffset: monitor.getInitialSourceClientOffset(),
//   currentOffset: monitor.getSourceClientOffset(),
//   isDragging: monitor.isDragging(),
// }))(CustomDragLayer)