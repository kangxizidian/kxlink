/** @jsx React.DOM */
var j13buttons=Require("j13buttons");
var surface=Require("surface");
var $=Require("jquery")
var j13 = React.createClass({
  getInitialState: function() {
    return {start:this.props.start} 
  },
  onSelection:function(start,len) {
    this.props.onJ13Selection(start,len);
    //this.setState({selstart:start,sellength:len,scrollto:false})
  }, 
  onShowPage:function(name) {
    //var page=this.props.doc.findPage(name);
    //this.setState({page:page,selstart:0,sellength:0})
    this.props.openJ13(name,0,0);
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
    //<j13buttons onShowPage={this.onShowPage}/> 
    var pagename=this.props.page?this.props.page.getName():" ";
    return (  
      <div>十三經 
       <span className="pagename label label-success">{pagename}</span>
       <span>{this.props.start+":"+this.props.len}</span>
            
        <surface ref="surface" 
            selstart={this.props.start} 
            sellength={this.props.len}
            onSelection={this.onSelection} 
            className="surface" page={this.props.page}
            scrollto={this.props.scrollto}/>
      </div>
    );
  }
});
module.exports=j13;