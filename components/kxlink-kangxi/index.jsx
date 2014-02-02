/** @jsx React.DOM */


var help=Require("help");
var kangxibuttons=Require("kangxibuttons");
var surface=Require("surface");
var $=Require('jquery');
var kangxi = React.createClass({
  getInitialState: function() {
   // return { page:this.props.page,selstart:0,sellength:0,scrollto:false }
  },
  onSelection:function(start,len) {
    this.props.onKxSelection(start,len)
  }, 
  onLink:function(payload) {
    this.props.openJ13(payload.name,payload.start,payload.len,true);
  },
  onShowPage:function(name) {
    this.props.openKangxi(name,0,0);
  },
  shouldComponentUpdate:function(nextProps) {
    return (nextProps.page!=this.props.page
      || nextProps.start!=this.props.start
      || nextProps.len!=this.props.len)
  },
  componentDidMount:function() {
    var node=$(this.refs.surface.getDOMNode())
    node.height($(document).height()-node.offset().top-5);
  },
  render: function() {
//<kangxibuttons onShowPage={this.onShowPage}/>   
    var pagename=this.props.page?this.props.page.getName():" ";
    return (
      <div>
        開放康熙字典<span className="pagename label label-success">{pagename}</span>
        <span>{this.props.start}:{this.props.len}</span>      
     
        
       <surface ref="surface"
            selstart={this.props.start} 
            sellength={this.props.len}
            onLink={this.onLink}
            onSelection={this.onSelection} 
            className="surface" 
            page={this.props.page||this.props.page}
            scrollto={this.props.scrollto}/>
      </div>
    );
  }
});
module.exports=kangxi;