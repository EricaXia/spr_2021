function o() {
    this.x=5;
    this.y = function() {
      this.x*=2;
    }
  }

  var t = new o();
  document.write('This is t.x before calling y(): </br>');
  document.write(t.x + '</br>');
  document.write('This is t.x after calling y(): </br>');
  t.y();
  document.write(t.x);