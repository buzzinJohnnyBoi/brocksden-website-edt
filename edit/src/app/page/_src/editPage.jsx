"use client"
import React, { Component } from 'react';
import CustomContentMenu from './customContextMenu';
import EditElement from './editElement';

class edit extends Component {
    state = {
        content: null,
        contextMenu: {
            x: 0,
            y: 0,
            visable: false,
        },
        currentElementIndex: null,
        currentEditId: null
    }
    componentDidMount = () => {
        this.setState({ content: this.parseObjectToUsableObject(this.props.content) });
    }
    parseObjectToReactElement(obj, index = 0, mapchildren = true) {
        const initialIndex = index;
        if (obj && obj.type) {
            let children = [];
            if (obj.props && obj.props.children && Array.isArray(obj.props.children) && mapchildren) {
                children = obj.props.children.map((child) => {
                    index++;
                    return this.parseObjectToReactElement(child, index, false)
                });
            }
            return React.createElement(obj.type, { ...obj.props, onContextMenu: (event) => {this.addComp(event, initialIndex)} }, ...children);
        }
        return obj;
    }
    parseObjectToUsableObject(obj) {
        let index = 0;
        if (obj.props && obj.props.children && Array.isArray(obj.props.children)) {
            return obj.props.children.map((child) => {
                console.log(child);
                index++;
                return {
                    index: index,
                    type: child.type,
                    content: child.props.children
                };
            });
        }
    }
    addComp = (event, id) => {
        if(id != 0) {
            this.setState({ currentElementIndex: id });
            event.preventDefault();
            console.log(id);
            console.log(this.state.content);
            this.setState({
                contextMenu: {
                    x: event.clientX,
                    y: event.clientY,
                    visable: true
                }
            });
        }
        // this.setState(prevState => {
        //     return { content: prevState.content };
        // });
    }
    hideContextMenu = () => {
        this.setState(prevState => {
            const menu = {...prevState.contextMenu};
            menu.visable = false;
            return { contextMenu: menu, currentElementIndex: null };
        });
    }
    addText = () => {
        const id = this.state.currentElementIndex;
        const content = this.state.content;
        content.push({
            index: id + 0.01,
            type: "p",
            content: "Some text"
        });
        content.sort((a, b) => a.index - b.index);
        this.setState({ content: content });
    }
    addImage = () => {
        const id = this.state.currentElementIndex;
        console.log(id);
    }
    addVideo = () => {
        const id = this.state.currentElementIndex;
        console.log(id);
    }
    editElement = () => {
        const index = this.state.currentElementIndex;
        this.setState({ currentEditId: index });
    }
    deleteElement = () => {
        const id = this.state.currentElementIndex;
        const index = this.getElementIndex(id);
        const content = [...this.state.content];
        if(index !== false) {
            content.splice(index, 1);
            this.setState({ content: content });
        }
    }
    getElementIndex = (id) => {
        const content = [...this.state.content];
        for (let i = 0; i < content.length; i++) {
            const element = content[i];
            if(element.index == id) {
                return i;
            }
        }
        return false;
    }
    saveEditMenu = (children) => {
        const id = this.state.currentEditId;
        const index = this.getElementIndex(id);
        const content = [...this.state.content];
        content[index].content = children;
        this.setState({ content: content });
        this.closeEditMenu();
    }
    closeEditMenu = () => {
        this.setState({ currentEditId: null });
    }
    renderContent = () => {
        if(this.state.content == null) {
            return 'loading';
        }
        const content = this.state.content.map(obj => {
            return React.createElement(obj.type, { ...obj.props, onContextMenu: (event) => {this.addComp(event, obj.index)} }, obj.content);
        })
        return content;
    }
    render() { 
        const content = this.renderContent();
        const editElement = (this.state.content == null || this.state.currentEditId == null) ? '' : <EditElement 
            element={this.state.content[this.getElementIndex(this.state.currentEditId)]}
            closeEditMenu={this.closeEditMenu}
            saveEditMenu = {this.saveEditMenu}
        />
        return (
            <div className='main' onClick={this.hideContextMenu}>
                <CustomContentMenu
                    x = {this.state.contextMenu.x}
                    y = {this.state.contextMenu.y}
                    visable = {this.state.contextMenu.visable}
                    addText = {this.addText}
                    addImage = {this.addImage}
                    addVideo = {this.addVideo}
                    editElement = {this.editElement}
                    deleteElement = {this.deleteElement}
                />
                {content}
                <h1>John</h1>
                {editElement}
            </div>
        );
    }
}

export default edit;