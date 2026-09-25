const ZEN_KEY = 'habr-hide.zen-mode.value';

async function isZen() {
  const data = await chrome.storage.sync.get(ZEN_KEY);
  return data[ZEN_KEY] ?? false;
}

async function updateBadge() {
  const zen = await isZen();
  await chrome.action.setBadgeText({ text: zen ? 'ZEN' : '' });
  await chrome.action.setBadgeBackgroundColor({ color: '#548e9b' });
}

async function toggleZen() {
  await chrome.storage.sync.set({ [ZEN_KEY]: !(await isZen()) });
}

chrome.action.onClicked.addListener(toggleZen);

chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-zen') toggleZen();
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && ZEN_KEY in changes) updateBadge();
});

chrome.runtime.onInstalled.addListener(updateBadge);
chrome.runtime.onStartup.addListener(updateBadge);
