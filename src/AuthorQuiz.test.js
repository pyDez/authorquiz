import React from "react";
import ReactDom from "react-dom";
import AuthorQuiz from "./AuthorQuiz";
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new Adapter()});

const state = {
    turnData: {
        books: ['The Shining', 'IT', 'David Copperfield', 'A Tale of two Cities'],
        author: {
            name: 'Stephen King',
            imageUrl: 'images/authors/stephenking.jpg',
            imageSource: 'Wikimedia Commons',
            books: ['The Shining', 'IT']
        },
    },
    highlight: 'none'
}


describe("Author Quiz", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDom.render(<AuthorQuiz {...state} onAnswerSelected={()=>{}}/>, div);
    });
})