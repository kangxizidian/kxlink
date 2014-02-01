/** @jsx React.DOM */
var j13buttons=Require("j13buttons");
var surface=Require("surface");

var j13 = React.createClass({
  getInitialState: function() {
    return {page:this.props.page, scrollto:false,selstart:0,sellength:0 } 
  },
  onSelection:function(start,len) {
    this.setState({selstart:start,sellength:len,scrollto:false})
  },
  onShowPage:function(name) {
    var page=this.props.doc.findPage(name);
    this.setState({page:page,selstart:0,sellength:0})
  },
  componentWillUpdate:function() {
    if (this.props.page)  this.state.page=this.props.page;
    if (this.props.start) {
      this.state.selstart=this.props.start;
      this.state.scrollto=true;
    }
    if (this.props.len) this.state.sellength=this.props.len;
  },
  shouldComponentUpdate:function(nextProps,nextState) {
    return nextProps.page!=this.props.page
   || nextProps.start!=this.props.start
   || nextProps.scrollto;
  },
  render: function() {
    if (!this.state.page) {
      this.state.page=this.props.page;
      this.state.selstart=this.props.start;
      this.state.sellength=this.props.len;
      this.state.scrollto=true;
    }
    var pagename=this.state.page?this.state.page.getName():" ";
    return (
      <div>十三經 
       <span className="pagename label label-success">{pagename}</span><span>{this.state.selstart+":"+this.state.sellength}</span>
       <j13buttons onShowPage={this.onShowPage}/>      
        <surface ref="surface" 
            selstart={this.state.selstart} 
            sellength={this.state.sellength}
            onSelection={this.onSelection} 
            className="surface" page={this.state.page}
            scrollto={this.state.scrollto}/>
      </div>
    );
  }
});
module.exports=j13;