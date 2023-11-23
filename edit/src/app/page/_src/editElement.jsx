import React, { Component } from 'react';

class element extends Component {
    state = {
        ref: React.createRef()
    }
    renderEditElement = () => {
        if(this.props.element != null) {
            if(this.props.element.type == "p") {
                return this.renderEditText(this.props.element);
            }
        }
    }
    renderEditText = (obj) => {
        return (
            <textarea ref={this.state.ref} defaultValue={obj.content}></textarea>
        );
    }
    render() { 
        let content = '';
        if(this.props.element != null) {
            content = (
                <>
                    <div className='backgroundEdit' onClick={() => {this.props.closeEditMenu()}}>
                    </div>
                    <div className='editDiv'>
                        {this.renderEditElement()}
                        <div className='saveBtn' onClick={() => {this.props.saveEditMenu(this.state.ref.current.value)}}>Save</div>
                        <div className='cancelBtn' onClick={() => {this.props.closeEditMenu()}}>Cancel</div>
                    </div>
                </>
            )
        }
        return (content);
    }
}
 
export default element;