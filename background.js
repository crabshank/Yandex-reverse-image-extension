try{
var lifeline;

keepAlive();

chrome.runtime.onConnect.addListener((port)=> {
  if (port.name === 'keepAlive') {
    lifeline = port;
    setTimeout(keepAliveForced, 295e3); // 5 minutes minus 5 seconds	
    port.onDisconnect.addListener(keepAliveForced);
  }
});

function keepAliveForced() {
  lifeline?.disconnect();
  lifeline = null;
  keepAlive();
}

async function keepAlive() {
 if (!!lifeline) return;
  for (var tab of await chrome.tabs.query({ url:"*://*/*"})) {
    try {
							chrome.scripting.executeScript({
								  target: {tabId: tab.id, allFrames: true},
								  files: ['port_connect.js'],
								}, () => {});
	  console.log(lifeline);
      chrome.tabs.onUpdated.removeListener(retryOnTabUpdate);
	  chrome.tabs.onReplaced.addListener(retryOnTabUpdate2);
	  chrome.tabs.onRemoved.addListener(retryOnTabUpdate3);
      return;
    } catch (e) {;}
  }
  chrome.tabs.onUpdated.addListener(retryOnTabUpdate);
	  chrome.tabs.onReplaced.addListener(retryOnTabUpdate2);
	  chrome.tabs.onRemoved.addListener(retryOnTabUpdate3);
}

async function retryOnTabUpdate(tabId, info, tab) {
  if (info.url) {
    keepAlive();
  }
}
async function retryOnTabUpdate2(addedTabId, removedTabId) {
    keepAlive();
}
async function retryOnTabUpdate3(tabId, removeInfo) {
    keepAlive();
}
	/*Source: https://stackoverflow.com/a/66618269 - wOxxOm*/
	
}catch(e){;}

try {

let todo=true;

function handleMessage(request, sender, sendResponse) {
	
if(todo){	
let contexts = ["image"];
chrome.contextMenus.create({
	"title": "Yandex reverse image search (similar)",
	"contexts": contexts,
	"id":"sim"
})

chrome.contextMenus.create({
	"title": "Yandex reverse image search (search)",
	"contexts": contexts,
	"id":"srch"
});


chrome.contextMenus.onClicked.addListener((info,tab) => {
	if(info.menuItemId=="sim"){
			chrome.tabs.create({
				"url": 'https://yandex.com/images/search?url='+info.srcUrl+'&rpt=imagelike',
				"windowId": tab.windowId,
				"active": false
			}, function(tab) {});
	}else if(info.menuItemId=="srch"){
		chrome.tabs.create({
				"url": 'https://yandex.com/images/search?url='+info.srcUrl+'&rpt=imageview',
				"windowId": tab.windowId,
				"active": false
			}, function(tab) {});
	}

});
todo=false;
}
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
 handleMessage(request, sender, sendResponse);
 return true;
});

} catch (e) {
  console.error(e);
}