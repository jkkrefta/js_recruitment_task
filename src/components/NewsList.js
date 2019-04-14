import Component from './Component';
import Article from './Article';

export default class NewsList extends Component {
    constructor({ element, application }) {
        super({ element, application });
        this.innerComponents = [];
        for(var index=0; index<10; index++) {
            const listElement = document.createElement('li');
            element.appendChild(listElement);
            this.innerComponents.push(new Article({ element: listElement, state: { index: index }, application }));
        }
    }
};