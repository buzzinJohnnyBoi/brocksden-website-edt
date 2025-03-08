"use client"
import React, { Component } from 'react';
import EditElement from './editElement';
import Iframe from 'react-iframe';

import "./body.css"

class edit extends Component {
    state = {
        content: null
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
            return React.createElement(obj.type, { ...obj.props }, ...children);
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

    renderContent = () => {
        if(this.state.content == null) {
            return 'loading';
        }
        const content = this.state.content.map((obj, i) => {
            if(obj.type == "p") {
                return React.createElement(obj.type, { ...obj.props, key: i }, obj.content);
            }
            else {
                if(obj.type == "img") {
                    return React.createElement(obj.type, { ...obj.props, key: i });
                }
                else {
                    console.log(obj.props)
                    return (
                        <div key={i} style={{paddingTop: "10px", paddingBottom: "10px", borderLeft: "25vw solid black", borderRight: "25vw solid black", height: "47vw", width: "100vw" }}>
                            <Iframe url={obj.props.children.props.url} width='100%' height='100%' />
                        </div>
                    );
                }
            }
        })
        return (
            <div>
                {content}
            </div>
        );
    }
    render() { 
        const content = this.renderContent();
        return (
            <div className='mainContainer' onClick={this.hideContextMenu}>
                {content}
            </div>
        );
    }
}

export default edit;