import { setFocus, toggleClear, addTooltip, removeTooltip, clearSearch, clickDivOnEnterOrSpace } from './searchBar.js';
import {getMovies, displayNoResults, displayMovies } from './api.js';

document.addEventListener('readystatechange', (e) => {
    if (document.readyState === 'complete') {
        initApp();
    }
})

function initApp() {
    const form = document.querySelector('form');
    const search = document.querySelector('#search');
    const clear = document.querySelector('#clear');
    const button = document.querySelector('button');
    const searchResults = document.querySelector('#search-results');

    // Add shadow to form when input is focused
    search.addEventListener('focus', () => form.classList.add('shadow'));
    search.addEventListener('blur', () => form.classList.remove('shadow'));

    // Focus input on page load
    setFocus(search);

    // Show Clear button on input
    search.addEventListener('input', () => toggleClear(search, clear));

    // Show tooltip for Clear and Search buttons
    clear.addEventListener('mouseenter', (e) => addTooltip(e, 'Clear'));
    clear.addEventListener('mouseleave', removeTooltip);
    clear.addEventListener('focus', (e) => addTooltip(e, 'Clear'));
    clear.addEventListener('blur', removeTooltip);
    button.addEventListener('mouseenter', (e) => addTooltip(e, 'Search'));
    button.addEventListener('mouseleave', removeTooltip);
    button.addEventListener('focus', (e) => addTooltip(e, 'Search'));
    button.addEventListener('blur', removeTooltip);

    // Buttons actions
    clear.addEventListener('click', () => clearSearch(search, clear));
    clear.addEventListener('keyup', (e) => clickDivOnEnterOrSpace(e));
    form.addEventListener('submit', (e) => submitSearch(e, search, searchResults));
}

async function submitSearch(e, search, searchResults) {
    e.preventDefault();
    if (search.value === '') return;
    let movies = await getMovies(search.value);
    if (movies.length === 0) {
        displayNoResults(searchResults);
        return;
    }
    displayMovies(movies, searchResults);
    setFocus(search);
}
