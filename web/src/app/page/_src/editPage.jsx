"use client"
import React, { Component } from 'react';
import EditElement from './editElement';
import Iframe from 'react-iframe';
import "./body.css";
import { getAllArticles } from '../[id]/_getAllArticles';

class edit extends Component {
    state = {
        content: null,
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
                    return (
                        <div key={i} style={{paddingTop: "10px", paddingBottom: "10px", borderLeft: "25vw solid black", borderRight: "25vw solid black", height: "47vw", width: "100vw" }}>
                            <Iframe url={obj.props.children.props.url} width='100%' height='100%' />
                        </div>
                    );
                }
            }
        });
        return (
            <div key="contentMain">
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
        else if(this.props.id == "Home") {
            const style = {
                backgroundSize: "100%",
                height: "20vw",
                width: "20vw",
                display: "inline-block",
                margin: "1.5vw",
                borderRadius: "10px"
            }
                return (
                    <React.Fragment style={{textAlign: "center"}}>
                        <div style={{...style, backgroundImage: "url('/image/square_1.jpg')",}}>
                        </div>
                        <div style={{...style, backgroundImage: "url('/image/square_2.jpg')",}}>
                        </div>
                        <div style={{...style, backgroundImage: "url('/image/square_3.jpg')",}}>
                        </div>
                    </React.Fragment>
                )            
        }
        else {
            return '';
        }
    }
    render() { 
        const content = this.renderContent();
        const articles = this.renderArticlesOnCorrectPage();
        return (
            <div className='mainContainer' onClick={this.hideContextMenu}>
                {content}
                {articles}
            </div>
        );
    }
}

export default edit;