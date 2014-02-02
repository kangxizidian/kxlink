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
  openpage:function(e) {
    var pagename=e.target.innerHTML;
    this.props.openKangxi(pagename
      , parseInt(e.target.getAttribute('data-start'),10)
      , parseInt(e.target.getAttribute('data-len'),10));
  },
  render: function() {
    var disable=this.props.linkable?"":"disabled";
    return (
      <div>
      <a className={"btn btn-primary "+disable} 
         onClick={this.props.addLink}>
       <img  src="link.png"/>
      </a>
      <div align="center" onClick={this.openpage}>
        {this.links()} 
      </div>
      </div>
    );
  }
});
module.exports=backlinklist;