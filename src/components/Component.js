export default class Component {
    constructor({ element, state, application, register = true }) {
        this.htmlElement = element;
        this.state = state || {};
        this.application = application;
        register ? application.registerComponent(this): () => {};
    }
};