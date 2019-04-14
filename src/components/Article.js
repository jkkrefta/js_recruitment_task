import Component from './Component';

function createOnClick(index, application) {
    return event => {
        application.saveArticle(index);
    }
}

export default class Article extends Component {
    renderer() {
        const content = this.application.state.articles[this.state.index];
        if (!content) {
            this.htmlElement.innerHTML = '';
            return;
        }

        this.htmlElement.innerHTML = `
            <article id="article${this.state.index}" class="news">
            <header>
                <h3>${content.header || ''}</h3>
            </header>
            <section class="newsDetails">
                <ul>
                    <li><strong>Section Name:</strong> ${content.sectionName || ''}</li>
                    <li><strong>Publication Date:</strong> ${content.publicationDate || ''}</li>
                </ul>
            </section>
            <section class="newsActions">
                <a href="${content.url || ''}" class="button">Full article</a>
                <button class="button button-outline">Read Later</button>
            </section>
            </article>
        `;
        
        const button = this.htmlElement.querySelector(`#article${this.state.index} > .newsActions > .button.button-outline`);
        button.addEventListener('click', createOnClick(this.state.index, this.application));
    }
};