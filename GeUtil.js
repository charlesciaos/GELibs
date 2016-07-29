function canvasSupport()
{
    return true;
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


var fit = function(div, imgW, imgH)
{
    this.container = div; 
    this.imgW = imgW; 
    this.imgH = imgH;
    this.img = this.container.children[0];
    //this.img.css({'position': 'absolute', 'top': '0px', 'left': '0px'});
    this.img.style.position = "absolute";
    this.img.style.top = "0px";
    this.img.style.left = "0px";

    this.setSize = function() 
    {
        //console.log("window iw/ih"+ window.innerWidth +"/"+ window.innerHeight);  
        if (this.ratio())
        {
            this.img.style.width =    window.innerWidth + "px";
            this.img.style.height =   (this.imgH * window.innerWidth / this.imgW ) + "px";
            this.img.style.top =  (0 - ((this.imgH * window.innerWidth / this.imgW) - window.innerHeight) * .5 )+ "px";
            this.img.style.left =  0 + "px";
        }
        else
        {
            this.img.style.width =   ( this.imgW * window.innerHeight / this.imgH )+ "px";
            this.img.style.height = window.innerHeight + "px";
            this.img.style.top =  0 + "px";
            this.img.style.left =  (0  - ((this.imgW * window.innerHeight / this.imgH) - window.innerWidth) * .5 ) + "px";

            //console.log("img iw/ih"+ this.img.style.width +"/"+ this.img.style.height);  
        }
    }
    this.ratio = function() 
    {
        var winRatio =  window.innerWidth /  window.innerHeight;
        var picRatio = this.imgW / this.imgH;
        return winRatio > picRatio; 
    }
}

function loadFramesIntoDiv(frames, divBlock)
{
    var divContainter = document.getElementById(divBlock);

    var divContent = "";
    for(var i = 0; i < frames.length; i++)
    {
        var divTag = document.createElement("div");          
        divTag.id = divBlock+i;
//          divTag.setAttribute("align","center");      
//          divTag.style.margin = "0px auto";
        divTag.className = "dynamicDiv";
        divTag.innerHTML += "<iframe  src='"+ frames[i] +"' scrolling='no' frameborder='0' width='100%' height='100%'></iframe>";
        divContainter.appendChild(divTag);
    }
}

var addEvent = function(elem, type, eventHandle)
{
    if (elem == null || typeof(elem) == 'undefined') 
    {
        return;
    }

    if (elem.addEventListener) 
    {
        elem.addEventListener( type, eventHandle, false );
    }
    else if (elem.attachEvent) 
    {
        elem.attachEvent( "on" + type, eventHandle );
    }
    else
    {
        elem["on"+type] = eventHandle;
    }
};


//-------------------------------------

function Car() 
{ 
    console.log("Car constructor");

    this.name = "Car A";

    console.log("Total # of parameters="+arguments.length );
    for (i=0;i<arguments.length;i++)
    {
        console.log(Car.arguments[i]);
        this.name = Car.arguments[i];
    }
}

//再利用 prototype 的方式幫這個 Car() 新增屬性及方法 
Car.prototype.color = 'red'; 
Car.prototype.doors = 4; 
Car.prototype.mpg = 23;


Car.prototype.showColor = function() 
{ 
    console.log("這款車的顏色是" + this.color); 
}

Car.prototype.showName = function() 
{ 
    console.log("這款車的名稱是" + this.name); 
}

/*

function preloader()
{
    if(document.getElementById)
    {
        //document.getElementById("preload-01").style.background = "url(./res/wallpaper/01.jpg) no-repeat -9999px -9999px";
        //document.getElementById("preload-02").style.background = "url(./res/wallpaper/02.jpg) no-repeat -9999px -9999px";
        //document.getElementById("preload-03").style.background = "url(./res/wallpaper/03.jpg) no-repeat -9999px -9999px";
    }
}

function addLoadEvent(func)
{
    var oldonload = window.onload;
    if(typeof window.onload != 'function')
    {
        window.onload = func;
    }
    else 
    {
        window.onload = function() 
        {
            if(oldonload)
            {
                oldonload();
            }
            func();
        }
    }
}

addLoadEvent(preloader);
*/

/*
var theCanvas = document.getElementById("canvas");
var context = theCanvas.getContext("2d");

var spaceShip = new Image();
spaceShip.addEventListener('load', eventShipLoaded, false);
spaceShip.src = "./res/wallpaper/00.gif";

function eventShipLoaded()
{
    drawScreen();   
}

function drawScreen()
{
    console.log("drawScreen ing ...");
    context.drawImage(spaceShip, 0, 0);
    context.drawImage(spaceShip, 50, 50);
}*/

