import React from 'react'
// import TextElement from '../elementComponents/TextElement';
// import PhotoElement from '../elementComponents/PhotoElement'
// import VideoElement from '../elementComponents/VideoElement'

interface whatTypeProps { 
    text: string, 
    connectDragSource: any, 
    id: any, 
    size: any, 
    type: string, 
    source: any,
    editable: boolean
}

const whatTypeElementToRender = ({ text, connectDragSource, id, size, type, source, editable }: whatTypeProps): JSX.Element => {
//     //switch case based off of the element type,
//     //returns the proper element

    // switch (type) {
    //   case "textBox":
    //     return (
    //       <TextElement text={text} id={id} size={size} type={type} editable={editable} />
    //     );
    //   case "photo":
    //     return (
    //       <PhotoElement id={id} size={size} type={type} source={source}/>
    //     );
    //   case "video":
    //     return (
    //       <VideoElement id={id} size={size} type={type} source={source}/>
    //     );
    // }
    return(
        <div>
            <h2>this is ana element</h2>
        </div>
    )
  }

  export default whatTypeElementToRender;