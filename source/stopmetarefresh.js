var options = {};

// オプション設定値を取得
chrome.extension.sendRequest({StopMetaRefresh: 'getOptions'}, function(response) {
    options['urltype'] = response.urltype;
    options['urls'] = response.urls;

    if (checkUrl()) execStopMetaRefresh();
});

// 実行対象のURLかどうか
function checkUrl() {
    var returnValue = (options['urltype'] == 'exclude');
    var urls = options['urls'].split("\n");

    for (var i = 0; i < urls.length; i++) {
        if ((urls[i] != '') && (document.URL.indexOf(urls[i]) >= 0)) {
            returnValue = !returnValue;
            break;
        }
    }

    return returnValue;
}

// refresh があったら削除して再表示
function execStopMetaRefresh() {
    var metaTags = document.getElementsByTagName('meta');
    var refAttr;
    for (var i in metaTags) {
        if (metaTags[i].getAttribute) {
            refAttr = metaTags[i].getAttribute('http-equiv');
            if ((refAttr) && (refAttr.toLowerCase() == 'refresh')) {
                chrome.extension.sendMessage({isRefresh: true});
                disableMetaRefresh(this, this.XMLHttpRequest);
                break;
            }
        }
    }
}
