import Component from './Component';

function createOnChange(application) {
    return event => {
        application.state.searchOptions.page = event.target.value;
        application.search();
    }
}

export default class Pagination extends Component {
    constructor({ element, state, application }) {
        super({ element, state, application });
        this.htmlElement.addEventListener('change', createOnChange(application));
    }

    renderer() {
        let html = '';
        for(var index=1;index<=this.application.state.pageCount; index++) {
            html+=`<option value="${index}">${index}</option>`
        }
        this.htmlElement.innerHTML = html;
        this.htmlElement.value = this.application.state.searchOptions.page;
    }
}