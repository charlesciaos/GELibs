//"use strict";

// creates an XMLHttpRequest instance
function createXmlHttpRequestObject() 
{
  // will store the reference to the XMLHttpRequest object
  var xmlHttp;

  // this should work for all browsers except IE6 and older
  try
  {
    // try to create XMLHttpRequest object
    xmlHttp = new XMLHttpRequest();
  }
  catch(e)
  {
    // assume IE6 or older
    var XmlHttpVersions = new Array("MSXML2.XMLHTTP.6.0",
                                    "MSXML2.XMLHTTP.5.0",
                                    "MSXML2.XMLHTTP.4.0",
                                    "MSXML2.XMLHTTP.3.0",
                                    "MSXML2.XMLHTTP",
                                    "Microsoft.XMLHTTP");
    // try every prog id until one works
    for(var i=0; i<XmlHttpVersions.length && !xmlHttp; i++) 
    {
        try
        {
            // try to create XMLHttpRequest object
            xmlHttp = new ActiveXObject(XmlHttpVersions[i]);
        }
        catch (e){}
    }
  }

  // return the created object or display an error message
  if(!xmlHttp)
  {
    alert("Error creating the XMLHttpRequest object.");
  }
  else 
  {
    return xmlHttp;
  }
}

function createDomObject()
{
    var xmlDoc;

    if(document.implementation && document.implementation.createDocument)
    {
        xmlDoc = document.implementation.crateDocument("","", null);
    }
    else if(window.ActiveXObject)
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    }

    if(!xmlDoc)
    {
        alert("Error creating the DOM object.");
    }
    else
    {
        return xmlDoc;
    }
}

// when set to true, display detailed error messages
var debugMode = true;

var xmlHttpGetMessages;
var updateInterval = 1000;
var MessageQueue = new Array();
/* lastMessageID - the ID of the most recent chat message */
var lastMessageID = -1; 

var MessageQueueTimer;

//clearTimeout(timer);

// Main
function initMessageQueue()
{
    // stores the reference to the XMLHttpRequest object
    xmlHttpGetMessages = createXmlHttpRequestObject();

    //xhr.addEventListener("progress", updateProgress);
    //xhr.addEventListener("load", transferComplete);
    //xhr.addEventListener("error", transferFailed);
    //xhr.addEventListener("abort", transferCanceled);

    requestNextMessages();
}

function requestNextMessages()
{  
  // only continue if xmlHttpGetMessages isn't void
  if(xmlHttpGetMessages)
  {
    try
    {
        // don't start another server operation if such an operation is already in progress 
        //console.log("xmlHttpGetMessages.readyState:" + xmlHttpGetMessages.readyState);

        if(xmlHttpGetMessages.readyState == 4
        || xmlHttpGetMessages.readyState == 0)
        {
            // we will store the parameters used to make the server request

            // if there are requests stored in queue, take the oldest one
            if(MessageQueue.length>0)
            {
                eventObj = MessageQueue.shift();

                console.log("[MQ] shift path:" + eventObj.path +"@@@!!!");
                console.log("[MQ] shift params:" + eventObj.params +"@@@!!!");

                handleMessage(eventObj.path, eventObj.params, eventObj.callback, true);
            }
            else
            {
                console.log("[MQ] MessageQueue is Empty");
            }

            MessageQueueTimer = setTimeout("requestNextMessages();", updateInterval);
        }
        else
        {
            // we will check again for new messages 
            MessageQueueTimer = setTimeout("requestNextMessages();", updateInterval);
        }
    }
    catch(e)
    {
      //displayError(e.toString());
    }
  }
}

function handleMessage(path, params, callback, bSync)
{
    // call the server page to execute the server-side operation
    xmlHttpGetMessages.open("POST", path, true);
    xmlHttpGetMessages.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    if(null == callback)
    {
      xmlHttpGetMessages.onreadystatechange = defaultHandleReceivingMessages;
    }
    else
    {
      xmlHttpGetMessages.onreadystatechange = callback; 
    }
    xmlHttpGetMessages.send(eventObj.params);
    console.log("[MQ] send message completed.");    
}

function defaultHandleReceivingMessages() 
{
  // continue if the process is completed
  if(xmlHttpGetMessages.readyState == 4) 
  {
    // continue only if HTTP status is "OK"
    if(xmlHttpGetMessages.status == 200) 
    {
      try
      {
        defaultReadMessages();
      }
      catch(e)
      {
        //displayError(e.toString());
      }
    } 
    else
    {
      //displayError(xmlHttpGetMessages.statusText);
    }
  }
}

function defaultReadMessages()
{  
    // retrieve the server's response 
    var response = xmlHttpGetMessages.responseText;

    console.log("[MQ] defaultReadMessages: " + response +"@@@!!!");
    
    // server error?
    if(response.indexOf("ERRNO") >= 0 
    || response.indexOf("error:") >= 0
    || response.length == 0)
    {
        throw(response.length == 0 ? "Void server response." : response);
    }

    // retrieve the document element
    response = xmlHttpGetMessages.responseXML.documentElement;

    console.log("readMessages:" + response +"@@@!!!");
    
}

// public function 

// sync api
function SendMessage(path, params, callback)
{
    var eventObj = new Object();
    // set the flag that specifies we're deleting the messages
    eventObj.path = path;
    eventObj.params = params;
    eventObj.callback = callback;
    // add the message to the queue
    clearTimeout(MessageQueueTimer);
    handleMessage(eventObj.path, params, callback, true);
    MessageQueueTimer = setTimeout("requestNextMessages();", updateInterval);    
}

// async api
function PostMessage(path, params, callback)
{
    var eventObj = new Object();
    // set the flag that specifies we're deleting the messages
    eventObj.path = path;
    eventObj.params = params;
    eventObj.callback = callback;
    // add the message to the queue
    MessageQueue.push(eventObj); 
}
