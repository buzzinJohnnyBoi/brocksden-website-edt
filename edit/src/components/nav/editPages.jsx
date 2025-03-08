import React, { Component } from 'react';
import { addPage, deletePage } from "@/app/page/[id]/_addDeletePage";

class AddDeletePage extends Component {
    state = {
        addValue: '',
        deleteValue: ''
    }
    changeAddStr = (e) => {
        this.setState({addValue: e.target.value});
    }
    changeDeleteStr = (e) => {
        this.setState({deleteValue: e.target.value});
    }
    render() {
        if(this.props.showing == false) {
            return '';
        }
        else {
            return (
                <>
                    <div className='editPageNavCover' onClick={this.props.hideEditPages}></div>
                    <div className='editPageDiv'>
                        <div className='add'>
                            <h1>Add</h1>
                            <br></br>
                            <input className='editPage' placeholder='enter page name' type='text' onChange={this.changeAddStr} />
                            <br></br>
                            <br></br>
                            <button className='saveBtnNavEdit' onClick={() => addPage(this.state.addValue)}>Add Page</button>
                            <br></br>
                        </div>
                        <br></br>
                        <div className='delete'>
                            <h1>Delete</h1>
                            <br></br>
                            <input className='editPage' placeholder='enter page name' type='text' onChange={this.changeDeleteStr} />
                            <br></br>
                            <br></br>
                            <button className='saveBtnNavEdit' style={{width: "200px"}} onClick={() => deletePage(this.state.deleteValue)}>Delete Page</button>
                            <br></br>
                        </div>
                    </div>
                </>
            );
        }
    }
}
 
export default AddDeletePage;