d3.flowchart = function() {
  var flowchart = {},
      nodeWidth = 24,
      nodePadding = [ 2 , 8 ],
      size = [1, 1],
      deltax = 0,
      dy = 10,
      sortType = "values" ,
      nodes = [],
      links = [];


  flowchart.nodeWidth = function(_) {
    if (!arguments.length) return nodeWidth;
    nodeWidth = +_;
    return flowchart;
  };

  flowchart.nodePadding = function(_) {
    if (!arguments.length) return nodePadding;
    nodePadding = _;
    return flowchart;
  };

  flowchart.dy = function(_) {
    if (!arguments.length) return dy;
    dy = _;
    return flowchart;
  }

  flowchart.deltax = function(_) {
    if (!arguments.length) return deltax;
    deltax = _;
    return flowchart;
  }

  flowchart.sortType = function(_) {
    if(!arguments.length) return sortType;
    sortType = _;
    console.log( "Setting sort type to " + sortType );
    return flowchart;
  }

  flowchart.nodes = function(_) {
    if (!arguments.length) return nodes;
    nodes = _;
    return flowchart;
  };

  flowchart.links = function(_) {
    if (!arguments.length) return links;
    links = _;
    return flowchart;
  };

  flowchart.link = function() {
    var curvature = .5;

    function link(d) {
      var x0 = d.source.x + d.source.dx,
          x1 = d.target.x,
          xi = d3.interpolateNumber(x0, x1),
          x2 = xi(curvature),
          x3 = xi(1 - curvature),
          y0 = d.source.y + d.source.dy / 2.0,
          y1 = d.target.y + d.target.dy / 2.0;
      return "M" + x0 + "," + y0
           + "C" + x2 + "," + y0
           + " " + x3 + "," + y1
           + " " + x1 + "," + y1;
    }

    link.curvature = function(_) {
      if (!arguments.length) return curvature;
      curvature = +_;
      return link;
    };

    return link;
  }

  flowchart.size = function(_) {
    if (!arguments.length) return size;
    size = _;
    return flowchart;
  };

  flowchart.layout = function() {
    computeNodeLinks();
    computeNodePositions();
  }

  function computeNodePositions() {
    var nested_nodes = d3.nest()
      .key( function(d) { return d.generation;} )
      .sortValues( function(d1,d2) { return d1.value > d2.value; } )
      .entries( nodes );

    console.log( "computeNodePosition with " + sortType );

    var n = nested_nodes.length;
    deltax = ( size[0] - n * nodeWidth - (n-1) * 2 * nodePadding[0] ) / (n-1);
    for( var i=0 ; i<n ; ++i )
    {
      for( var j=0 ; j<nested_nodes[i].values.length ; ++j )
      {
        var node = nested_nodes[i].values[j];
        node.x = i * ( nodeWidth + 2 * nodePadding[0] + deltax );
        if( ( sortType == "sorted" ) || ( sortType == "unsorted" ) ) {
          node.y = dy + j * ( dy + nodePadding[1] );
        }
        else {
          node.y = ( node.value ) * size[1];
        }
        node.dx = nodeWidth;
        node.dy = dy;
      }
    }
  }


  function computeNodeLinks() {
    nodes.forEach(function(node) {
      node.sourceLinks = [];
      node.targetLinks = [];
    });
    links.forEach(function(link) {
      var source = link.source,
          target = link.target;
      if (typeof source === "number") source = link.source = nodes[link.source];
      if (typeof target === "number") target = link.target = nodes[link.target];
      source.sourceLinks.push(link);
      target.targetLinks.push(link);
      link.dy = dy;
    });
  }


  return flowchart;
}
