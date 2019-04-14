import './styles/main.css';
import NewsList from './components/NewsList';
import SectionFilter from './components/SectionFilter';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import ReadLaterList from './components/ReadLaterList';
import Application from './Application';
import config from './appconfig.json';

const application = new Application(config);
new NewsList({ element: document.getElementsByClassName('newsList')[0], application });
new SectionFilter({ element: document.getElementById('sectionSelect'), application });
new SearchBar({ element: document.getElementById('newsContentSearch'), application });
new Pagination({ element: document.getElementById('activePageSelect'), application });
new ReadLaterList({ element: document.getElementsByClassName('readLaterList')[0], application });
application.restoreFromLocalStorage();
application.search('');
