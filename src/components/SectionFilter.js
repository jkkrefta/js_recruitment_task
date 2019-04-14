import Component from './Component';

function createOnChange(application) {
    return event => {
        application.state.searchOptions.section = event.target.value;
        application.state.searchOptions.page = 1;
        application.search();
    }
}

export default class SectionFilter extends Component {
    constructor({ element, state, application }) {
        super({ element, state, application });
        this.htmlElement.addEventListener('change', createOnChange(application));
    }

    renderer() {
        this.htmlElement.value = this.application.state.searchOptions.section;
    }
}