import React, { Component } from 'react';

import './menu.css';

class CustomContentMenu extends Component {
    setCoords = (x, y) => {
        console.log(x);
        console.log(y);
    }
    getStyle = () => {
        const display = (this.props.visable) ? 'block' : 'none';
        return {left: this.props.x + 'px', top: this.props.y + 'px', display: display}
    }
    render() { 
        const style = this.getStyle();
        return (
            <div className='menu' style={style}>
                <li onClick={() => this.props.addText()} >Add Text below</li>
                <li onClick={this.props.addImage}>Add Image below</li>
                <li onClick={this.props.addVideo}>Add Video below</li>
                <li onClick={this.props.editElement}>Edit this element</li>
                <li onClick={this.props.deleteElement}>Delete this element</li>
            </div>
        );
    }
}

export default CustomContentMenu;