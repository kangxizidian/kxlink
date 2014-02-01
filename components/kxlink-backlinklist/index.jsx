/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var backlinklist = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  links:function() {
    if (! this.props.links) return;
    return this.props.links.map(function(L,i){
      return <a key={i} className="btn btn-info"
      data-start={L.start}
      data-len={L.len}>{L.name}</a>
    })
  },
  dolink:function(e) {
    var pagename=e.target.innerHTML;
    this.props.openKangxi(pagename
      , parseInt(e.target.getAttribute('data-start'),10)
      , parseInt(e.target.getAttribute('data-len'),10));
  },
  render: function() {
    return (
      <div onClick={this.dolink}>
        {this.links()} 
      </div>
    );
  }
});
module.exports=backlinklist;