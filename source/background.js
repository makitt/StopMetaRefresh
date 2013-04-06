// オプション設定値を返す
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        if (request.StopMetaRefresh == 'getOptions') {
            if ((localStorage['urltype']) && (localStorage['urls'])) {
                sendResponse({
                    urltype: localStorage['urltype'],
                    urls: localStorage['urls']
                });
            } else {
                sendResponse({
                    urltype: 'exclude',
                    urls: ''
                });
            }

        } else {
            sendResponse({});
        }
  }
);

// Refresh を Stop した場合アイコンを表示
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.isRefresh == true){
            chrome.pageAction.show(sender.tab.id);
        }
    }
);
