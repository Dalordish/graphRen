var w = window.innerWidth;
var h = window.innerHeight;

var keyc = true,
    keys = true,
    keyt = true,
    keyr = true,
    keyx = true,
    keyd = true, 
    keyl = true,
    keym = true,
    keyh = true,
    key1 = true,
    key2 = true,
    key3 = true,
    key0 = true

var focus_node = null,
    highlight_node = null;

var text_center = false;
var outline = false;

var min_score = 0;
var max_score = 1;
var hexMatch = /[0-9A-F]{6}/

function colorNameToHex(col)
{
    var colors = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee", 
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};
    if (col === undefined) {
        return false;
    }
    if (typeof colors[col.toLowerCase()] !== 'undefined') 
        return colors[col.toLowerCase()];

    return false;
}
/** legacy color function based on score
var color = d3.scale.linear()
    .domain([min_score, (min_score + max_score) / 2, max_score])
    .range(["lime", "yellow", "red"]);
**/
var color = function(colorVal) {
    if (hexMatch.test(colorVal)) {
        return colorVal
    }
    else {
        return colorNameToHex(colorVal) //colorNameToHex returns false if not in table
    }
}


/**
d3.scale.linear()
    .domain([min_score, (min_score + max_score) / 2, max_score])
    .range(["lime", "yellow", "red"]);
    **/

var highlight_color = "blue";
var highlight_trans = 0.1;

var size = d3.scale.pow().exponent(1)
    .domain([1, 100])
    .range([8, 24]);

var force = d3.layout.force()
    .linkDistance(60)
    .charge(-300)
    .size([w, h]);

var default_node_color = "#ccc";
//var default_node_color = "rgb(3,190,100)";
var default_link_color = "#888";
var nominal_base_node_size = 8;
var nominal_text_size = 10;
var max_text_size = 24;
var nominal_stroke = 1.5;
var max_stroke = 4.5;
var max_base_node_size = 36;
var min_zoom = 0.1;
var max_zoom = 7;
var svg = d3.select("body").append("svg");
var zoom = d3.behavior.zoom().scaleExtent([min_zoom, max_zoom])
var g = svg.append("g");
svg.style("cursor", "move");

//Digraph arrows test
svg.append("defs").selectAll("marker")
    .data(["suit", "licensing", "resolved"])
  .enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 20)
    .attr("refY", 0)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .attr("position",10)
  .append("path")
    .attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
    .style("stroke", "#4679BD")
    .style("opacity", "0.5");



