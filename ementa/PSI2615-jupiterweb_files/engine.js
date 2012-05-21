


















if (window['dojo']) dojo.provide('dwr.engine');
if (typeof window['dwr'] == 'undefined') {
dwr = { };
}

(function() {
dwr.engine = { };






dwr.engine.setErrorHandler = function(handler) {
dwr.engine._errorHandler = handler;
};






dwr.engine.setWarningHandler = function(handler) {
dwr.engine._warningHandler = handler;
};






dwr.engine.setTextHtmlHandler = function(handler) {
dwr.engine._textHtmlHandler = handler;
};






dwr.engine.setTimeout = function(timeout) {
dwr.engine._timeout = timeout;
};






dwr.engine.setPreHook = function(handler) {
dwr.engine._preHook = handler;
};






dwr.engine.setPostHook = function(handler) {
dwr.engine._postHook = handler;
};






dwr.engine.setHeaders = function(headers) {
dwr.engine._headers = headers;
};






dwr.engine.setParameters = function(parameters) {
dwr.engine._parameters = parameters;
};






dwr.engine.setOrdered = function(ordered) {
dwr.engine._ordered = ordered;
};








dwr.engine.setAsync = function(async) {
dwr.engine._async = async;
};






dwr.engine.setActiveReverseAjax = function(activeReverseAjax) {
if (activeReverseAjax) {

if (dwr.engine._activeReverseAjax) return;
dwr.engine._activeReverseAjax = true;
dwr.engine._poll();
}
else {

if (dwr.engine._activeReverseAjax && dwr.engine._pollReq) {
dwr.engine._pollReq.abort();
}
dwr.engine._activeReverseAjax = false;
}



};






dwr.engine.setNotifyServerOnPageUnload = function(notify) {
dwr.engine._isNotifyServerOnPageUnload = notify;
};







dwr.engine.defaultErrorHandler = function(message, ex) {
dwr.engine._debug("Error: " + ex.name + ", " + ex.message, true);
if (message == null || message == "") alert("A server error has occurred.");

else if (message.indexOf("0x80040111") != -1) dwr.engine._debug(message);
else alert(message);
};







dwr.engine.defaultWarningHandler = function(message, ex) {
dwr.engine._debug(message);
};





dwr.engine.beginBatch = function() {
if (dwr.engine._batch) {
dwr.engine._handleError(null, { name:"dwr.engine.batchBegun", message:"Batch already begun" });
return;
}
dwr.engine._batch = dwr.engine.batch.create();
};






dwr.engine.endBatch = function(options) {
var batch = dwr.engine._batch;
if (batch == null) {
dwr.engine._handleError(null, { name:"dwr.engine.batchNotBegun", message:"No batch in progress" });
return;
}
dwr.engine._batch = null;
if (batch.map.callCount == 0) {
return;
}


if (options) {
dwr.engine.batch.merge(batch, options);
}


if (dwr.engine._ordered && dwr.engine._batchesLength != 0) {
dwr.engine._batchQueue[dwr.engine._batchQueue.length] = batch;
}
else {
return dwr.engine.transport.send(batch);
}
};






dwr.engine.openInDownload = function(data) {
var div = document.createElement("div");
document.body.appendChild(div);
div.innerHTML = "<iframe width='0' height='0' scrolling='no' frameborder='0' src='" + data + "'></iframe>";
};















dwr.version = {



major:parseInt("3"),




minor:parseInt("0"),




revision:parseInt("0"),




build:parseInt("116"),





title:"rc1",




label:"3.0.0.116.rc1"
};






dwr.engine._sessionCookieName = "JSESSIONID";


dwr.engine._allowGetForSafariButMakeForgeryEasier = "false";


dwr.engine._scriptTagProtection = "throw 'allowScriptTagRemoting is false.';";


dwr.engine._pathToDwrServlet = "/jupiterweb/dwr";


dwr.engine._pollWithXhr = "false";


dwr.engine._ModePlainCall = "/call/plaincall/";
dwr.engine._ModePlainPoll = "/call/plainpoll/";
dwr.engine._ModeHtmlCall = "/call/htmlcall/";
dwr.engine._ModeHtmlPoll = "/call/htmlpoll/";


dwr.engine._async = Boolean("true");


dwr.engine._scriptSessionId = null;


dwr.engine._preHook = null;


dwr.engine._postHook = null;


dwr.engine._batches = {};


dwr.engine._batchesLength = 0;


dwr.engine._batchQueue = [];



dwr.engine._ordered = true;


dwr.engine._batch = null;


dwr.engine._timeout = 0;


dwr.engine._activeReverseAjax = false;


dwr.engine._pollReq = null;


dwr.engine._pollCometInterval = 200;


dwr.engine._pollRetries = 0;
dwr.engine._maxPollRetries = 10;


dwr.engine._retryIntervals = [ 2, 5, 10, 60, 300 ];


dwr.engine._textHtmlHandler = null;


dwr.engine._headers = null;


dwr.engine._parameters = null;


dwr.engine._nextBatchId = 0;


dwr.engine._propnames = [ "async", "timeout", "errorHandler", "warningHandler", "textHtmlHandler" ];


dwr.engine._partialResponseNo = 0;
dwr.engine._partialResponseYes = 1;
dwr.engine._partialResponseFlush = 2;


dwr.engine._isNotifyServerOnPageUnload = false;






if (typeof dwr.engine['_mappedClasses'] == 'undefined') {
dwr.engine._mappedClasses = {};
}





dwr.engine._getHttpSessionId = function() {

var cookies = document.cookie.split(';');
for (var i = 0; i < cookies.length; i++) {
var cookie = cookies[i];
while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
if (cookie.indexOf(dwr.engine._sessionCookieName + "=") == 0) {
return cookie.substring(dwr.engine._sessionCookieName.length + 1, cookie.length);
}
}
return "";
};


dwr.engine._errorHandler = dwr.engine.defaultErrorHandler;


dwr.engine._warningHandler = dwr.engine.defaultWarningHandler;


dwr.engine._postSeperator = "\n";
dwr.engine._defaultInterceptor = function(data) { return data; };
dwr.engine._urlRewriteHandler = dwr.engine._defaultInterceptor;
dwr.engine._contentRewriteHandler = dwr.engine._defaultInterceptor;
dwr.engine._replyRewriteHandler = dwr.engine._defaultInterceptor;


dwr.engine._unloading = false;


dwr.engine._unloader = function() {
dwr.engine._unloading = true;


dwr.engine._batchQueue.length = 0;


var batch;
for (var batchId in dwr.engine._batches) {
batch = dwr.engine._batches[batchId];

if (batch && batch.map) {
if (batch.req) {
batch.req.abort();
}
}
}


if (dwr.engine._isNotifyServerOnPageUnload) {
dwr.engine._debug("calling unloader for: " + dwr.engine._scriptSessionId);
batch = {
map:{
callCount:1,
'c0-scriptName':'__System',
'c0-methodName':'pageUnloaded',
'c0-id':0
},
paramCount:0, isPoll:false, async:true,
headers:{}, preHooks:[], postHooks:[],
timeout:dwr.engine._timeout,
errorHandler:null, warningHandler:null, textHtmlHandler:null,
path:dwr.engine._pathToDwrServlet,
handlers:[{ exceptionHandler:null, callback:null }]
};
dwr.engine.transport.send(batch);
dwr.engine._isNotifyServerOnPageUnload = false;
}
};


if (!dwr.engine.isJaxerServer) {
if (window.addEventListener) window.addEventListener('unload', dwr.engine._unloader, false);
else if (window.attachEvent) window.attachEvent('onunload', dwr.engine._unloader);
}











dwr.engine._execute = function(path, scriptName, methodName, args) {
var singleShot = false;
if (dwr.engine._batch == null) {
dwr.engine.beginBatch();
singleShot = true;
}

var batch = dwr.engine._batch;

if (batch.path == null) {
batch.path = path;
}
else {
if (batch.path != path) {
dwr.engine._handleError(batch, { name:"dwr.engine.multipleServlets", message:"Can't batch requests to multiple DWR Servlets." });
return;
}
}

dwr.engine.batch.addCall(batch, scriptName, methodName, args);


batch.map.callCount++;
if (singleShot) {
return dwr.engine.endBatch();
}
};





dwr.engine._poll = function() {
if (!dwr.engine._activeReverseAjax) {
return;
}
var batch = dwr.engine.batch.createPoll();
dwr.engine.transport.send(batch);
};






dwr.engine._pollErrorHandler = function(msg, ex) {
if (dwr.engine._pollRetries > dwr.engine._maxPollRetries) {
dwr.engine._activeReverseAjax = false;
dwr.engine._debug("Reverse Ajax poll failed (retries=" + dwr.engine._pollRetries + "). Giving Up: " + ex.name + " : " + ex.message);
dwr.engine._debug("Giving up.");
return;
}

var index = dwr.engine._pollRetries;
if (index >= dwr.engine._retryIntervals.length) {
index = dwr.engine._retryIntervals.length - 1;
}

dwr.engine._debug("Reverse Ajax poll failed (retries=" + dwr.engine._pollRetries + "). Trying again in " + dwr.engine._retryIntervals[index] + "s: " + ex.name + " : " + ex.message);
setTimeout(dwr.engine._poll, 1000 * dwr.engine._retryIntervals[index]);

dwr.engine._pollRetries++;
};


dwr.engine._eval = function(script) {
if (script == null) {
return null;
}
if (script == "") {
dwr.engine._debug("Warning: blank script", true);
return null;
}

return eval(script);
};


dwr.engine._callPostHooks = function(batch) {
if (batch.postHooks) {
for (var i = 0; i < batch.postHooks.length; i++) {
batch.postHooks[i]();
}
batch.postHooks = null;
}
};







dwr.engine._handleError = function(batch, ex) {
if (typeof ex == "string") ex = { name:"unknown", message:ex };
if (ex.message == null) ex.message = "";
if (ex.name == null) ex.name = "unknown";
if (batch && typeof batch.errorHandler == "function") batch.errorHandler(ex.message, ex);
else if (dwr.engine._errorHandler) dwr.engine._errorHandler(ex.message, ex);
if (batch) dwr.engine.batch.remove(batch);
};







dwr.engine._handleWarning = function(batch, ex) {
if (typeof ex == "string") ex = { name:"unknown", message:ex };
if (ex.message == null) ex.message = "";
if (ex.name == null) ex.name = "unknown";
if (batch && typeof batch.warningHandler == "function") batch.warningHandler(ex.message, ex);
else if (dwr.engine._warningHandler) dwr.engine._warningHandler(ex.message, ex);
if (batch) dwr.engine.batch.remove(batch);
};







dwr.engine._debug = function(message, stacktrace) {
var written = false;
try {
if (window.console) {
if (stacktrace && window.console.trace) window.console.trace();
window.console.log(message);
written = true;
}
else if (window.opera && window.opera.postError) {
window.opera.postError(message);
written = true;
}
else if (window.Jaxer && Jaxer.isOnServer) {
Jaxer.Log.info(message);
written = true;
}
}
catch (ex) {   }

if (!written) {
var debug = document.getElementById("dwr-debug");
if (debug) {
var contents = message + "<br/>" + debug.innerHTML;
if (contents.length > 2048) contents = contents.substring(0, 2048);
debug.innerHTML = contents;
}
}
};




dwr.engine.remote = {







handleCallback:function(batchId, callId, reply) {
var batch = dwr.engine._batches[batchId];
if (batch == null) {
dwr.engine._debug("Warning: batch == null in remoteHandleCallback for batchId=" + batchId, true);
return;
}


batch.reply = reply;



try {
var handlers = batch.handlers[callId];
if (!handlers) {
dwr.engine._debug("Warning: Missing handlers. callId=" + callId, true);
}
else {
batch.handlers[callId].completed = true;
if (typeof handlers.callback == "function") {
handlers.callback.apply(handlers.callbackScope, [ reply, handlers.callbackArg ]);
}
}
}
catch (ex) {
dwr.engine._handleError(batch, ex);
}
},






handleFunctionCall:function(id, args) {
var func = dwr.engine.serialize.remoteFunctions[id];
func.apply(window, args);
},






handleObjectCall:function(id, methodName, args) {
var obj = dwr.engine.serialize.remoteFunctions[id];
obj[methodName].apply(obj, args);
},






handleSetCall:function(id, propertyName, data) {
var obj = dwr.engine.serialize.remoteFunctions[id];
obj[propertyName] = data;
},





handleFunctionClose:function(id) {
delete dwr.engine.serialize.remoteFunctions[id];
},








handleException:function(batchId, callId, ex) {
var batch = dwr.engine._batches[batchId];
if (batch == null) {
dwr.engine._debug("Warning: null batch in remoteHandleException", true);
return;
}

var handlers = batch.handlers[callId];
batch.handlers[callId].completed = true;
if (handlers == null) {
dwr.engine._debug("Warning: null handlers in remoteHandleException", true);
return;
}

if (ex.message == undefined) {
ex.message = "";
}

if (typeof handlers.exceptionHandler == "function") {
handlers.exceptionHandler.call(handlers.exceptionScope, ex.message, ex, handlers.exceptionArg);
}
else if (typeof batch.errorHandler == "function") {
batch.errorHandler(ex.message, ex);
}
},







handleBatchException:function(ex, batchId) {
var searchBatch = (dwr.engine._receivedBatch == null && batchId != null);
if (searchBatch) {
dwr.engine._receivedBatch = dwr.engine._batches[batchId];
}
if (ex.message == undefined) ex.message = "";
dwr.engine._handleError(dwr.engine._receivedBatch, ex);
if (searchBatch) {
dwr.engine._receivedBatch = null;
dwr.engine.batch.remove(dwr.engine._batches[batchId]);
}
},





handleNewScriptSession:function(newSessionId) {
if (dwr.engine._scriptSessionId != null) {
dwr.engine._debug("Server side script session id timed out. New session automatically created");
}
dwr.engine._scriptSessionId = newSessionId;
},





handleNewWindowName:function(windowName) {
dwr.engine._debug("Setting new window name: " + windowName);
if (window.name != null && window.name != "") {
dwr.engine._debug("- Warning: This will override existing name of: " + window.name);
}
window.name = windowName;
},






handleForeign:function(windowName, script) {
var foreign = window.open(null, windowName);
if (foreign != null) {
if (foreign.dwr != null) {
foreign.dwr.engine._eval(script);
}
else {
dwr.engine._debug("Found window, but DWR did not exist in it");
}
}
else {
dwr.engine._debug("Could not find window");
}
},







pollCometDisabled:function(ex, batchId){
dwr.engine.setActiveReverseAjax(false);
var searchBatch = (dwr.engine._receivedBatch == null && batchId != null);
if (searchBatch) {
dwr.engine._receivedBatch = dwr.engine._batches[batchId];
}
if (ex.message == undefined) {
ex.message = "";
}
dwr.engine._handleError(dwr.engine._receivedBatch, ex);
if (searchBatch) {
dwr.engine._receivedBatch = null;
dwr.engine.batch.remove(dwr.engine._batches[batchId]);
}
},







newObject:function(dwrClassName, memberMap){
var classfunc = dwr.engine._mappedClasses[dwrClassName];
if (classfunc && classfunc.createFromMap) {
return classfunc.createFromMap(memberMap);
}
else {
memberMap.$dwrClassName = dwrClassName;
return memberMap;
}
}
};




dwr.engine.serialize = {



domDocument:[
"Msxml2.DOMDocument.6.0",
"Msxml2.DOMDocument.5.0",
"Msxml2.DOMDocument.4.0",
"Msxml2.DOMDocument.3.0",
"MSXML2.DOMDocument",
"MSXML.DOMDocument",
"Microsoft.XMLDOM"
],




remoteFunctions:{},




funcId:0,





toDomElement:function(xml) {
return dwr.engine.serialize.toDomDocument(xml).documentElement;
},





toDomDocument:function(xml) {
var dom;
if (window.DOMParser) {
var parser = new DOMParser();
dom = parser.parseFromString(xml, "text/xml");
if (!dom.documentElement || dom.documentElement.tagName == "parsererror") {
var message = dom.documentElement.firstChild.data;
message += "\n" + dom.documentElement.firstChild.nextSibling.firstChild.data;
throw message;
}
return dom;
}
else if (window.ActiveXObject) {
dom = dwr.engine.util.newActiveXObject(dwr.engine.serialize.domDocument);
dom.loadXML(xml);
return dom;
}
else {
var div = document.createElement("div");
div.innerHTML = xml;
return div;
}
},









convert:function(batch, referto, data, name, depth) {
if (data == null) {
batch.map[name] = "null:null";
return;
}

switch (typeof data) {
case "boolean":
batch.map[name] = "boolean:" + data;
break;
case "number":
batch.map[name] = "number:" + data;
break;
case "string":
batch.map[name] = "string:" + encodeURIComponent(data);
break;
case "object":
var ref = dwr.engine.serialize.lookup(referto, data, name);
var objstr = Object.prototype.toString.call(data);
if (data.$dwrByRef) batch.map[name] = dwr.engine.serialize.convertByReference(batch, referto, data, name, depth + 1);
else if (ref != null) batch.map[name] = ref;
else if (objstr == "[object String]") batch.map[name] = "string:" + encodeURIComponent(data);
else if (objstr == "[object Boolean]") batch.map[name] = "boolean:" + data;
else if (objstr == "[object Number]") batch.map[name] = "number:" + data;
else if (objstr == "[object Date]") batch.map[name] = "date:" + data.getTime();
else if (objstr == "[object Array]") batch.map[name] = dwr.engine.serialize.convertArray(batch, referto, data, name, depth + 1);
else if (data && data.tagName && data.tagName.toLowerCase() == "input" && data.type && data.type.toLowerCase() == "file") {
batch.fileUpload = true;
batch.map[name] = data;
}
else {


if (data.nodeName && data.nodeType) {
batch.map[name] = dwr.engine.serialize.convertXml(batch, referto, data, name, depth + 1);
}
else {
batch.map[name] = dwr.engine.serialize.convertObject(batch, referto, data, name, depth + 1);
}
}
break;
case "function":

if (depth == 0) {
batch.map[name] = dwr.engine.serialize.convertByReference(batch, referto, data, name, depth + 1);
}
break;
default:
dwr.engine._handleWarning(null, { name:"dwr.engine.unexpectedType", message:"Unexpected type: " + typeof data + ", attempting default converter." });
batch.map[name] = "default:" + data;
break;
}
},






convertByReference:function(batch, referto, data, name, depth) {
var funcId = "f" + dwr.engine.serialize.funcId;
dwr.engine.serialize.remoteFunctions[funcId] = data;
dwr.engine.serialize.funcId++;
return "byref:" + funcId;
},






convertArray:function(batch, referto, data, name, depth) {
var childName, i;
if (dwr.engine.isIE <= 7) {

var buf = ["array:["];
for (i = 0; i < data.length; i++) {
if (i != 0) buf.push(",");
batch.paramCount++;
childName = "c" + dwr.engine._batch.map.callCount + "-e" + batch.paramCount;
dwr.engine.serialize.convert(batch, referto, data[i], childName, depth + 1);
buf.push("reference:");
buf.push(childName);
}
buf.push("]");
reply = buf.join("");
}
else {

var reply = "array:[";
for (i = 0; i < data.length; i++) {
if (i != 0) reply += ",";
batch.paramCount++;
childName = "c" + dwr.engine._batch.map.callCount + "-e" + batch.paramCount;
dwr.engine.serialize.convert(batch, referto, data[i], childName, depth + 1);
reply += "reference:";
reply += childName;
}
reply += "]";
}

return reply;
},






convertObject:function(batch, referto, data, name, depth) {

var reply = "Object_" + dwr.engine.serialize.getObjectClassName(data) + ":{";
var elementset = (data.constructor && data.constructor.$dwrClassMembers ? data.constructor.$dwrClassMembers : data);
var element;
for (element in elementset) {
if (typeof data[element] != "function") {
batch.paramCount++;
var childName = "c" + dwr.engine._batch.map.callCount + "-e" + batch.paramCount;
dwr.engine.serialize.convert(batch, referto, data[element], childName, depth + 1);
reply += encodeURIComponent(element) + ":reference:" + childName + ", ";
}
}

if (reply.substring(reply.length - 2) == ", ") {
reply = reply.substring(0, reply.length - 2);
}
reply += "}";

return reply;
},






convertXml:function(batch, referto, data, name, depth) {
var output;
if (window.XMLSerializer) output = new XMLSerializer().serializeToString(data);
else if (data.toXml) output = data.toXml;
else output = data.innerHTML;

return "xml:" + encodeURIComponent(output);
},






lookup:function(referto, data, name) {
var lookup;

for (var i = 0; i < referto.length; i++) {
if (referto[i].data == data) {
lookup = referto[i];
break;
}
}
if (lookup) {
return "reference:" + lookup.name;
}
referto.push({ data:data, name:name });
return null;
},









getObjectClassName:function(obj) {

if (obj.$dwrClassName)
return obj.$dwrClassName;
else if (obj.constructor && obj.constructor.$dwrClassName)
return obj.constructor.$dwrClassName;
else
return "Object";
}
};




dwr.engine.transport = {





send:function(batch) {
dwr.engine.batch.prepareToSend(batch);


var isCrossDomain = false;
if (batch.path == null) {
batch.path = dwr.engine._pathToDwrServlet;
}
if (batch.path.indexOf("http://") == 0 || batch.path.indexOf("https://") == 0) {
var dwrShortPath = dwr.engine._pathToDwrServlet.split("/", 3).join("/");
var hrefShortPath = window.location.href.split("/", 3).join("/");
isCrossDomain = (dwrShortPath != hrefShortPath);
}

if (batch.fileUpload) {
if (isCrossDomain) {
throw new Error("Cross domain file uploads are not possible with this release of DWR");
}
batch.transport = dwr.engine.transport.iframe;
}
else if (isCrossDomain && !dwr.engine.isJaxerServer) {
batch.transport = dwr.engine.transport.scriptTag;
}



else {
batch.transport = dwr.engine.transport.xhr;
}

return batch.transport.send(batch);
},





remove:function(batch) {
dwr.engine.transport.iframe.remove(batch);
dwr.engine.transport.xhr.remove(batch);
},






abort:function(batch) {
if (batch && !batch.completed) {
dwr.engine.batch.remove(batch);

if (batch.req) {
batch.req.abort();
}

dwr.engine.transport.remove(batch);
dwr.engine._handleError(batch, { name:"dwr.engine.timeout", message:"Timeout" });
}
},




xhr:{



httpMethod:"POST",






XMLHTTP:["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"],





send:function(batch) {
if (batch.isPoll) {
batch.map.partialResponse = dwr.engine._partialResponseYes;
}


if (batch.isPoll && dwr.engine._pollWithXhr == "true") {
batch.map.partialResponse = dwr.engine._partialResponseNo;
}
if (batch.isPoll && dwr.engine.isIE) {
batch.map.partialResponse = dwr.engine._partialResponseNo;
}

if (window.XMLHttpRequest) {
batch.req = new XMLHttpRequest();
}
else if (window.ActiveXObject) {
batch.req = dwr.engine.util.newActiveXObject(dwr.engine.transport.xhr.XMLHTTP);
}


if (batch.async == true) {
batch.req.onreadystatechange = function() {
if (typeof dwr != 'undefined') {
dwr.engine.transport.xhr.stateChange(batch);
}
};
}


if (batch.isPoll) {
dwr.engine._pollReq = batch.req;

if (!dwr.engine.isIE) batch.req.batch = batch;
}

httpMethod = dwr.engine.transport.xhr.httpMethod;


var indexSafari = navigator.userAgent.indexOf("Safari/");
if (indexSafari >= 0) {
var version = navigator.userAgent.substring(indexSafari + 7);
if (parseInt(version, 10) < 400) {
if (dwr.engine._allowGetForSafariButMakeForgeryEasier == "true") {
httpMethod = "GET";
}
else {
dwr.engine._handleWarning(batch, {
name: "dwr.engine.oldSafari",
message: "Safari GET support disabled. See getahead.org/dwr/server/servlet and allowGetForSafariButMakeForgeryEasier."
});
}
}
}

batch.mode = batch.isPoll ? dwr.engine._ModePlainPoll : dwr.engine._ModePlainCall;
var request = dwr.engine.batch.constructRequest(batch, httpMethod);

try {
batch.req.open(httpMethod, request.url, batch.async);
try {
for (var prop in batch.headers) {
var value = batch.headers[prop];
if (typeof value == "string") {
batch.req.setRequestHeader(prop, value);
}
}
if (!batch.headers["Content-Type"]) {
batch.req.setRequestHeader("Content-Type", "text/plain");
}
}
catch (ex) {
dwr.engine._handleWarning(batch, ex);
}
batch.req.send(request.body);
if (batch.async == false) {
dwr.engine.transport.xhr.stateChange(batch);
}
}
catch (ex) {
dwr.engine._handleError(batch, ex);
}

if (batch.isPoll && batch.map.partialResponse == dwr.engine._partialResponseYes) {
dwr.engine.transport.xhr.checkCometPoll();
}


return batch.reply;
},






stateChange:function(batch) {
var toEval;

if (batch.completed) {
dwr.engine._debug("Error: _stateChange() with batch.completed");
return;
}

var req = batch.req;
try {
var readyState = req.readyState;
var notReady = (req.readyState != 4);
if (notReady) {
return;
}
}
catch (ex) {
dwr.engine._handleWarning(batch, ex);

dwr.engine.batch.remove(batch);
return;
}

if (dwr.engine._unloading && !dwr.engine.isJaxerServer) {
dwr.engine._debug("Ignoring reply from server as page is unloading.");
return;
}

try {
var reply = req.responseText;
reply = dwr.engine._replyRewriteHandler(reply);
var status = req.status;

if (reply == null || reply == "") {
dwr.engine._handleWarning(batch, { name:"dwr.engine.missingData", message:"No data received from server" });
}
else if (status != 200) {
dwr.engine._handleError(batch, { name:"dwr.engine.http." + status, message:req.statusText });
}
else {
var contentType = req.getResponseHeader("Content-Type");
if (dwr.engine.isJaxerServer) {

contentType = "text/javascript";
}
if (!contentType.match(/^text\/plain/) && !contentType.match(/^text\/javascript/)) {
if (contentType.match(/^text\/html/) && typeof batch.textHtmlHandler == "function") {
batch.textHtmlHandler({ status:status, responseText:reply, contentType:contentType });
}
else {
dwr.engine._handleWarning(batch, { name:"dwr.engine.invalidMimeType", message:"Invalid content type: '" + contentType + "'" });
}
}
else {

if (batch.isPoll && batch.map.partialResponse == dwr.engine._partialResponseYes) {
dwr.engine.transport.xhr.processCometResponse(reply, batch);
}
else {
if (reply.search("//#DWR") == -1) {
dwr.engine._handleWarning(batch, { name:"dwr.engine.invalidReply", message:"Invalid reply from server" });
}
else {
toEval = reply;
}
}
}
}
}
catch (ex) {
dwr.engine._handleWarning(batch, ex);
}

dwr.engine._callPostHooks(batch);


dwr.engine._receivedBatch = batch;
if (toEval != null) toEval = toEval.replace(dwr.engine._scriptTagProtection, "");
dwr.engine._eval(toEval);
dwr.engine._receivedBatch = null;
dwr.engine.batch.validate(batch);
if (!batch.completed) dwr.engine.batch.remove(batch);
},





checkCometPoll:function() {
if (dwr.engine._pollReq) {
var req = dwr.engine._pollReq;
var text = req.responseText;
if (text != null) {
dwr.engine.transport.xhr.processCometResponse(text, req.batch);
}
}


if (dwr.engine._pollReq) {
setTimeout(dwr.engine.transport.xhr.checkCometPoll, dwr.engine._pollCometInterval);
}
},








processCometResponse:function(response, batch) {
if (batch.charsProcessed == response.length) return;
if (response.length == 0) {
batch.charsProcessed = 0;
return;
}

var firstStartTag = response.indexOf("//#DWR-START#", batch.charsProcessed);
if (firstStartTag == -1) {

batch.charsProcessed = response.length;
return;
}




var lastEndTag = response.lastIndexOf("//#DWR-END#");
if (lastEndTag == -1) {

return;
}


if (response.charCodeAt(lastEndTag + 11) == 13 && response.charCodeAt(lastEndTag + 12) == 10) {
batch.charsProcessed = lastEndTag + 13;
}
else {
batch.charsProcessed = lastEndTag + 11;
}

var exec = response.substring(firstStartTag + 13, lastEndTag);

try {
dwr.engine._receivedBatch = batch;
dwr.engine._eval(exec);
dwr.engine._receivedBatch = null;
}
catch (ex) {


if (dwr != null) {
dwr.engine._handleError(batch, ex);
}
}
},





remove:function(batch) {

if (batch.req) {

if (batch.req == dwr.engine._pollReq) dwr.engine._pollReq = null;
delete batch.req;
}
}
},




iframe:{




send:function(batch) {
if (batch.fileUpload) {
batch.httpMethod = "POST";
batch.encType = "multipart/form-data";
}
var idname = dwr.engine.transport.iframe.getId(batch);
batch.div = document.createElement("div");

document.body.appendChild(batch.div);
batch.div.innerHTML = "<iframe src='javascript:void(0)' frameborder='0' style='width:0px;height:0px;border:0;' id='" + idname + "' name='" + idname + "' onload='dwr.engine.transport.iframe.loadingComplete(" + batch.map.batchId + ");'></iframe>";
batch.document = document;
dwr.engine.transport.iframe.beginLoader(batch, idname);
},






getId:function(batch) {
return batch.isPoll ? "dwr-if-poll-" + batch.map.batchId : "dwr-if-" + batch.map.batchId;
},






beginLoader:function(batch, idname) {
batch.iframe = batch.document.getElementById(idname);
batch.iframe.batch = batch;
batch.mode = batch.isPoll ? dwr.engine._ModeHtmlPoll : dwr.engine._ModeHtmlCall;
if (batch.isPoll) dwr.engine._outstandingIFrames.push(batch.iframe);
var request = dwr.engine.batch.constructRequest(batch, batch.httpMethod);
if (batch.httpMethod == "GET") {
batch.iframe.setAttribute("src", request.url);
}
else {

// See http://soakedandsoaped.com/articles/read/firefox-3-native-ajax-file-upload

var formHtml = "<form id='dwr-form' action='" + request.url + "' target='" + idname + "' style='display:none;' method='" + batch.httpMethod + "'";
if (batch.encType) formHtml += " enctype='" + batch.encType + "'";
formHtml += "></form>";
var div = batch.document.createElement("div");
div.innerHTML = formHtml;
batch.form = div.firstChild;
for (var prop in batch.map) {
var value = batch.map[prop];
if (typeof value != "function") {
if (value.tagName && value.tagName.toLowerCase() == "input" && value.type && value.type.toLowerCase() == "file") {


var clone = value.cloneNode(true);
value.removeAttribute("id", prop);
value.setAttribute("name", prop);
value.parentNode.insertBefore(clone, value);
value.parentNode.removeChild(value);
batch.form.appendChild(value);
} else {
var formInput = batch.document.createElement("input");
formInput.setAttribute("type", "hidden");
formInput.setAttribute("name", prop);
formInput.setAttribute("value", value);
batch.form.appendChild(formInput);
}
}
}
batch.document.body.appendChild(batch.form);
batch.form.submit();
}
},






loadingComplete:function(batchId) {
var batch = dwr.engine._batches[batchId];
if (batch) dwr.engine.batch.validate(batch);
},




remote:{






beginIFrameResponse:function(iframe, batchId) {
if (iframe != null) dwr.engine._receivedBatch = iframe.batch;
dwr.engine._callPostHooks(dwr.engine._receivedBatch);
},






endIFrameResponse:function(batchId) {
dwr.engine.batch.remove(dwr.engine._receivedBatch);
dwr.engine._receivedBatch = null;
}
},

remove:function(batch) {

if (batch.div) {
batch.div.parentNode.removeChild(batch.div);
}
if (batch.iframe) {
batch.iframe.parentNode.removeChild(batch.iframe);
}
if (batch.form) {
batch.form.parentNode.removeChild(batch.form);
}
}




















































},




scriptTag:{




send:function(batch) {
batch.mode = batch.isPoll ? dwr.engine._ModePlainPoll : dwr.engine._ModePlainCall;
var request = dwr.engine.batch.constructRequest(batch, "GET");


if (document.body) {
batch.script = document.createElement("script");
batch.script.id = "dwr-st-" + batch.map.batchId;
batch.script.src = request.url;
batch.script.type = "text/javascript";
document.body.appendChild(batch.script);
}
else {
document.writeln("<scr" + "ipt type='text/javascript' id='dwr-st-" + batch.map["c0-id"] + "' src='" + request.url + "'> </scr" + "ipt>");
}
}
},




htmlfile:{




send:function(batch) {
var idname = dwr.engine.transport.iframe.getId(batch);
batch.htmlfile = new window.ActiveXObject("htmlfile");
batch.htmlfile.open();
batch.htmlfile.write("<" + "html>");
batch.htmlfile.write("<div><iframe className='wibble' src='javascript:void(0)' id='" + idname + "' name='" + idname + "' onload='dwr.engine.transport.iframe.loadingComplete(" + batch.map.batchId + ");'></iframe></div>");
batch.htmlfile.write("</" + "html>");
batch.htmlfile.close();
batch.htmlfile.parentWindow.dwr = dwr;
batch.document = batch.htmlfile;

dwr.engine.transport.iframe.beginLoader(batch, idname);
}
}
};





dwr.engine.batch = {




create:function() {
var batch = {
async:dwr.engine._async,
charsProcessed:0,
handlers:[],
isPoll:false,
map:{ callCount:0, windowName:window.name },
paramCount:0,
preHooks:[],
postHooks:[],
timeout:dwr.engine._timeout,
errorHandler:dwr.engine._errorHandler,
warningHandler:dwr.engine._warningHandler,
textHtmlHandler:dwr.engine._textHtmlHandler
};

if (dwr.engine._preHook) {
batch.preHooks.push(dwr.engine._preHook);
}
if (dwr.engine._postHook) {
batch.postHooks.push(dwr.engine._postHook);
}

dwr.engine.batch.populateHeadersAndParameters(batch);
return batch;
},






createPoll:function() {
var batch = {
async:true,
charsProcessed:0,
handlers:[{
callback:function(pause) {
dwr.engine._pollRetries = 0;
setTimeout(dwr.engine._poll, pause);
}
}],
isPoll:true,
map:{ windowName:window.name },
paramCount:0,
path:dwr.engine._pathToDwrServlet,
preHooks:[],
postHooks:[],
timeout:0,
windowName:window.name,
errorHandler:dwr.engine._pollErrorHandler,
warningHandler:dwr.engine._pollErrorHandler,
textHtmlHandler:dwr.engine._textHtmlHandler
};

dwr.engine.batch.populateHeadersAndParameters(batch);
return batch;
},






populateHeadersAndParameters:function(batch) {
var propname, data;
batch.headers = {};
if (dwr.engine._headers) {
for (propname in dwr.engine._headers) {
data = dwr.engine._headers[propname];
if (typeof data != "function") batch.headers[propname] = data;
}
}
batch.parameters = {};
if (dwr.engine._parameters) {
for (propname in dwr.engine._parameters) {
data = dwr.engine._parameters[propname];
if (typeof data != "function") batch.parameters[propname] = data;
}
}
},





addCall:function(batch, scriptName, methodName, args) {


var callData, stopAt;
var lastArg = args[args.length - 1];
if (lastArg == null || typeof lastArg == "function") {
callData = { callback:lastArg };
stopAt = args.length - 1;
}
else if (typeof lastArg == "object" && (typeof lastArg.callback == "function"
|| typeof lastArg.exceptionHandler == "function" || typeof lastArg.callbackHandler == "function"
|| typeof lastArg.errorHandler == "function" || typeof lastArg.warningHandler == "function" )) {
callData = lastArg;
stopAt = args.length - 1;
}
else {
callData = {};
stopAt = args.length;
}


dwr.engine.batch.merge(batch, callData);
batch.handlers[batch.map.callCount] = {
exceptionHandler:callData.exceptionHandler,
exceptionArg:callData.exceptionArg || callData.arg || null,
exceptionScope:callData.exceptionScope || callData.scope || window,
callback:callData.callbackHandler || callData.callback,
callbackArg:callData.callbackArg || callData.arg || null,
callbackScope:callData.callbackScope || callData.scope || window
};


var prefix = "c" + batch.map.callCount + "-";
batch.map[prefix + "scriptName"] = scriptName;
batch.map[prefix + "methodName"] = methodName;
batch.map[prefix + "id"] = batch.map.callCount;
var converted = [];
for (var i = 0; i < stopAt; i++) {
dwr.engine.serialize.convert(batch, converted, args[i], prefix + "param" + i, 0);
}
},







merge:function(batch, overrides) {
var propname, data;
for (var i = 0; i < dwr.engine._propnames.length; i++) {
propname = dwr.engine._propnames[i];
if (overrides[propname] != null) batch[propname] = overrides[propname];
}
if (overrides.preHook != null) batch.preHooks.unshift(overrides.preHook);
if (overrides.postHook != null) batch.postHooks.push(overrides.postHook);
if (overrides.headers) {
for (propname in overrides.headers) {
data = overrides.headers[propname];
if (typeof data != "function") batch.headers[propname] = data;
}
}
if (overrides.parameters) {
for (propname in overrides.parameters) {
data = overrides.parameters[propname];
if (typeof data != "function") batch.map["p-" + propname] = "" + data;
}
}
},






prepareToSend:function(batch) {
batch.map.batchId = dwr.engine._nextBatchId;
dwr.engine._nextBatchId++;
dwr.engine._batches[batch.map.batchId] = batch;
dwr.engine._batchesLength++;
batch.completed = false;


batch.map.page = encodeURIComponent(window.location.pathname + window.location.search);
batch.map.httpSessionId = dwr.engine._getHttpSessionId();
batch.map.scriptSessionId = dwr.engine._scriptSessionId;
batch.map.windowName = window.name;

for (var i = 0; i < batch.preHooks.length; i++) {
batch.preHooks[i]();
}
batch.preHooks = null;

if (batch.timeout && batch.timeout != 0) {
batch.timeoutId = setTimeout(function() { dwr.engine.transport.abort(batch); }, batch.timeout);
}
},







constructRequest:function(batch, httpMethod) {

var urlBuffer = [];
urlBuffer.push(batch.path);
urlBuffer.push(batch.mode);
if (batch.isPoll) {
urlBuffer.push("ReverseAjax.dwr");
}
else if (batch.map.callCount == 1) {
urlBuffer.push(batch.map["c0-scriptName"]);
urlBuffer.push(".");
urlBuffer.push(batch.map["c0-methodName"]);
urlBuffer.push(".dwr");
}
else {
urlBuffer.push("Multiple.");
urlBuffer.push(batch.map.callCount);
urlBuffer.push(".dwr");
}

var sessionMatch = location.href.match(/jsessionid=([^?]+)/);
if (sessionMatch != null) {
urlBuffer.push(";jsessionid=");
urlBuffer.push(sessionMatch[1]);
}

var request = {};
var prop;
if (httpMethod == "GET") {


batch.map.callCount = "" + batch.map.callCount;
urlBuffer.push("?");
for (prop in batch.map) {
if (typeof batch.map[prop] != "function") {
urlBuffer.push(encodeURIComponent(prop));
urlBuffer.push("=");
urlBuffer.push(encodeURIComponent(batch.map[prop]));
urlBuffer.push("&");
}
}
urlBuffer.pop();
request.body = null;
}
else {

if (dwr.engine.isIE <= 7) {

var buf = [];
for (prop in batch.map) {
if (typeof batch.map[prop] != "function") {
buf.push(prop + "=" + batch.map[prop] + dwr.engine._postSeperator);
}
}
request.body = buf.join("");
}
else {

for (prop in batch.map) {
if (typeof batch.map[prop] != "function") {
request.body += prop + "=" + batch.map[prop] + dwr.engine._postSeperator;
}
}
}
var bodyBuffer = [];
for (prop in batch.map) {
if (typeof batch.map[prop] != "function") {
bodyBuffer.push(prop);
bodyBuffer.push("=");
bodyBuffer.push(batch.map[prop]);
bodyBuffer.push(dwr.engine._postSeperator);
}
}
request.body = dwr.engine._contentRewriteHandler(bodyBuffer.join(""));
}
request.url = dwr.engine._urlRewriteHandler(urlBuffer.join(""));
return request;
},







validate:function(batch) {

if (!batch.completed) {
for (var i = 0; i < batch.map.callCount; i++) {
if (batch.handlers[i].completed !== true) {
dwr.engine._handleWarning(batch, { name:"dwr.engine.incompleteReply", message:"Incomplete reply from server" });
break;
}
}
}
},






remove:function(batch) {
if (!batch) {
dwr.engine._debug("Warning: null batch in dwr.engine.batch.remove()", true);
return;
}

if (batch.completed == "true") {
dwr.engine._debug("Warning: Double complete", true);
return;
}
batch.completed = true;


dwr.engine.transport.remove(batch);


if (batch.timeoutId) {
clearTimeout(batch.timeoutId);
delete batch.timeoutId;
}


if (batch.map && (batch.map.batchId || batch.map.batchId == 0)) {
delete dwr.engine._batches[batch.map.batchId];
dwr.engine._batchesLength--;
}




if (dwr.engine._batchQueue.length != 0) {
var sendbatch = dwr.engine._batchQueue.shift();
dwr.engine.transport.send(sendbatch);
}
}
};





dwr.engine.util = {




newActiveXObject:function(axarray) {
var returnValue;
for (var i = 0; i < axarray.length; i++) {
try {
returnValue = new ActiveXObject(axarray[i]);
break;
}
catch (ex) {   }
}
return returnValue;
}
};




var userAgent = navigator.userAgent;
var versionString = navigator.appVersion;
var version = parseFloat(versionString);

dwr.engine.isOpera = (userAgent.indexOf("Opera") >= 0) ? version : 0;
dwr.engine.isKhtml = (versionString.indexOf("Konqueror") >= 0) || (versionString.indexOf("Safari") >= 0) ? version : 0;
dwr.engine.isSafari = (versionString.indexOf("Safari") >= 0) ? version : 0;
dwr.engine.isJaxerServer = (window.Jaxer && Jaxer.isOnServer);

var geckoPos = userAgent.indexOf("Gecko");
dwr.engine.isMozilla = ((geckoPos >= 0) && (!dwr.engine.isKhtml)) ? version : 0;

dwr.engine.isFF = 0;
dwr.engine.isIE = 0;
try {
if (dwr.engine.isMozilla) {
dwr.engine.isFF = parseFloat(userAgent.split("Firefox/")[1].split(" ")[0]);
}
if ((document.all) && (!dwr.engine.isOpera)) {
dwr.engine.isIE = parseFloat(versionString.split("MSIE ")[1].split(";")[0]);
}
}
catch(ex) { }


eval("dwr.engine._execute(dwr.engine._pathToDwrServlet, '__System', 'pageLoaded', [ function() { dwr.engine._ordered = false; }]);");




dwr.hub = {





publish:function(topicName, data) {
dwr.engine._execute(dwr.engine._pathToDwrServlet, '__System', 'publish', topicName, data, {});
},









subscribe:function(topicName, callback, scope, subscriberData) {
var subscription = "" + dwr.hub._subscriptionId;
dwr.hub._subscriptionId++;
dwr.hub._subscriptions[subscription] = {
callback:callback,
scope:scope,
subscriberData:subscriberData
};
dwr.engine._execute(dwr.engine._pathToDwrServlet, '__System', 'subscribe', topicName, subscription, {});
return subscription;
},







_remotePublish:function(subscriptionId, publishData) {
var subscriptionData = dwr.hub._subscriptions[subscriptionId];
if (!subscriptionData) return;
subscriptionData.callback.call(subscriptionData.scope, publishData, subscriptionData.subscriberData);
},




_subscriptionId:0,




_subscriptions:{}
};
})();





