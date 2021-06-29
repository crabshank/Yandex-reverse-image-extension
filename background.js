function getUrl(tab) {
	return (tab.url == "" && !!tab.pendingUrl && typeof tab.pendingUrl !== 'undefined' && tab.pendingUrl != '') ? tab.pendingUrl : tab.url;
}
self.addEventListener('fetch', event => {
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
});
