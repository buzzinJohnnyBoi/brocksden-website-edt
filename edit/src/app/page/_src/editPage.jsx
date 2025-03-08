"use client"
import React, { Component } from 'react';
import CustomContentMenu from './customContextMenu';
import EditElement from './editElement';
import action from "../[id]/_setData";
import uploadImage from "../[id]/_uploadImage";
import Iframe from 'react-iframe';
import "./body.css";
import { getAllArticles } from '../[id]/_getAllArticles';

class edit extends Component {
    state = {
        content: null,
        contextMenu: {
            x: 0,
            y: 0,
            visable: false,
        },
        currentElementIndex: null,
        currentEditId: null,
        articles: null,
    }
    componentDidMount = async () => {
        this.setState({ content: this.parseObjectToUsableObject(this.props.content) });
        if(this.props.id == "Articles") {
            this.setState({ articles: await getAllArticles() });
        }
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
                index++;
                return {
                    index: index,
                    type: child.type,
                    props: child.props,
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
        const content = this.state.content;
        content.push({
            index: id + 0.01,
            type: "img",
            props: {
                src: "/image/noImage.jpg"
            }
        });
        content.sort((a, b) => a.index - b.index);
        this.setState({ content: content })
        console.log(id);
    }
    addVideo = () => {
        const id = this.state.currentElementIndex;
        const content = this.state.content;
        content.push({
            index: id + 0.01,
            type: "YouTube",
            props: {
                children: {
                    props: {
                        url: ""
                    }
                }
            }
        });
        content.sort((a, b) => a.index - b.index);
        this.setState({ content: content });
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
    saveEditMenu = async (children, type) => {
        const id = this.state.currentEditId;
        const index = this.getElementIndex(id);
        const content = [...this.state.content];
        if(type == "text") {
            content[index].content = children;
        }
        else if(type == "image") {
            if(children.src !== null && children.file !== null && children.name !== null) {
                const formData = new FormData();
                formData.append("image", new Blob([children.file], { type: "image/jpeg" }));
                const success = await uploadImage(formData, children.name);
                if(success) {
                    content[index].props["src"] = "https://image.brocksden.ca/images/" + children.name;
                }
                else {
                    content[index].props["src"] = "https://image.brocksden.ca/images/" + children.name;
                }
            }
        }
        else {
            console.log(children)
            content[index].props.children.props.url = "https://www.youtube.com/embed/" + children;
        }
        this.setState({ content: content });
        this.closeEditMenu();
    }
    closeEditMenu = () => {
        this.setState({ currentEditId: null });
    }

    savePage = () => {
        const content = JSON.stringify(this.renderContent());
        action(this.props.id, content);
    }

    renderContent = () => {
        if(this.state.content == null) {
            return 'loading';
        }
        const content = this.state.content.map((obj, i) => {
            if(obj.type == "p") {
                return React.createElement(obj.type, { ...obj.props, onContextMenu: (event) => {this.addComp(event, obj.index)}, key: i }, obj.content);
            }
            else {
                if(obj.type == "img") {
                    return React.createElement(obj.type, { ...obj.props, onContextMenu: (event) => {this.addComp(event, obj.index)}, key: i });
                }
                else {
                    console.log(obj.props)
                    return (
                        <div key={i} style={{paddingTop: "10px", paddingBottom: "10px", borderLeft: "25vw solid gray", borderRight: "25vw solid gray", height: "47vw", width: "100vw" }}>
                            <Iframe url={obj.props.children.props.url} width='100%' height='100%' />
                        </div>
                    );
                }
            }
        });
        return (
            <div>
                {content}
            </div>
        );
    }
    renderArticlesOnCorrectPage = () => {
        if(this.state.articles !== null) {
            return this.state.articles.map((article) => (
                <div key={article}>
                    <a key={article} style={{fontSize: "25px", textDecoration: "underline", color: "blue"}} href={"/article/" + article}>{article}</a>
                </div>
            ));              
        }
        else if(this.props.id == "Contact") {
            return (
                <div>
                    <iframe style={{paddingTop: "10px", paddingBottom: "10px", marginLeft: "20vw", width: "60vw" }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d67442.69718839764!2d-80.97334359644496!3d43.400419501481416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882eadaf4e4d128b%3A0x9adca459baf8dddc!2s2719%20Perth%20County%20Line%2037%2C%20Gads%20Hill%2C%20ON%20N0K%201J0!5e0!3m2!1sen!2sca!4v1701543204056!5m2!1sen!2sca" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            )            
        }
        else {
            return '';
        }
    }
    render() { 
        const content = this.renderContent();
        const articles = this.renderArticlesOnCorrectPage();
        const editElement = (this.state.content == null || this.state.currentEditId == null) ? '' : <EditElement 
            element={this.state.content[this.getElementIndex(this.state.currentEditId)]}
            closeEditMenu={this.closeEditMenu}
            saveEditMenu = {this.saveEditMenu}
        />
        return (
            // <div className='main' onClick={this.hideContextMenu}>
            <div className='mainContainer' onClick={this.hideContextMenu}>
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
                {articles}
                <br></br>
                <button onClick={this.savePage} className='saveBtnPage'>Save</button>
                {editElement}
            </div>

            // </div>
        );
    }
}

export default edit;