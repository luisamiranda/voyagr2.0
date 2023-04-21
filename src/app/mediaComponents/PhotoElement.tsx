import React, { Component } from 'react'
import { connect } from 'react-redux'
// import shouldPureComponentUpdate from '../utils/shouldPureComponentUpdate'

interface PhotoElementProps {
    id: any;
    size: string;
    type: string;
    source: string;
}

const PhotoElement = ({id, size, type, source}: PhotoElementProps): JSX.Element=> {
//   shouldComponentUpdate = shouldPureComponentUpdate();

    return (
      <img
        className={`element-size-${size}`}
        src={source}
        // value={id}
        // type={type} 
        />
    );
}

const mapStateToProps = (state: any) => state

export default connect(mapStateToProps, null)(PhotoElement)