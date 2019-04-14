function createOnChangeHandler(application) {
    return event => {
        application.state.text = event.target.value;
        application.state.searchOptions.page = 1;
        application.search();
    }
}

export default function ({ element, application }) {
    element.addEventListener('change', createOnChangeHandler(application));
}