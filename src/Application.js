import { noop } from './helpers';

function fetchNews(text, { apiKey, section, fromDate, toDate, page = 1 }) {
    const optionalSection = section === '' || section === 'all' ? '': `&section=${section}`;
    const optionalText = text ? `&q=${text}`: '';
    const query = `https://content.guardianapis.com/search?from-date=${fromDate}&to-date=${toDate}&page=${page}${optionalSection}${optionalText}&api-key=${apiKey}`;
    return fetch(query, { mode: 'cors' }).then(response => response.json());
};

function mapNewsToArticles(news) {
    return {
        header: news.webTitle,
        sectionName: news.sectionName,
        publicationDate: news.webPublicationDate,
        url: news.webUrl
    };
}

function createFromDate() {
    const now = new Date(Date.now());
    return new Date(now.setMonth(now.getUTCMonth() -1));
}

export default class Application {
    constructor(config) {
        this.components = [];
        this.state = {
            text: '',
            searchOptions: {
                section: '',
                fromDate: createFromDate().toISOString(),
                toDate: new Date(Date.now()).toISOString(),
                page: 1,
                apiKey: config['the guardian']['api-key']
            },
            pageCount: 0,
            articles: [],
            saved: []
        };
    }

    registerComponent(component) {
        this.components.push(component);
    }

    rerenderComponents() {
        this.components.forEach(component => {
            component.renderer ? component.renderer(): noop();
        });
    }

    search() {
        const self = this;
        fetchNews(this.state.text, this.state.searchOptions).then(news => {
            self.state.pageCount = news.response.pages;
            self.state.articles = news.response.results.map(mapNewsToArticles);
            self.rerenderComponents();
        });
    }

    saveToLocalStorage() {
        localStorage.setItem('saved', JSON.stringify(this.state.saved));
    }

    restoreFromLocalStorage() {
        const saved = localStorage.getItem('saved');
        this.state.saved = JSON.parse(saved);
    }

    saveArticle(index) {
        this.state.saved.push(this.state.articles[index]);
        this.saveToLocalStorage();
        this.rerenderComponents();
    }

    removeArticle(index) {
        this.state.saved.splice(index, 1);
        this.saveToLocalStorage();
        this.rerenderComponents();
    }
}