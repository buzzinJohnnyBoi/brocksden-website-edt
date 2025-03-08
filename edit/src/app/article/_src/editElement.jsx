import React, { Component } from 'react';

class element extends Component {
    state = {
        ref: React.createRef(),
        image: null,
        file: null,
        fileName: null
    }
    componentDidMount() {
        this.state.ref.current.focus();
    }
    renderEditElement = () => {
        if(this.props.element != null) {
            if(this.props.element.type == "p") {
                return (
                    <>
                        {this.renderEditText(this.props.element.content)}
                        <div className='saveBtn' onClick={() => {this.props.saveEditMenu(this.state.ref.current.value, "text")}}>Save</div>
                        <div className='cancelBtn' onClick={() => {this.props.closeEditMenu();}}>Cancel</div>
                    </>
                );
            }
            else if(this.props.element.type == "img") {
                return (
                    <>
                        {this.renderEditImage(this.props.element)}
                        <div className='saveBtn' onClick={() => {this.props.saveEditMenu({ src: this.state.image, file: this.state.file, name: this.state.fileName}, "image")}}>Save</div>
                        <div className='cancelBtn' onClick={() => {this.props.closeEditMenu();}}>Cancel</div>
                    </>
                );
            }
            else {
                return (
                    <>
                        {this.renderEditText(this.props.element.props.children.props.url.replace("https://www.youtube.com/embed/", ""))}
                        <div className='saveBtn' onClick={() => {this.props.saveEditMenu(this.state.ref.current.value, "video")}}>Save</div>
                        <div className='cancelBtn' onClick={() => {this.props.closeEditMenu();}}>Cancel</div>
                    </>
                );
            }
        }
    }
    renderEditText = (content) => {
        return (
            <textarea ref={this.state.ref} defaultValue={content}></textarea>
        );
    }
    renderEditImage = (obj) => {
        const img = (this.state.image == null) ? "/image/noImage.jpg" : this.state.image;
        return (
            <>
                <form>
                    {/* <label htmlFor="image">Select an image:</label> */}
                    <input ref={this.state.ref} type="file" id="image" name="image" accept="image/*" onChange={this.setImage} />
                    <img src={img} alt="Selected" style={{ maxWidth: '200px' }} />
                </form>
            </>
        );
    }
    setImage = async (event) => {
        const file = event.target.files[0];
        if(!(file == null || file == undefined)) {
            const url = URL.createObjectURL(file);
            const response = await fetch(url);
            const blob = await response.blob();
            const buffer = await blob.arrayBuffer();
            
            const ext = file.name.split('.').pop();
            const filename = Date.now() + "." + ext;
    
            this.setState({ image: url, file: buffer, fileName: filename });
        }
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
                    </div>
                </>
            )
        }
        return (content);
    }
}
 
export default element;