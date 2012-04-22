describe('$.fn.serializeJSON()', function() {
  var $form;

  beforeEach(function() {
    $form = $('<form></form>');
  });

  it('returns an object', function() {
    var result = $form.serializeJSON();

    expect(result).toEqual({});
  });

  describe('with simple field names', function() {
    beforeEach(function() {
      $form
        .append($('<input/>').attr('name', 'foo').val('abc'))
        .append($('<input/>').attr('name', 'bar').val('123'));
    });

    it('assigns each field value to a property matching the field name', function() {
      var result = $form.serializeJSON();

      expect(result['foo']).toEqual('abc');
      expect(result['bar']).toEqual('123');
    });
  });

  describe('with nested field names', function() {
    beforeEach(function() {
      $form
        .append($('<input/>').attr('name', 'user[first_name]').val('John'))
        .append($('<input/>').attr('name', 'user[last_name]').val('Doe'))
        .append($('<input/>').attr('name', 'user[address][city]').val('New York'));
    });

    it('creates nested objects with properties for the corresponding fields', function() {
      var result = $form.serializeJSON();

      expect(result['user']['first_name']).toEqual('John');
      expect(result['user']['last_name']).toEqual('Doe');
      expect(result['user']['address']['city']).toEqual('New York');
    });
  });

  describe('with array field names', function() {
    beforeEach(function() {
      $form
        .append($('<input/>').attr('name', 'colors[]').val('green'))
        .append($('<input/>').attr('name', 'colors[]').val('blue'))
        .append($('<input/>').attr('name', 'shapes[]').val('circle'));
    });

    it('creates an array of values', function() {
      var result = $form.serializeJSON();

      expect(result['colors']).toEqual(['green', 'blue']);
      expect(result['shapes']).toEqual(['circle']);
    });
  });
});
