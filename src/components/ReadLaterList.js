import Component from './Component';
import ReadLater from './ReadLater';

export default class ReadLaterList extends Component {
    constructor({ element, application }) {
        super({ element, application });
        this.innerComponents = [];
    }

    renderer() {
        const self = this;
        this.htmlElement.innerHTML = '';
        this.innerComponents = [];
        this.application.state.saved.forEach((saved, index) => {
            const listElement = document.createElement('li');
            self.htmlElement.appendChild(listElement);
            const readLater = new ReadLater({ element: listElement, state: { index: index }, application: self.application })
            self.innerComponents.push(readLater);
            readLater.renderer();
        });
    }
}