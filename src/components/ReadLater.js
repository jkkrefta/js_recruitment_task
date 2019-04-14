import Component from './Component';

function createOnClick(index, application) {
    return event => {
        application.removeArticle(index);
    }
}

export default class ReadLater extends Component {
    constructor({ element, state, application }) {
        super({ element, state, application, register: false })
    }

    renderer() {
        const saved = this.application.state.saved[this.state.index];
        this.htmlElement.innerHTML = `
            <h4 class="readLaterItem-title">${saved.header}</h4>
            <section id="saved${this.state.index}">
                <a href="${saved.url}" class="button button-clear">Read</a>
                <button class="button button-clear">Remove</button>
            </section>
        `;

        const button = this.htmlElement.querySelector(`#saved${this.state.index} > button.button.button-clear`);
        button.addEventListener('click', createOnClick(this.state.index, this.application));
    }
}