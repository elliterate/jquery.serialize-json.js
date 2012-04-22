// jquery.serialize-json.js
//
// Copyright 2012, Ian Lesperance
// Released under the MIT license.

(function($) {
  var rHasChild = /^(\w+)\[(\w+)\]/,
    rIsArray = /^(\w+)\[\]$/;

  $.fn.serializeJSON = function() {
    var fields = this.serializeArray(),
      object = {};

    $.each(fields, function(i, field) {
      object = buildObject(object, field.name, field.value);
    });

    return object;
  };

  function buildObject(object, name, value) {
    var matches,
      childName,
      oldValue;

    if (matches = name.match(rHasChild)) {
      childName = name.replace(rHasChild, matches[2]);
      name = matches[1];

      oldValue = object[name] || {};

      value = buildObject(oldValue, childName, value);
    } else if (matches = name.match(rIsArray)) {
      name = matches[1];

      oldValue = object[name] || [];
      oldValue.push(value);

      value = oldValue;
    }

    object[name] = value;

    return object;
  }
})(jQuery);
