;(function($){
  
  $.fn.missCleo = function(config, callback) {
    
    var obj = $(this);
        
    var defaults = {
      bind : 'keydown',
      call : callback,
      matches : /\^*/
    };
    
    var config = $.extend(defaults, config, { target : obj });
    var keystroke = keystroke_from_config();
    
    var keybinding = function(e) {
      var val = obj.val();
      if(keystroke && is_keystroke_binding()) {
        if(e.which == keystroke) {
          magic(val);
          return;
        }
      } else {
        magic(val);
      }
    }

    function magic(val) {
      var match = false;
      if(config.matches.test(val)) {
        match = true;
      }
      config.call(match, val, config);
      return;
    }
        
    obj.bind(config.bind, keybinding);
    
    /* ---------- Helpers */
    
    function is_keystroke_binding() {
      var e = config.bind;
      return ( (e == 'keyup') || (e == 'keydown') || (e == 'keyup') );
    }
    
    function is_numeric(val) {
      if (isNaN(parseFloat(val))) {
        return false;
      }
      return true;
    }
    
    function keystroke_from_config() {
      var config_keystroke = config.on;
      if(is_numeric(config.on)) {
        return config_keystroke;
      } else if(!config.on) {
        return false;
      } else {
        switch(config_keystroke) {
          case 'comma' :
            return 188;
            break;
          case 'tab' :
            return 224;
            break;
          case 'enter' :
            return 12;
            break;
          default:
            return 32; // space
        }
      }
    } 

  }
  
})(jQuery);