# jquery.serialize-json.js

jquery.serialize-json.js is a jQuery plugin that helps you build a JavaScript object from a form's fields.

## Requirements

* [jQuery](http://jquery.com)

## Usage

### $.fn.serializeJSON()

Given the following HTML:

    <html>
      <body>
        <form>
          <input type="hidden" name="token" value="abc123"/>
          <input type="text" name="user[first_name]" value="John"/>
          <input type="text" name="user[last_name]" value="Doe"/>
          <input type="text" name="user[address][city]" value="New York"/>
          <input type="text" name="user[aliases][]" value="Jon"/>
          <input type="text" name="user[aliases][]" value="Johnny"/>
        </form>
      </body>
    </html>

Select the form with jQuery and call `serializeJSON()`:

    var form = $('form').serializeJSON();

    form == {
      token: 'abc123',
      user: {
        first_name: 'John',
        last_name: 'Doe',
        address: {
          city: 'New York'
        },
        aliases: [
          'Jon',
          'Johnny'
        ]
      }
    };

## License

jquery.serialize-json.js is available under the MIT license.
