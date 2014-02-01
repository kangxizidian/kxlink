/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var help = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  render: function() {
    return (
      <div>
       HELP
      </div>
    );
  }
});
module.exports=help;