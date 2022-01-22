export function setFocus(search) {
    search.focus();
}

export function toggleClear(search, clear) {
    if (clear.classList.contains('hidden')) {
        clear.classList.remove('hidden');
    } else if (search.value === '' && !clear.classList.contains('hidden')) {
        clear.classList.add('hidden');
    }
}

export function addTooltip(e, text) {
    const tooltip = document.createElement('div');
    tooltip.innerText = text;
    tooltip.classList.add('tooltip');
    e.target.appendChild(tooltip);
}

export function removeTooltip() {
    document.querySelector('.tooltip').remove();
}

export function clearSearch(search, clear) {
    search.value = '';
    clear.classList.add('hidden');
    setFocus(search);
}

export function clickDivOnEnterOrSpace(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.target.click();
    }
}