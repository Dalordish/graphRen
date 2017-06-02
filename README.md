# graphRen
A D3 Force graph renderer thingy

Reading from a local file requires a webserver to host the webpage. I personally reccomend using something like the chrome extention "Web Server For chrome" : https://chrome.google.com/webstore/detail/web-server-for-chrome/, as you don't need a full blown webserver like nginx or apache.

If you do not serve the files from a localhost webserver or use certain flags in browsers such as chrome, you will get a XMLHttpRequest cannot load file:///myDir/graphRen/basic.html. Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.
Error.


Currently the script loads from a .json file that must be named graph.json. You can manually edit this in script.js if you need to.

# Key Commands

Hover over a node to highlight directly connected nodes and edges, click on it to highlight it

Click and drag nodes to move them with d3 force.

Doubleclick on a node to Focus the graph on it

## Shape views

C : Toggle view of Circle nodes

S : Toggle view of Square nodes

T : Toggle view of Triangle-Up nodes

D: Toggle view of Triangle-Down ondes

R : toglge view of Diamond nodes

X : Toggle view of Cross nodes

**NB there are more, need to be added to doccumentation.
            
# Working with networkX:

```
from networkx.readwrite import json_graph
with open('graph.json', 'w') as outfile:
    json.dump(json_graph.node_link_data(G), outfile)
```

# Graph attributes

## Node properties

Node labels : label

Node colors : color (either text or hex code)

Circle
Square
Triangle-Up
Diamond
Cross
Triangle-Down


Shape of node : shape

## Edge properties

Edge labels : label

Edge colors : color (edge properity)

## Graph properties

Directedness : Graph 


# Misc

Note that animation is not yet implemented

Note that cycles and node self links may not render correctly as pathing has not been implemented, which means all edge-links are straight
