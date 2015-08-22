"use strict";

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

function instanceOf(object, constructor)
{
   while (object != null)
   {
      if (object == constructor.prototype)
      {
         return true;
      }
      object = object.__proto__;
   }
   return false;
}

function getTextSync(url)
{
  var request = new createXmlHttpRequestObject();
  request.open("GET", url, false);
  request.send(null);

  if(request.status !== 200)
  {
    return "Error1";//throw new Error(request.statusText);
  }
  
  //var type = request.getResopnseHeader("Content-Type");
  //if(!type.match(/^text/)) return "Error2";//throw new Error("Expected textual response; got:" + type);

  return request.responseText;
}

function getText(url, callback)
{
  var requests = new createXmlHttpRequestObject();
  requests.open("GET", url);
  requests.onreadystatechange = function()
  {
    if(requests.readyState === 4 && requests.status === 200)
    {
      var type = requests.getResopnseHeader("Content-Type");
      if(type.match(/^text/))
      {
        callback(requests.responseText);
      }
    }
  }

  requests.send(null);
}

function takePic()
{
    var req = new createXmlHttpRequestObject();
    req.open('GET', "demossh2.php", true);
    req.send(null);
    //var oShowPic=document.getElementById("showPic");
    //oShowPic.innerHTML = "<img src='res/pi/camImage.jpg'></img>";
    //var headers = req.getAllResponseHeaders().toLowerCase();
    //document.write("Headers are:"+headers);
    //alert(headers);

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

/*
function process2(requestUrl, params)
{
	do
	{
		if(!xmlHttp) break;
		
		if !(xmlHttp.readyState = 0 || xmlHttp.readyState == 4)
		{
			alert("Can't connect to server, please try again later.");
		}
		else
		{	
			try
			{
				try
				{
					netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead');
				}
				catch (e){} //ignore error

				xmlHttp.open("GET", requestUrl +"?"+ params, true);
				xmlHttp.onreadystatechange = handleRequestStateChange;
				xmlHttp.send(params);
			}
			catch(e)
			{
				alert("Can't connect to server:\n"+e.toString());
			}
		}
		
	}while(false);
	
	return;
}
*/
function handleRequestStateChange()
{
	if(xmlHttp.readyState == 4)
	{
		if(xmlHttp.status == 200)
		{
			try
			{
				handleServerResponse();
			}
			catch(e)
			{
				alert("Error reading the response: " + e.toString());
			}
			
		}
	}
	else
	{
		alert("There was a problem retrieving the data:\n"+ xmlHttp.statusText);
	}
}

var temp =0;
function displayCamImage()
{  
  var oCamImage = document.getElementById("camImage");
  temp++;
  oCamImage.innerHTML = temp +"<br><img id='showCamImage' src='res/pi/camImage.jpg?"+Math.random()+"'></img>";
}


// make asynchronous HTTP request using the XMLHttpRequest object 
function process()
{
  displayCamImage();
  // if the connection is busy, try again after one second  
  setTimeout('process()', 1000);
}

// executed automatically when a message is received from the server
function handleServerResponse() 
{
  // move forward only if the transaction has completed
  if (xmlHttp.readyState == 4) 
  {
    // status of 200 indicates the transaction completed successfully
    if (xmlHttp.status == 200) 
    {
	    var user_count;
      // extract the XML retrieved from the server
      xmlResponse = xmlHttp.responseXML;
      // obtain the document element (the root element) of the XML structure
      xmlDocumentElement = xmlResponse.documentElement;
      // get the text message, which is in the first child of
      // the the document element
      helloMessage = xmlDocumentElement.firstChild.data;
      // update the client display using the data received from the server
  	  user_count = xmlDocumentElement.getElementsByTagName("user_count")[0].firstChild.data;
	  
      document.getElementById("divMessage").innerHTML = '<i>' + helloMessage + '</i>';
      // restart sequence
      setTimeout('process()', 1000);
    } 
    else 
    {
      //alert("There was a problem accessing the server: " + xmlHttp.statusText);
    }
  }
}



// Main
// stores the reference to the XMLHttpRequest object
//var xmlHttp = createXmlHttpRequestObject(); 