d3.json("basic.json", function(error, graph) {
    var linkedByIndex = {};
    graph.links.forEach(function(d) {
        linkedByIndex[d.source + "," + d.target] = true;
    });

    function isConnected(a, b) {
        return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
    }

    function hasConnections(a) {
        for (var property in linkedByIndex) {
            s = property.split(",");
            if ((s[0] == a.index || s[1] == a.index) && linkedByIndex[property]) return true;
        }
        return false;
    }

    force
        .nodes(graph.nodes)
        .links(graph.links)
        .start();

    var linkText = g.selectAll(".link")
        .data(graph.links)
        .enter().append("text")
        .attr("class", "link-label")
        .attr("font-family", "Arial, Helvetica, sans-serif")
        .attr("fill", "Black")
        .style("font", "normal 4px Arial")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function(d) {
            console.log("text is d")
            //return "meme";
        });

    var link = g.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link")

        .style("stroke-width", nominal_stroke)
        .style("stroke", function(d) {
            if (color(d.color)) return color(d.color);
            else return default_link_color;
        })
        .style("marker-end",  function(d) { // if digraph, return style marker-end as marker
            if (graph.directed === true) {
                return "url(#suit)"
            }
            else {
                return "0"
            }

        }) // Modified line 

    var nodes = force.nodes()
    var links = force.links()
    var node = g.selectAll(".node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")

    .call(force.drag)


    node.on("dblclick.zoom", function(d) {
        d3.event.stopPropagation();
        var dcx = (window.innerWidth / 2 - d.x * zoom.scale());
        var dcy = (window.innerHeight / 2 - d.y * zoom.scale());
        zoom.translate([dcx, dcy]);
        g.attr("transform", "translate(" + dcx + "," + dcy + ")scale(" + zoom.scale() + ")");


    });




    var tocolor = "fill";
    var towhite = "stroke";
    if (outline) {
        tocolor = "stroke"
        towhite = "fill"
    }



    var circle = node.append("path")


    .attr("d", d3.svg.symbol()
        .size(function(d) {
            return Math.PI * Math.pow(size(d.size) || nominal_base_node_size, 2);
        })
        .type(function(d) {
            return d.type;
        }))

    .style(tocolor, function(d) {
            if (color(d.color)) return color(d.color);
            else return default_node_color;
        })
        //.attr("r", function(d) { return size(d.size)||nominal_base_node_size; })
        .style("stroke-width", nominal_stroke)
        .style(towhite, "white");


    var text = g.selectAll(".text")
        .data(graph.nodes)
        .enter().append("text")
        .attr("dy", ".35em")
        .style("font-size", nominal_text_size + "px")

    if (text_center)
        text.text(function(d) {
            return d.id;
        })
        .style("text-anchor", "middle");
    else
        text.attr("dx", function(d) {
            return (size(d.size) || nominal_base_node_size);
        })
        .text(function(d) {
            return '\u2002' + d.id;
        });

    node.on("mouseover", function(d) {
            set_highlight(d);
        })
        .on("mousedown", function(d) {
            d3.event.stopPropagation();
            focus_node = d;
            set_focus(d)
            if (highlight_node === null) set_highlight(d)

        }).on("mouseout", function(d) {
            exit_highlight();

        });

    //ANIM

    setInterval(function() {
        console.log(nodes)
        myNode = {id: "asdf"}
        nodes.push(myNode)
        links.push({source: myNode, target: 0})
    }, 3000);
    /**
    setInterval(function() {
        node[0].shift();
        restart()
    }, 6000);
**/
    function restart() {
        node = node.data(nodes);
        node.enter().insert("circle", ".cursor")
            .attr("class", "node")  
            .attr("r",5)
        node.exit()
            .remove();

            link = link.data(links);

            link.enter().insert("line", ".node")
                .attr("class", "link");
               link.exit()
                    .remove();
        
        force.start(); 
    }


    //ANIM
    d3.select(window).on("mouseup",
        function() {
            if (focus_node !== null) {
                focus_node = null;
                if (highlight_trans < 1) {

                    circle.style("opacity", 1);
                    text.style("opacity", 1);
                    linkText.style("opacity", 1)
                    link.style("opacity", 1);
                }
            }

            if (highlight_node === null) exit_highlight();
        });

    function exit_highlight() {
        highlight_node = null;
        if (focus_node === null) {
            svg.style("cursor", "move");
            if (highlight_color != "white") {
                circle.style(towhite, "white");
                text.style("font-weight", "normal");
                linkText.style("font-weight", "normal");
                link.style("stroke", function(o) { 
                    if (color(o.color)) return color(o.color);
                        else return default_link_color;
                });
            }

        }
    }

    function set_focus(d) {
        if (highlight_trans < 1) {
            circle.style("opacity", function(o) {
                return isConnected(d, o) ? 1 : highlight_trans;
            });

            text.style("opacity", function(o) {
                return isConnected(d, o) ? 1 : highlight_trans;
            });
            linkText.style("opacity", function(o) {
                return isConnected(d, o) ? 1 : highlight_trans;
            });

            link.style("opacity", function(o) {
                return o.source.index == d.index || o.target.index == d.index ? 1 : highlight_trans;
            });
        }
    }


    function set_highlight(d) {
        svg.style("cursor", "pointer");
        if (focus_node !== null) d = focus_node;
        highlight_node = d;

        if (highlight_color != "white") {
            circle.style(towhite, function(o) {
                return isConnected(d, o) ? highlight_color : "white";
            });
            text.style("font-weight", function(o) {
                return isConnected(d, o) ? "bold" : "normal";
            });
            //!IMPORTANT! THIS DOES NOT WORK BECAUSE IT'S LOOKING TO SEE IF THE TWO NODES ARE CONNECTED
            linkText.style("font-weight", function(o) {
                return isConnected(d, o) ? "bold" : "normal";
            });
            link.style("stroke", function(o) {
                return o.source.index == d.index || o.target.index == d.index ? highlight_color : ((color(o.color)) ? color(o.color) : default_link_color);

            });
        }
    }


    zoom.on("zoom", function() {

        var stroke = nominal_stroke;
        if (nominal_stroke * zoom.scale() > max_stroke) stroke = max_stroke / zoom.scale();
        link.style("stroke-width", stroke);
        circle.style("stroke-width", stroke);

        var base_radius = nominal_base_node_size;
        if (nominal_base_node_size * zoom.scale() > max_base_node_size) base_radius = max_base_node_size / zoom.scale();
        circle.attr("d", d3.svg.symbol()
            .size(function(d) {
                return Math.PI * Math.pow(size(d.size) * base_radius / nominal_base_node_size || base_radius, 2);
            })
            .type(function(d) {
                return d.type;
            }))

        //circle.attr("r", function(d) { return (size(d.size)*base_radius/nominal_base_node_size||base_radius); })
        if (!text_center) text.attr("dx", function(d) {
            return (size(d.size) * base_radius / nominal_base_node_size || base_radius);
        });

        var text_size = nominal_text_size;
        if (nominal_text_size * zoom.scale() > max_text_size) text_size = max_text_size / zoom.scale();
        text.style("font-size", text_size + "px");

        g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    });

    svg.call(zoom);

    resize();
    //window.focus();
    d3.select(window).on("resize", resize).on("keydown", keydown);

    force.on("tick", function() {
        restart()
        //updates to all for animation
        linkText
            .attr("x", function(d) {
                return ((d.source.x + d.target.x) / 2);
            })
            .attr("y", function(d) {
                return ((d.source.y + d.target.y) / 2);
            });
        //
        node.attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
        text.attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

        link.attr("x1", function(d) {
                return d.source.x;
            })
            .attr("y1", function(d) {
                return d.source.y;
            })
            .attr("x2", function(d) {
                return d.target.x;
            })
            .attr("y2", function(d) {
                return d.target.y;
            })
            link.attr("d", function(d) {
                return "M0,-5L2.333333333333333,-10.25C4.666666666666666,-15.5,9.333333333333332,-26,6.999999999999999,-31.249999999999996C4.666666666666666,-36.5,-4.666666666666666,-36.5,-6.999999999999999,-31.249999999999996C-9.333333333333332,-26,-4.666666666666666,-15.5,-2.333333333333333,-10.25L0,-5"
            })


        node.attr("cx", function(d) {
                return d.x;
            })
            .attr("cy", function(d) {
                return d.y;
            });
    });

    function resize() {
        var width = window.innerWidth,
            height = window.innerHeight;
        svg.attr("width", width).attr("height", height);

        force.size([force.size()[0] + (width - w) / zoom.scale(), force.size()[1] + (height - h) / zoom.scale()]).resume();
        w = width;
        h = height;
    }

    function keydown() {
        if (d3.event.keyCode == 32) {
            force.stop();
        } else if (d3.event.keyCode >= 48 && d3.event.keyCode <= 90 && !d3.event.ctrlKey && !d3.event.altKey && !d3.event.metaKey) {
            switch (String.fromCharCode(d3.event.keyCode)) {
                case "C":
                    keyc = !keyc;
                    break;
                case "S":
                    keys = !keys;
                    break;
                case "T":
                    keyt = !keyt;
                    break;
                case "R":
                    keyr = !keyr;
                    break;
                case "X":
                    keyx = !keyx;
                    break;
                case "D":
                    keyd = !keyd;
                    break;
                case "L":
                    keyl = !keyl;
                    break;
                case "M":
                    keym = !keym;
                    break;
                case "H":
                    keyh = !keyh;
                    break;
                case "1":
                    key1 = !key1;
                    break;
                case "2":
                    key2 = !key2;
                    break;
                case "3":
                    key3 = !key3;
                    break;
                case "0":
                    key0 = !key0;
                    break;
            }

            link.style("display", function(d) {
                var flag = vis_by_type(d.source.type) && vis_by_type(d.target.type) && vis_by_node_score(d.source.score) && vis_by_node_score(d.target.score) && vis_by_link_score(d.score);
                linkedByIndex[d.source.index + "," + d.target.index] = flag;
                return flag ? "inline" : "none";
            });
            node.style("display", function(d) {
                return (key0 || hasConnections(d)) && vis_by_type(d.type) && vis_by_node_score(d.score) ? "inline" : "none";
            });
            text.style("display", function(d) {
                return (key0 || hasConnections(d)) && vis_by_type(d.type) && vis_by_node_score(d.score) ? "inline" : "none";
            });
            linkText.style("display", function(d) {
                return (key0 || hasConnections(d)) && vis_by_type(d.type) && vis_by_node_score(d.score) ? "inline" : "none";
            });
            if (highlight_node !== null) {
                if ((key0 || hasConnections(highlight_node)) && vis_by_type(highlight_node.type) && vis_by_node_score(highlight_node.score)) {
                    if (focus_node !== null) set_focus(focus_node);
                    set_highlight(highlight_node);
                } else {
                    exit_highlight();
                }
            }

        }
    }

});

function vis_by_type(type) {
    switch (type) {
        case "circle":
            return keyc;
        case "square":
            return keys;
        case "triangle-up":
            return keyt;
        case "diamond":
            return keyr;
        case "cross":
            return keyx;
        case "triangle-down":
            return keyd;
        default:
            return true;
    }
}

function vis_by_node_score(score) {
    if (isNumber(score)) {
        if (score >= 0.666) return keyh;
        else if (score >= 0.333) return keym;
        else if (score >= 0) return keyl;
    }
    return true;
}

function vis_by_link_score(score) {
    if (isNumber(score)) {
        if (score >= 0.666) return key3;
        else if (score >= 0.333) return key2;
        else if (score >= 0) return key1;
    }
    return true;
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}