import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
// import {DragDropContext} from 'react-dnd'
// import CustomDragLayer from '../dndComponents/CustomDragLayer'
import Page from '../page/Page'


export interface CanvasProps extends JSX.IntrinsicAttributes {
    editable: any;
    selectElement: any;
    clearSelectedIfDeleted: any;
}

const Canvas = ({editable, selectElement, clearSelectedIfDeleted}: CanvasProps): JSX.Element => {
    let edit = editable;
    let sel
    return (
      <div>
        <h3>This is the Canvas</h3>
         <Page />
{/* //           snapToGrid={snapToGridAfterDrop}
//           selectElement={this.props.selectElement}
//           deleteMode={deleteMode}
//           editable={this.props.editable}
//           clearSelectedIfDeleted={this.props.clearSelectedIfDeleted}
//         
//           {this.props.editable ? */}
{/* //             (<div id="drag-canvas">
//               <CustomDragLayer snapToGrid={snapToGridWhileDragging} />
//               <p>
//                 <label htmlFor="snapToGridWhileDragging">
//                   <input */}
{/* //                     id="snapToGridWhileDragging"
//                     type="checkbox"
//                     checked={snapToGridWhileDragging}
//                     onChange={this.handleSnapToGridWhileDraggingChange}
//                   />
//                   <small>Snap to grid while dragging</small>
//                 </label> */}
{/* //                 <br />
//                 <label htmlFor="snapToGridAfterDrop">
//                   <input */}
{/* //                     id="snapToGridAfterDrop"
//                     type="checkbox"
//                     checked={snapToGridAfterDrop}
//                     onChange={this.handleSnapToGridAfterDropChange}
//                   />
//                   <small>Snap to grid after drop</small>
//                 </label> */}
{/* //                 <br />
//                 <label htmlFor="deleteMode">
//                   <input */}
{/* //                     id="deleteMode"
//                     type="checkbox"
//                     checked={deleteMode}
//                     onChange={this.handleDeleteMode}
//                   />
//                   <small id="deleteCheckbox">Delete mode</small>
//                 </label> */}
{/* //               </p> */}
{/* //             </div>) */}
{/* //           : null} */}
      </div>
    );
}

export default Canvas; 





//     this.state = {
//       snapToGridAfterDrop: false,
//       snapToGridWhileDragging: false,
//       deleteMode: false,
//     }
//   }

//   handleSnapToGridAfterDropChange() {
//     this.setState({
//       snapToGridAfterDrop: !this.state.snapToGridAfterDrop,
//     })
//   }

//   handleSnapToGridWhileDraggingChange() {
//     this.setState({
//       snapToGridWhileDragging: !this.state.snapToGridWhileDragging,
//     })
//   }

//   handleDeleteMode () {
//     this.setState({
//       deleteMode: !this.state.deleteMode,
//     })
//   }

//   render() {
//     const { snapToGridAfterDrop, snapToGridWhileDragging, deleteMode } = this.state;

//   }
// }

// export default DragDropContext(HTML5Backend)(Canvas)