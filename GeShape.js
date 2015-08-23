"use strict";

function GEShape()
{
	//this.obj.apply(this, arguments);
	console.log("GEShape constructor");
	//TBD: add this obj to world manager.
	
	for( var i=0; i<arguments.length; i++ )
	{
        console.log("GEShape: arguments[" + i + "] = " + arguments[i]);
    }


    //public:
    
    //private:
	
	
}
GEShape.prototype = new GEObject();


/*
//---- GEShape Property ----

//id
GEShape.prototype.id = 0;

//
GEShape.prototype.bEnableG = false;

//weight
GEShape.prototype.m = 0;

//position
GEShape.prototype.x = 0;
GEShape.prototype.y = 0;

//velocity
GEShape.prototype.vx = 0;
GEShape.prototype.vy = 0;

//accessor
GEShape.prototype.ax =0;
GEShape.prototype.ay =0;	

//---- GEObject Function ----
GEShape.prototype.setAccessor = function(aax, aay)
{
	console.log("setAccessor(%d,%d)", aax, aay);
	GEObject.prototype.ax += aax;
	GEObject.prototype.ay += aay;
}

GEShape.prototype.draw = function()
{
	console.log("draw object");
}
*/
