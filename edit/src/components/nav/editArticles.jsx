import React, { Component } from 'react';
import { addArticle, deleteArticle } from "@/app/page/[id]/_addDeleteArticle";

class AddDeleteArticle extends Component {
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
                            <input className='editPage' placeholder='enter Article name' type='text' onChange={this.changeAddStr} />
                            <br></br>
                            <br></br>
                            <button className='saveBtnNavEdit' onClick={() => addArticle(this.state.addValue)}>Add Article</button>
                            <br></br>
                        </div>
                        <br></br>
                        <div className='delete'>
                            <h1>Delete</h1>
                            <br></br>
                            <input className='editPage' placeholder='enter Article name' type='text' onChange={this.changeDeleteStr} />
                            <br></br>
                            <br></br>
                            <button className='saveBtnNavEdit' style={{width: "200px"}} onClick={() => deleteArticle(this.state.deleteValue)}>Delete Article</button>
                            <br></br>
                        </div>
                    </div>
                </>
            );
        }
    }
}
 
export default AddDeleteArticle;