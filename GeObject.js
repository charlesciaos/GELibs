"use strict";

function GEObject()
{
	//this.obj.apply(this, arguments);
    console.log("GEObject constructor");
	//TBD: add this obj to world manager.

	for( var i=0; i<arguments.length; i++ )
	{
        console.log("GEObject: arguments[" + i + "] = " + arguments[i]);
    }

    switch(arguments.length)
    {
    case 1:
        this._id = arguments[0];
        break;
    default:
        break;
    }

    //public:
    function getID()
    {
        return this._id;    
    }

    //private:
    var _id = 0;

    //this.m = 30;
}
GEObject.prototype = new Object();

//---- GEObject Property ----

//id
GEObject.prototype.id = 0;

//
GEObject.prototype.bEnableG = false;

//weight
GEObject.prototype.m = 0;

//position
GEObject.prototype.x = 0;
GEObject.prototype.y = 0;

//velocity
GEObject.prototype.vx = 0;
GEObject.prototype.vy = 0;

//accessor
GEObject.prototype.ax =0;
GEObject.prototype.ay =0;	

//---- GEObject Function ----
GEObject.prototype.setAccessor = function(aax, aay)
{
	console.log("setAccessor(%d,%d)", aax, aay);
	GEObject.prototype.ax += aax;
	GEObject.prototype.ay += aay;
}

GEObject.prototype.draw = function()
{
	console.log("draw object");
}

GEObject.draw2 = function()
{
    console.log("draw object2");
}

/*
//TBD
GEObject.prototype.showId = function() 
{ 
    console.log("this object id = " + this.id); 
}

public function getAccessor(aax, aay)
{

}
*/
