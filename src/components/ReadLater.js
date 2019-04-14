import Component from './Component';

function createOnClickHandler(index, application) {
    return event => {
        application.removeArticle(index);
    }
}

function bindRemoveButton(htmlElement, index, application) {
    htmlElement.querySelector(`#saved${index} > button.button.button-clear`).addEventListener('click', createOnClickHandler(index, application));
}

function template(index, { header, url }) {
    return `
        <h4 class="readLaterItem-title">${header}</h4>
        <section id="saved${index}">
            <a href="${url}" class="button button-clear">Read</a>
            <button class="button button-clear">Remove</button>
        </section>
    `;
}

export default class ReadLater extends Component {
    constructor({ element, state, application }) {
        super({ element, state, application, register: false })
    }

    renderer() {
        const index = this.state.index;
        const saved = this.application.state.saved[index];
        this.htmlElement.innerHTML = template(index, saved);
        bindRemoveButton(this.htmlElement, index, this.application);
    }
}