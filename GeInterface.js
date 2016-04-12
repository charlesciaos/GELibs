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

function AddCounter()
{   
    var eventObj = new Object();
    // set the flag that specifies we're deleting the messages
    eventObj.path = "http://charlesciaos.diskstation.me/api/GeService/add_counter.php";
    eventObj.params = null;
    eventObj.callback = null;
    // add the message to the queue
    PostMessage(eventObj.path, eventObj.params, eventObj.callback);
}




