import React from "react";
import ReactDom from "react-dom";
import AuthorQuiz, {Book} from "./AuthorQuiz";
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
        ReactDom.render(<AuthorQuiz {...state} onAnswerSelected={() => {
        }}/>, div);
    });

    describe("When no answer have been selected", () => {
        let wrapper;
        beforeAll(() => {
            wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => {
            }}/>);
        });

        it("should have no background color", () => {
            expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
        });
    });

    describe("When the wrong answer have been selected", () => {
        let wrapper;
        beforeAll(() => {
            wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight: 'wrong'}))} onAnswerSelected={() => {
            }}/>);
        });

        it("should have a red background color", () => {
            expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
        });
    });

    describe("When the right answer have been selected", () => {
        let wrapper;
        beforeAll(() => {
            wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight: 'correct'}))} onAnswerSelected={() => {
            }}/>);
        });

        it("should have a green background color", () => {
            expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');
        });
    });

    describe('Test Button component', () => {
        it('Test click event', () => {
            const mockCallBack = jest.fn();

            const button = shallow((<button onClick={mockCallBack}>Ok!</button>));
            button.find('button').simulate('click');
            expect(mockCallBack.mock.calls.length).toEqual(1);
        });
    });

    describe("When the first answer is selected", () => {
        let wrapper;
        const handleAnswerSelected = jest.fn();

        beforeAll(() => {
            wrapper = mount(
                <AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected} />);
        });

        it("onAnswerSelected should be called", () => {
            wrapper.find('.answer').first().simulate('click');
            expect(handleAnswerSelected).toHaveBeenCalled();
        });

        it("should receive The Shining", () => {
            wrapper.find('.answer').first().simulate('click');
            expect(handleAnswerSelected).toHaveBeenCalledWith("The Shining");
        });
    });
})