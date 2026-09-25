const ZEN_KEY = 'habr-hide.zen-mode.value';
const ZEN_CLASS = 'habr-zen';

function apply(zen) {
  document.documentElement.classList.toggle(ZEN_CLASS, zen);
}

chrome.storage.sync.get(ZEN_KEY).then((data) => apply(data[ZEN_KEY] ?? true));

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && ZEN_KEY in changes) apply(changes[ZEN_KEY].newValue);
});
