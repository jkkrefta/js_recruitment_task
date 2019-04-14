import Component from './Component';

function createOnChangeHandler(application) {
    return event => {
        application.state.searchOptions.page = event.target.value;
        application.search();
    }
}

function template(pageCount) {
    let html = '';
    for(var index=1; index <= pageCount; index++) {
        html += `<option value="${index}">${index}</option>`;
    }
    return html;
}

export default class Pagination extends Component {
    constructor({ element, state, application }) {
        super({ element, state, application });
        this.htmlElement.addEventListener('change', createOnChangeHandler(application));
    }

    renderer() {
        this.htmlElement.innerHTML = template(this.application.state.pageCount);
        this.htmlElement.value = this.application.state.searchOptions.page;
    }
}