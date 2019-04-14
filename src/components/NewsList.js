import Component from './Component';
import Article from './Article';

function createArticle(htmlElement, index, application) {
    const listElement = document.createElement('li');
    htmlElement.appendChild(listElement);
    return new Article({ element: listElement, state: { index }, application })
}

export default class NewsList extends Component {
    constructor({ element, application }) {
        super({ element, application });
    }

    renderer() {
        this.htmlElement.innerHTML = '';
        this.application.state.articles.forEach((_, index) => createArticle(this.htmlElement, index, this.application).renderer());
    }
};