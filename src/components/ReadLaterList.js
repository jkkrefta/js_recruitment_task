import Component from './Component';
import ReadLater from './ReadLater';

function createReadLater(htmlElement, index, application) {
    const listElement = document.createElement('li');
    htmlElement.appendChild(listElement);
    const readLater = new ReadLater({ element: listElement, state: { index }, application })
    readLater.renderer();
}

export default class ReadLaterList extends Component {
    constructor({ element, application }) {
        super({ element, application });
        this.innerComponents = [];
    }

    renderer() {
        this.htmlElement.innerHTML = '';
        this.application.state.saved.forEach((_, index) => createReadLater(this.htmlElement, index, this.application));
    }
}