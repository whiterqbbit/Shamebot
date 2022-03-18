console.log("service worker running");

//Initialisation de la defaultBlocklist :
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.get(["defaultBlocklist"], function (result) {
    let defaultBlocklist = result.defaultBlocklist ?? [];
    const url = chrome.runtime.getURL("./defaultBlocklist.json");
    fetch(url)
      .then((response) => response.json())
      .then((json) => MiseAJour(json, defaultBlocklist));

    function MiseAJour(urls: string[], defaultBlocklist: string[]) {
      console.log(urls);
      urls.forEach((e) => {
        defaultBlocklist.push(e);
      });
      defaultBlocklist = [...new Set(defaultBlocklist)];
      chrome.storage.local.set(
        { defaultBlocklist: defaultBlocklist },
        function () {
          console.log(
            "Value 89 for instance is set to " + defaultBlocklist[89]
          );
        }
      );
    }
  });
  chrome.storage.sync.get(["visitCount"], (res) => {
    if (res.visitCount === 0) {
      chrome.storage.sync.set({
        blockingType: 0,
        aiFiltering: true,
        visitCount: 0,
        dayCounter: false,
        dayCounterValue: 0,
        dayElapsed: 0,
        startDayCounter: 164752777444,
        noseEggUnlock: false,
        lastPactDate: 1647527774447,
      });
    }
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.greeting === "hello") console.log("5/5 houston");
  chrome.storage.sync.get(["dayElapsed"], (res) =>{
    let dayElapsed = res.dayElapsed
    chrome.action.setBadgeBackgroundColor({ color: [51, 51, 153, 255] });
    chrome.action.setBadgeText({ text: String(dayElapsed) });
  })
  sendResponse({ farewell: "5/5 flubi" });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message == "closeIt") {
    console.log("Received order to close you !");
    // @ts-expect-error I promise I will learn ts later
    chrome.tabs.remove(sender.tab.id);
  }
});
