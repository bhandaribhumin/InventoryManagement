var Cli = require('Cli');

describe('My application.', function() {

  beforeEach(function() {
    cli = new Cli();
    spyOn(cli, 'quit');
  });

  describe('Cli #promptUser', function() {
    it('input of lower-case q calls cli.quit()', function() {  
      process.stdout.once('write', function() {
        process.stdin.write("q\n");
      });
      cli.promptUser();
      expect(cli.quit).toHaveBeenCalled();
    });
  });
}); 