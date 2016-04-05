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

// Main
function initMessageQueue()
{
    // stores the reference to the XMLHttpRequest object
    xmlHttpGetMessages = createXmlHttpRequestObject();

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
            var params = "";
            // if there are requests stored in queue, take the oldest one
            if(MessageQueue.length>0)
            {
                eventObj = MessageQueue.shift();

                console.log("[MQ] shift path:" + eventObj.path +"@@@!!!");
                console.log("[MQ] shift params:" + eventObj.params +"@@@!!!");

                // call the server page to execute the server-side operation
                xmlHttpGetMessages.open("POST", eventObj.path, true);
                xmlHttpGetMessages.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xmlHttpGetMessages.onreadystatechange = handleReceivingMessages;

                xmlHttpGetMessages.send(eventObj.params);
                console.log("[MQ] send message completed.");
            }
            else
            {
                console.log("[MQ] MessageQueue is Empty");
            }

            setTimeout("requestNextMessages();", updateInterval);
        }
        else
        {
            // we will check again for new messages 
            setTimeout("requestNextMessages();", updateInterval);
        }
    }
    catch(e)
    {
      //displayError(e.toString());
    }
  }
}

function handleReceivingMessages() 
{
  // continue if the process is completed
  if(xmlHttpGetMessages.readyState == 4) 
  {
    // continue only if HTTP status is "OK"
    if(xmlHttpGetMessages.status == 200) 
    {
      try
      {
        readMessages();
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

function readMessages()
{  
    // retrieve the server's response 
    var response = xmlHttpGetMessages.responseText;

    console.log("[MQ] readMessages: " + response +"@@@!!!");
    
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