import WebsitePortalApi from 'website-portal-api';
import storage from '../ext/storage';

const platform = 'chrome'; // TODO

const api = new WebsitePortalApi();

global.api = api;
global.storage = storage;

api.connect()
  .catch(console.error)
  .then(async () => {
    const portal = storage.get('portal');
    if (portal) {
      try {
        await api.login(portal.id, portal.token);
      } catch (error) {
        console.warn(error);
      }
    }
  });

function sendWebsite(id, url, sendResponse) {
  api.sendUrl(id, url)
    .then(() => {
      sendResponse({ error: null });
    })
    .catch((error) => {
      sendResponse({ error: error.message });
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  if (request.type === 'isLoggedIn') {
    sendResponse({ body: api.loggedIn, error: null });
    return false;
  } if (request.type === 'register') {
    api.register(platform, request.name)
      .then((newPortal) => {
        api.login(newPortal.id, newPortal.token)
          .then(() => {
            storage.set('portal', newPortal);
            sendResponse({ error: null });
          })
          .catch((error) => {
            sendResponse({ error: error.message });
          });
      })
      .catch((error) => {
        sendResponse({ error: error.message });
      });
    return true;
  } if (request.type === 'getName') {
    api.getName()
      .then((name) => {
        sendResponse({ body: name, error: null });
      })
      .catch((error) => {
        sendResponse({ body: null, error: error.message });
      });
    return true;
  } if (request.type === 'rename') {
    api.rename(request.name)
      .then(() => {
        sendResponse({ error: null });
      })
      .catch((error) => {
        sendResponse({ error: error.message });
      });
    return true;
  } if (request.type === 'getPairingCode') {
    api.getPairingCode()
      .then((pairingCode) => {
        sendResponse({ body: pairingCode, error: null });
      })
      .catch((error) => {
        sendResponse({ body: null, error: error.message });
      });
    return true;
  } if (request.type === 'getPairedPortalsData') {
    api.getPairedPortalsData()
      .then((data) => {
        console.log(data);
        sendResponse({ body: data, error: null });
      })
      .catch((error) => {
        sendResponse({ body: null, error: error.message });
      });
    return true;
  } if (request.type === 'pair') {
    api.pair(request.code)
      .then(() => {
        sendResponse({ error: null });
      })
      .catch((error) => {
        sendResponse({ error: error.message });
      });
    return true;
  } if (request.type === 'sendWebsite') {
    if (request.url) {
      sendWebsite(request.id, request.url, sendResponse);
    } else {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        sendWebsite(request.id, tabs[0].url, sendResponse);
      });
    }

    return true;
  }
});

api.onUrl((url) => {
  chrome.tabs.create({ url });
});
