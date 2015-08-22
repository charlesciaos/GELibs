var package = {
  Version: '0.0.1',
  require: function(libraryName) {
    // inserting via DOM fails in Safari 2.0, so brute force approach
    document.write('<script type="text/javascript" src="'+libraryName+'"></script>');
  },
  load: function() {
    /*if((typeof Prototype=='undefined') ||
      parseFloat(Prototype.Version.split(".")[0] + "." +
                 Prototype.Version.split(".")[1]) < 1.0)
    {
      throw("script.aculo.us requires the Prototype JavaScript framework >= 1.4.0");
    }*/

    var scriptTags = document.getElementsByTagName("script");
    for(var i=0;i<scriptTags.length;i++) {
      if(scriptTags[i].src && scriptTags[i].src.match(/package\.js(\?.*)?$/))
      {
        var path = scriptTags[i].src.replace(/package\.js(\?.*)?$/,'');
        this.require(path + 'GeCore.js');
        this.require(path + 'GeObject.js');
        this.require(path + 'GeShape.js');
        this.require(path + 'GeUtil.js');
        this.require(path + 'GeWorld.js');
        this.require(path + 'GeDialog.js');
        break;
      }
    }
  }
}

package.load();