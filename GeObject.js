"use strict";

function GeObject()
{
	//this.obj.apply(this, arguments);
    console.log("GeObject constructor");
	//TBD: add this obj to world manager.

	for( var i=0; i<arguments.length; i++ )
	{
        console.log("GeObject: arguments[" + i + "] = " + arguments[i]);
    }

    switch(arguments.length)
    {
    case 1:
        this.__proto__._id = arguments[0];
        break;
    default:
        break;
    }

    //public:
    function getID()
    {
        return this._id;    
    }
}
GeObject.prototype = new Object();

//GeObject private property ----
//id
GeObject.prototype._id = 0;

//weight
GeObject.prototype._weight = 0;
//position
GeObject.prototype._x = 0;
GeObject.prototype._y = 0;
//velocity
GeObject.prototype._vx = 0;
GeObject.prototype._vy = 0;
//accessor
GeObject.prototype._ax =0;
GeObject.prototype._ay =0;	

//other
GeObject.prototype._bGravityEnable = false;


//GeObject Public Function ----
GeObject.prototype.draw = function()
{
	console.log("[draw] _id: " + this._id + ", _x: " + this._x + ", _y: " + this._y);
}

GeObject.draw2 = function()
{
    console.log("draw object2");
}

/*
//TBD
GeObject.prototype.showId = function() 
{ 
    console.log("this object id = " + this._id); 
}

GeObject.prototype.setAccessor = function(aax, aay)
{
    console.log("setAccessor(%d,%d)", aax, aay);
    GeObject.prototype.ax += aax;
    GeObject.prototype.ay += aay;
}

public function getAccessor(aax, aay)
{

}
*/
