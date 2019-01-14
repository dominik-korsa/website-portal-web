/* eslint-disable no-unused-vars */
const portalObject = {
  pairingCode: null,
  name: null,
};

export default class BackgroundConnector {
  static isLoggedIn() {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type: 'isLoggedIn' }, (response) => {
        resolve(response.body);
      });
    });
  }

  static register(name) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type: 'register', name }, (response) => {
        if (response && response.error) {
          reject(new Error(response.error));
          return;
        }
        resolve();
      });
    });
  }

  static getPortals() {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type: 'getPairedPortalsData' }, (response) => {
        if (response.error) {
          reject(new Error(response.error));
          return;
        }
        const data = response.body.map(e => ({
          name: e.name,
          active: e.online,
          id: e.id,
          platform: e.platform,
        }));
        console.log(data);
        resolve(data);
      });
    });
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve([
    //       // {
    //       //   name: 'Portal #1', active: Math.random() <= 0.5, id: 'p001', platform: 'android',
    //       // },
    //       // {
    //       //   name: 'Portal #2', active: Math.random() <= 0.5, id: 'p002', platform: 'android',
    //       // },
    //       // {
    //       //   name: 'Portal #3', active: Math.random() <= 0.5, id: 'p003', platform: 'chrome',
    //       // },
    //       // {
    //       //   name: 'Portal #4', active: Math.random() <= 0.5, id: 'p004', platform: 'chrome',
    //       // },
    //       // {
    //       //   name: 'Portal #5', active: Math.random() <= 0.5, id: 'p005', platform: 'opera',
    //       // },
    //       // {
    //       //   name: 'Portal #6', active: Math.random() <= 0.5, id: 'p006', platform: 'opera',
    //       // },
    //       // {
    //       //   name: 'Portal #7', active: Math.random() <= 0.5, id: 'p007', platform: 'firefox',
    //       // },
    //       // {
    //       //   name: 'Portal #8', active: Math.random() <= 0.5, id: 'p008', platform: 'firefox',
    //       // },
    //       // {
    //       //   name: 'Portal #9', active: Math.random() <= 0.5, id: 'p009', platform: 'ios',
    //       // },
    //       // {
    //       //   name: 'Portal #10', active: Math.random() <= 0.5, id: 'p010', platform: 'ios',
    //       // },
    //       // {
    //       //   name: 'Portal #11', active: Math.random() <= 0.5, id: 'p011', platform: 'safari',
    //       // },
    //       // {
    //       //   name: 'Portal #12', active: Math.random() <= 0.5, id: 'p012', platform: 'safari',
    //       // },
    //     ]);
    //     // reject(new Error("I won't do that! Why did you think I would?"))
    //   }, 250);
    // });
  }

  static get portalObject() {
    return portalObject;
  }

  static updatePairingCode() {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type: 'getPairingCode' }, (response) => {
        if (response.error) {
          reject(new Error(response.error));
          return;
        }
        portalObject.pairingCode = response.body;
        resolve();
      });
    });
  }

  static updateName() {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type: 'getName' }, (response) => {
        if (response.error) {
          reject(new Error(response.error));
          return;
        }
        portalObject.name = response.body;
        resolve();
      });
    });
  }

  static setOwnName(name) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type: 'rename', name }, (response) => {
        if (response && response.error) {
          reject(new Error(response.error));
          return;
        }
        portalObject.name = name;
        resolve();
      });
    });
  }

  static pair(code) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type: 'pair', code }, (response) => {
        if (response && response.error) {
          reject(new Error(response.error));
          return;
        }
        resolve();
      });
    });
  }

  static sendWebsite(id, url) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type: 'sendWebsite', id, url }, (response) => {
        if (response && response.error) {
          reject(new Error(response.error));
          return;
        }
        resolve();
      });
    });
  }
}
