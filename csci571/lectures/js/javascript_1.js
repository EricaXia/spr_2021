// for xem
// https://bytes.usc.edu/~saty/tools/xem/run.html?x=bare
function o() {
    this.x=5;
    this.y = function() {
      this.x*=2;
    }
  }

  var t = new o();
  prtt(t) 
  t.y();
  prtt(t)    

  //!!
  t.z = function() {
    this.x*=5;
  }
  t.z();
  prtt(t)

  //!!
  o.prototype.m = function(){
    this.x *=10;
  }

  t.m();//!!
prtt(t)
  

// JSON Examples

 // object spec
 var o =  {
  x:5,
  y:function() {
    this.x*=2;
  }
}

// JSON eqvt
prtt( JSON.stringify(o))