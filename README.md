# graphRen
A D3 Force graph renderer thingy

Reading from a local file requires a webserver to host the webpage. I personally reccomend using something like the chrome extention "Web Server For chrome" : https://chrome.google.com/webstore/detail/web-server-for-chrome/, as you don't need a full blown webserver like nginx or apache.

If you do not serve the files from a localhost webserver or use certain flags in browsers such as chrome, you will get a XMLHttpRequest cannot load file:///myDir/graphRen/basic.html. Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.
Error.


Currently the script loads from a .json file that must be named graph.json. You can manually edit this in script.js if you need to.


# Working with networkX:

```
from networkx.readwrite import json_graph
with open('graph.json', 'w') as outfile:
    json.dump(json_graph.node_link_data(G), outfile)
```

# Graph attributes
Graph attributes that will change:

Node labels : label

Edge labels : label

Node colors : color (either text or hex code)

Edge colors : TBD

Directedness : Graph 


# Misc

Note that animation is not yet implemented

Note that cycles and node self links may not render correctly as pathing has not been implemented, which means all edge-links are straight