dwr.data = {





StoreChangeListener:{





itemRemoved:function(source, itemId) { },






itemAdded:function(source, item) { },








itemChanged:function(source, item, changedAttributes) { }
},








Cache:function(storeId, listener) {
this.storeId = storeId;
this.listener = listener;
}
};

(function() {











dwr.data.Cache.prototype.viewRegion = function(region, callbackObj) {
if (!region) region = { };
if (!region.start) region.start = 0;
if (!region.count) region.count = -1;
if (!region.sort) region.sort = [];
if (!region.query) region.query = {};

return dwr.engine._execute(dwr.engine._pathToDwrServlet, '__Data', 'viewRegion', [ this.storeId, region, this.listener, callbackObj ]);
};






dwr.data.Cache.prototype.viewItem = function(itemId, callbackObj) {
return dwr.engine._execute(dwr.engine._pathToDwrServlet, '__Data', 'viewItem', [ this.storeId, itemId, this.listener, callbackObj ]);
};





dwr.data.Cache.prototype.unsubscribe = function(callbackObj) {
if (this.listener) {
return dwr.engine._execute(dwr.engine._pathToDwrServlet, '__Data', 'unsubscribe', [ this.storeId, this.listener, callbackObj ]);
}
};






dwr.data.Cache.prototype.update = function(items, callbackObj) {
return dwr.engine._execute(dwr.engine._pathToDwrServlet, '__Data', 'update', [ this.storeId, items, callbackObj ]);
};

})();

