// ==UserScript==
// @name Disable meta refresh
// @version 1.00
// @description Disables meta refresh.
// @namespace http://stackoverflow.com/questions/3252743/using-javascript-to-override-or-disable-meta-refresh-tag/13656851#13656851
// @copyright 2012
// @author XP1
// @homepage https://github.com/XP1/
// @license Apache License, Version 2.0; http://www.apache.org/licenses/LICENSE-2.0
// @include http*://example.com/*
// @include http*://*.example.com/*
// ==/UserScript==

/*
 * Copyright 2012 XP1
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*jslint browser: true, vars: true, maxerr: 50, indent: 4 */

// 2013/01/20 Function name has been granted. modified by makitt
// No change to the terms and conditions of license and usage.

function disableMetaRefresh(window, XMLHttpRequest) {
    "use strict";

    if (window.self !== window.top) {
        return;
    }

    window.stop();

    var uri = window.location.href;

    var request = new XMLHttpRequest();
    request.open("GET", uri, false);
    request.send(null);

    if (!(request.readyState === 4 && request.status === 200)) {
        return;
    }

    var markup = request.responseText;
    markup = markup.replace(/<meta http-equiv="refresh".*\/?>/gi, "");

    var document = window.document;
    document.open();
    document.write(markup);
    document.close();
}

