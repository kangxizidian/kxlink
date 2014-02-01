/** @jsx React.DOM */


var help=Require("help");
var kangxibuttons=Require("kangxibuttons");
var surface=Require("surface");
var kangxi = React.createClass({
  getInitialState: function() {
    return { page:this.props.page,selstart:0,sellength:0,scrollto:false }
  },
  onSelection:function(start,len) {
    this.setState({selstart:start,sellength:len})
  }, 
  onLink:function(payload) {
    this.props.openJ13(payload.name,payload.start,payload.len);
  },
  onShowPage:function(name) {
    var page=this.props.doc.findPage(name);
    this.setState({page:page});
  },
  componentWillUpdate:function() {
    if (this.props.page)  this.state.page=this.props.page;
    if (this.props.start) {
      this.state.selstart=this.props.start;
      this.state.scrollto=true;
    } 
    if (this.props.len) this.state.sellength=this.props.len;
  },
  render: function() {
    if (!this.state.page) {
      this.state.page=this.props.page;
      this.state.selstart=this.props.start;
      this.state.sellength=this.props.len;
      //this.state.scrollto=true;
    }
    var pagename=this.state.page?this.state.page.getName():" ";
    return (
      <div>
        開放康熙字典<span className="pagename label label-success">{pagename}</span><span>{this.state.selstart}:{this.state.sellength}</span>      
        <kangxibuttons onShowPage={this.onShowPage}/>
        
       <surface 
            selstart={this.state.selstart} 
            sellength={this.state.sellength}
            onLink={this.onLink}
            onSelection={this.onSelection} 
            className="surface" 
            page={this.props.page||this.state.page}
            scrollto={this.state.scrollto}/>
      </div>
    );
  }
});
module.exports=kangxi;