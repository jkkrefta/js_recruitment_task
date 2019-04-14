function fetchNews(text, { apiKey, section, fromDate, toDate, page = 1 }) {
    const optionalSection = section === '' || section === 'all' ? '': `&section=${section}`;
    const optionalText = text ? `&q=${text}`: '';
    const query = `https://content.guardianapis.com/search?from-date=${fromDate}&to-date=${toDate}&page=${page}${optionalSection}${optionalText}&api-key=${apiKey}`;
    return fetch(query, {
        mode: 'cors',
    })
    .then(response => {
        return response.json();
    });
};

export default class Application {
    constructor() {
        this.components = [];
        this.state = {
            text: '',
            searchOptions: {
                section: '',
                fromDate: '2019-04-01',
                toDate: '2019-04-30',
                page: 1,
                apiKey: 'b083ec8f-45c1-40e2-99b4-ddc95c6285aa'
            },
            pageCount: 0,
            articles: [],
            saved: []
        };
    }

    registerComponent(component) {
        this.components.push(component);
    }

    updateComponents() {
        this.components.forEach(component => {
            component.renderer ? component.renderer(): () => {};
        });
    }

    search() {
        const self = this;
        fetchNews(this.state.text, this.state.searchOptions).then(response => {
            const results = response.response.results.map(data => {
                return {
                    header: data.webTitle,
                    sectionName: data.sectionName,
                    publicationDate: data.webPublicationDate,
                    url: data.webUrl
                };
            });

            self.state.pageCount = response.response.pages;
            self.state.articles = results;
            self.updateComponents();
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
        this.updateComponents();
    }

    removeArticle(index) {
        this.state.saved.splice(index, 1);
        this.saveToLocalStorage();
        this.updateComponents();
    }
}