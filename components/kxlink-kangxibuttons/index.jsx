/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var kangxibuttons = React.createClass({
  getInitialState: function() {
    return {pagename:" "};
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
        <a className="btn btn-primary">福</a>
        <a className="btn btn-primary">威</a>
        <a className="btn btn-primary">遏</a>
        <a className="btn btn-primary">應</a>

      </div>
    );
  }
});
module.exports=kangxibuttons;