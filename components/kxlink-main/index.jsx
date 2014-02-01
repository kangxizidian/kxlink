/** @jsx React.DOM */

var kangxi=Require("kangxi"); 
var backlinklist=Require("backlinklist"); 
var j13=Require("j13"); 
var kdoc=Require("yaml").kdoc;
var kangxipages=Require("kxlink/kangxipages");
var j13pages=Require("kxlink/j13pages"); 
var markups=Require("kxlink/markups"); 
var main = React.createClass({
  getInitialState: function() {
    return { };
  }, 
  render: function() {
    return (
      <div className="main row">
        <div ref="kangxidiv" className="kangxi col-md-6">
        <kangxi 
          openJ13={this.openJ13} 
          page={this.state.kxpage} 
          start={this.state.kxstart} 
          len={this.state.kxlen} 
          doc={this.state.kangxi}
          />
        </div>
        <div className="col-md-1"><backlinklist links={this.state.backlink} openKangxi={this.openKangxi} /></div>
        <div ref="j13div" className="j13 col-md-5">
          <j13 
            page={this.state.j13page} 
            start={this.state.j13start} 
            len={this.state.j13len} 
            doc={this.state.j13}/>
        </div>
      </div>
    );
  },
  loadmarkup:function() {
    for (var i in markups) {
      var m=markups[i];
      var page=this.state.kangxi.findPage(m.name);
      page.addMarkup(m.start,m.len,m.payload);
    }
  },
  findBacklink:function(name) {
    var out=[];
    for (var i in markups) {
      var m=markups[i];
      if (m.payload.name==name) {
        out.push(m);
      }
    }
    return out;
  },
  openJ13:function(name,start,len) {
    var page=this.state.j13.findPage(name);
    var backlink=this.findBacklink(name);
    this.setState({j13page:page,j13start:start,j13len:len,backlink:backlink})
  },
  openKangxi:function(name,start,len) {
    var page=this.state.kangxi.findPage(name);
    this.setState({kxpage:page,kxstart:start,kxlen:len})
  },
  loaddoc:function() {
    this.state.j13=kdoc.createDocument().createPages(j13pages);
    this.state.kangxi=kdoc.createDocument().createPages(kangxipages);
  },
  componentWillMount:function() {
    this.loaddoc();
    this.loadmarkup();
  }
});
module.exports=main;