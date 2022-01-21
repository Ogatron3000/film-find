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
    form.addEventListener('submit', (e) => submitSearch(e, search));
}

function setFocus(search) {
    search.focus();
}

function toggleClear(search, clear) {
    if (clear.classList.contains('hidden')) {
        clear.classList.remove('hidden');
    } else if (search.value === '' && !clear.classList.contains('hidden')) {
        clear.classList.add('hidden');
    }
}

function addTooltip(e, text) {
    const tooltip = document.createElement('div');
    tooltip.innerText = text;
    tooltip.classList.add('tooltip');
    e.target.appendChild(tooltip);
}

function removeTooltip() {
    document.querySelector('.tooltip').remove();
}

function clearSearch(search, clear) {
    search.value = '';
    clear.classList.add('hidden');
    setFocus(search);
}

function clickDivOnEnterOrSpace(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.target.click();
    }
}

function submitSearch(e, search) {
    e.preventDefault();
    console.log(search.value);
    setFocus(search);
}
