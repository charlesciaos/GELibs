"use strict";

function GeInterface()
{
	//this.obj.apply(this, arguments);
	console.log("GeInterface constructor");

	for(var i=0; i<arguments.length; i++)
	{
        console.log("GeInterface: arguments[" + i + "] = " + arguments[i]);
    }

    //public:

    //private:

}

function RPi_RotateCamera()
{
    var eventObj = new Object();
    // set the flag that specifies we're deleting the messages
    eventObj.path = "http://charlesciaos.diskstation.me/api/GeService/webiopi_RESTAPI.php";
    eventObj.params = "path=/GPIO/22/function/out&method=POST";
    // add the message to the queue
    MessageQueue.push(eventObj);
    setTimeout("requestNewMessages();", updateInterval);
}

function RPi_takePicture()
{
    var req = new createXmlHttpRequestObject();
    req.open('GET', "/api/GeService/demossh2.php", true);
    req.send(null);
    //var oShowPic=document.getElementById("showPic");
    //oShowPic.innerHTML = "<img src='res/pi/camImage.jpg'></img>";
    //var headers = req.getAllResponseHeaders().toLowerCase();
    //document.write("Headers are:"+headers);
    //alert(headers);
}
