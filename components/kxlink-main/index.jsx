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
    return { kxstart:0,kxlen:0,j13start:0,j13len:0};
  }, 
  render: function() {
    return (
      <div className="main row">
        <div ref="kangxidiv" className="kangxi col-md-6">
        <kangxi 
          openJ13={this.openJ13} 
          openKangxi={this.openKangxi} 
          onKxSelection={this.onKxSelection}
          page={this.state.kxpage} 
          start={this.state.kxstart} 
          len={this.state.kxlen}
          scrollto={this.state.kxscrollto} />
        </div>
        <div className="col-md-1"><backlinklist 
          links={this.state.backlink} 
          linkable={this.linkable()}
          addLink={this.addLink} 
          linkchar={this.linkchar()}
          openKangxi={this.openKangxi} />
        </div>
        <div ref="j13div" className="j13 col-md-5">
          <j13 
            openJ13={this.openJ13} 
            openKangxi={this.openKangxi} 
            onJ13Selection={this.onJ13Selection}
            page={this.state.j13page} 
            start={this.state.j13start} 
            len={this.state.j13len}
            scrollto={this.state.j13scrollto} />
        </div>
      </div>
    );
  },
  linkable:function() {
    return (this.state.j13len>0 && this.state.j13start>0
            &&this.state.kxlen>0 && this.state.kxstart>0)
  },
  linkchar:function() {
    if (this.state.j13len!=1) return;
    return this.state.j13page.getInscription().substr(this.state.j13start,1)
  },
  addLink:function() {
    markups.push({
      name:this.state.kxpage.getName(),
      start:this.state.kxstart,
      len:this.state.kxlen,
      payload:{type:"link",name:this.state.j13page.getName(),
        start:this.state.j13start,
        len:this.state.j13len,
      }
    })
    this.loadmarkup();
    this.setState({kxlen:0});
  },
  onKxSelection:function(start,len){
    this.setState({kxstart:start,kxlen:len,kxscrollto:false})
  },
  onJ13Selection:function(start,len){
    this.setState({j13start:start,j13len:len,j13scrollto:false})
  },
  loadmarkup:function() {
    for (var i in markups) {
      var m=markups[i];
      var page=this.state.kangxi.findPage(m.name);
      if (page.markupAt(m.start).length==0) {
        page.addMarkup(m.start,m.len,m.payload,false);
      }
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
    var that=this;
    this.setState({j13page:null,j13start:0,j13len:0,backlink:null,j13scrollto:false})
    setTimeout(function(){
      that.setState({j13page:page,j13start:start,j13len:len,backlink:backlink,j13scrollto:true})
    },100)
  }, 
  openKangxi:function(name,start,len) {
    var page=this.state.kangxi.findPage(name);
    this.setState({kxpage:page,kxstart:start,kxlen:len,kxscrollto:true}) 
  }, 
  loaddoc:function() {
    this.state.j13=kdoc.createDocument().createPages(j13pages);
    this.state.kangxi=kdoc.createDocument().createPages(kangxipages);
  },
  componentWillMount:function() {
    this.loaddoc();
    this.loadmarkup();
  },
  componentDidMount:function() {
    this.openKangxi("福",0,0)
    //this.openKangxi("昭",0,0)
    this.openJ13("謙",0,0)
  }

});
module.exports=main;