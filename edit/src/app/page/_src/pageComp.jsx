import React, { Component } from 'react';

class editComp extends Component {

    renderComp(obj) {
        if(obj.type == "text") {
            
        }
        else if(obj.type == "image") {

        }
        else {

        }
    }

    render() {
        const obj = this.props.comp;
        return this.renderComp(obj);
    }
}
 
export default editComp;