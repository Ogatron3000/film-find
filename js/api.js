export async function getMovies(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=***REMOVED***&language=en-US&query=${query}&page=1&include_adult=false`;
    try {
        let response = await fetch(url);
        let { results } = await response.json();
        return results;
    } catch (err) {
        console.log(err);
    }
}

export function displayNoResults(searchResults) {
    showSearchResults(searchResults);
    searchResults.innerText = '';
    searchResults.innerText = 'Search didn\'t return any results.'
}

export function displayMovies(movies, searchResults) {
    showSearchResults(searchResults);
    searchResults.innerText = '';
    movies = sortMovies(movies);
    movies.forEach(movie => {
        const text = createMovieText(movie);
        const poster = createMoviePoster(movie);
        const wrapper = createMovieWrapper(text, poster);
        searchResults.appendChild(wrapper);
        searchResults.appendChild(wrapper);
    })
}

function showSearchResults(searchResults) {
    if (searchResults.classList.contains('hidden')) {
        searchResults.classList.remove('hidden');
    }
}

function sortMovies(movies) {
    return movies.sort(function (x, y) {
        if (x.vote_count > y.vote_count) {
            return -1;
        }
        if (x.vote_count < y.vote_count) {
            return 1;
        }
        return 0;
    });
}

function createMovieText(movie) {
    const title = create('h3');
    title.innerText = movie.original_title;
    const date = create('i');
    date.innerText = movie.release_date;
    const heading = create('div');
    heading.append(title, date);
    const overview = create('p');
    overview.innerText = movie.overview;
    const text = create('div');
    text.classList.add('film-text');
    text.append(heading, overview);
    return text;
}

function createMoviePoster(movie) {
    const poster = create('img');
    poster.src = movie.poster_path ? 'https://image.tmdb.org/t/p/w154' + movie.poster_path : 'https://via.placeholder.com/154x231.png?text=Film+Find';
    poster.alt = movie.poster_path ? movie.original_title + ' poster.' : 'Poster not available.';
    poster.classList.add('film-poster');
    return poster;
}

function createMovieWrapper(text, poster) {
    const wrapper = create('div');
    wrapper.classList.add('film-wrapper');
    wrapper.append(poster, text);
    return wrapper;
}

// Create DOM element helper
function create(element) {
    return document.createElement(element);
}
