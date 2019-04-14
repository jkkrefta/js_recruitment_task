import Component from './Component';

function createOnClick(index, application) {
    return event => {
        application.saveArticle(index);
    }
}

function bindReadLaterButton(htmlElement, index, application) {
    htmlElement.querySelector(`#article${index} > .newsActions > .button.button-outline`).addEventListener('click', createOnClick(index, application));
}

function template(index, { header, sectionName, publicationDate, url}) {
    return `
        <article id="article${index}" class="news">
        <header>
            <h3>${header}</h3>
        </header>
        <section class="newsDetails">
            <ul>
                <li><strong>Section Name:</strong> ${sectionName}</li>
                <li><strong>Publication Date:</strong> ${publicationDate}</li>
            </ul>
        </section>
        <section class="newsActions">
            <a href="${url}" class="button">Full article</a>
            <button class="button button-outline">Read Later</button>
        </section>
        </article>
    `;
}

export default class Article extends Component {
    constructor ({ element, state, application }) {
        super({ element, state, application, register: false });
    }

    renderer() {
        const index = this.state.index;
        const content = this.application.state.articles[index];
        this.htmlElement.innerHTML = template(index, content);
        bindReadLaterButton(this.htmlElement, index, this.application);
    }
};