import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentEditable from 'react-contenteditable'
import shouldPureComponentUpdate from '../utils/shouldPureComponentUpdate'
import { editText } from '../reducers/elements'

interface TextElementProps {
    text: string;
    id: string;
    size: any;
    type: string;
    editable: boolean;
    background: string;
    color: any;
}

const TextElement = ({id, type, text, background, size, color, editable}: TextElementProps): JSX.Element => {

    let shouldComponentUpdate = shouldPureComponentUpdate;
    let isDisabled;
    if (editable === false) {
        isDisabled = true;
    } else {
        isDisabled = false
    }

    const handleChange = (e: any) => {
        let updatedTextBox = {
            [id]: { text: e.target.value }
        }

        editText(updatedTextBox)
    }

    const getStyles = (isDisabled: boolean) => {
        let border = isDisabled ? "none" : '1px dashed gray'

        return {
            border: border,
            padding: '30px',
            cursor: 'move',
            background: background,
            fontSize: size,
            color: color,
        };
    }


    
    return (
      <div style={getStyles(isDisabled)}>
        <ContentEditable
          html={text}
          disabled={isDisabled}
          onChange={handleChange} />
      </div>
    );
}

const mapStateToProps = (state: any) => state

export default connect(mapStateToProps, { editText })(TextElement)