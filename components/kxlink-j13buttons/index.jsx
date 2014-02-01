/** @jsx React.DOM */

//var othercomponent=Require("other");  
var j13buttons = React.createClass({
  getInitialState: function() {
    return {pagename: this.props.pagename};
  },
  fetchpage:function(e) {
    var pagename=e.target.innerHTML;
    this.goPage(pagename);
  },
  goPage:function(pagename) {
    this.props.onShowPage(pagename);
    this.setState({pagename:pagename})
  },

  render: function() {
    return ( 
      <div onClick={this.fetchpage}>
        <a className="btn btn-primary">乾</a>
        <a className="btn btn-primary">洪範</a>
        <a className="btn btn-primary">大有</a>
        <a className="btn btn-primary">武成</a>
        <a className="btn btn-primary">僖24</a>
      </div>
    );
  }
});
module.exports=j13buttons;