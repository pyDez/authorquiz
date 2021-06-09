import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import reportWebVitals from './reportWebVitals';
import {sample, shuffle} from "underscore";
import {BrowserRouter, Route} from "react-router-dom";
import {withRouter} from 'react-router'
import AddAuthorForm from "./AddAuthorForm";
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

interface author {
    name: string,
    imageUrl: string,
    imageSource: string,
    books: string[],
    imageAttribution?: string,
}

interface state {
    authors:author[],
    turnData: turnData,
    highlight: string,
}

interface turnData {
    author:author,
    books: string[],
}

const authors : author[] = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/MarkTwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckleberry Finn',
            'Life on the Mississippi',
            'Roughing it'],
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/authors/josephconrad.png',
        imageSource: 'Wikimedia Commons',
        books: ['Heart of Darkness']
    },
    {
        name: 'J.K. Rowling',
        imageUrl: 'images/authors/jkrowling.jpg',
        imageSource: 'Wikimedia Commons',
        imageAttribution: 'Daniel Ogren',
        books: ['Harry Potter and the Sorcerers Stone']
    },
    {
        name: 'Stephen King',
        imageUrl: 'images/authors/stephenking.jpg',
        imageSource: 'Wikimedia Commons',
        imageAttribution: 'Pinguino',
        books: ['The Shining', 'IT']
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['David Copperfield', 'A Tale of Two Cities']
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'images/authors/williamshakespeare.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
    },
]

function getTurnData(authors: author[]): turnData {
    const allBooks = authors.reduce(function (p:string[], c:author, i:number) {
        return p.concat(c.books);
    }, [])

    const fourRandomBooks = shuffle(allBooks).slice(0, 4);
    const answer = sample(fourRandomBooks);

    const turnData = {
        books: fourRandomBooks,
        author: ensure(authors.find((author) =>
            author.books.some((title) => title === answer)))
    }

    return turnData;
}

function ensure<T>(argument: T | undefined | null, message: string = 'This value was promised to be there.'): T {
    if (argument === undefined || argument === null) {
        throw new TypeError(message);
    }

    return argument;
}

function reducer(state : state = {
    authors, turnData: getTurnData(authors),
    highlight: '',
}, action: Redux.AnyAction) {

    switch (action.type) {
        case 'ANSWER_SELECTED' :
            const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
            return Object.assign({}, state,
                {highlight: isCorrect ? 'correct' : 'wrong'});
        case 'CONTINUE' :
            return Object.assign({}, state,
                {highlight: '', turnData: getTurnData(state.authors)});
        case 'ADD_AUTHOR' :
            return Object.assign({}, state,
                {authors: state.authors.concat([action.author])});
        default:
            return state;
    }
}

let store = Redux.createStore(reducer, composeWithDevTools());


ReactDOM.render(
    <BrowserRouter>
        <ReactRedux.Provider store={store}>
            <Route exact path="/"
                   component={AuthorQuiz}></Route>
            <Route path="/add" component={AddAuthorForm}/>
        </ReactRedux.Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
