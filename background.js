let contexts = ["image"];
chrome.contextMenus.create({
	"title": "Yandex reverse image search (similar)",
	"contexts": contexts,
	"onclick": function(info, tab) {
		//let to_url=(typeof info.linkUrl === 'undefined')?info.srcUrl:info.linkUrl;
			chrome.tabs.create({
				"url": 'https://yandex.com/images/search?url='+info.srcUrl+'&rpt=imagelike',
				"windowId": tab.windowId,
				"active": false
			}, function(tab) {});

	}
});

chrome.contextMenus.create({
	"title": "Yandex reverse image search (search)",
	"contexts": contexts,
	"onclick": function(info, tab) {
		//let to_url=(typeof info.linkUrl === 'undefined')?info.srcUrl:info.linkUrl;
			chrome.tabs.create({
				"url": 'https://yandex.com/images/search?url='+info.srcUrl+'&rpt=imageview',
				"windowId": tab.windowId,
				"active": false
			}, function(tab) {});

	}
});