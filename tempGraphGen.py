###
#TEMP PYTHON FILE TO GENERATE TEST GRAPHS
#
###

import networkx as nx
from networkx.readwrite import json_graph
from networkx.drawing.nx_pydot import write_dot
import pydotplus

import matplotlib
import matplotlib.pyplot as plot
import matplotlib.animation as animation

from collections import deque, defaultdict
import time
import heapq
import json
import random
random.seed(1)
def show(G, node_attribute = "id", edge_attribute = "label"): #Don't touch, show function

    layout = nx.spring_layout(G)

    for v, data in G.nodes(data = True):
        if "x" in data:
            layout[v] = [data["x"], layout[v][1]]
        if "y" in data:
            layout[v] = [layout[v][0], data["y"]]

    node_colors = [G.node[v].get("color", "white") for v in G.nodes()]
    edge_colors = [G.edge[e[0]][e[1]].get("color", "black") for e in G.edges()]
    
    node_labels = dict((v, v if node_attribute == "id" else G.node[v].get(node_attribute, v))
        for v in G.nodes())
    edge_labels = dict((e, G.edge[e[0]][e[1]].get(edge_attribute, "")) for e in G.edges())    
    
    nx.draw(G, layout, node_color = node_colors, edge_color = edge_colors)
    nx.draw_networkx_labels(G, layout, node_labels)
    nx.draw_networkx_edge_labels(G, layout, edge_labels)
    
    
    plot.show()
    

G = nx.Graph()
G.add_edge("0","1")
G.add_edge("1","0")
G.add_edge("0","0")
'''
for i in range(0,10):
	rand = random.randint(0,3)
	if rand == 1:
		G.add_node(i, type = "square",color = "blue",label = i)
	elif rand == 2:
		G.add_node(i, type = "diamond",color = "red",label = i)
	elif rand==3:
		G.add_node(i, type = "circle",color = "yellow",label = i)
	else:
		G.add_node(i, type = "diamond",color = "green",label = i)
	for j in range(0,random.randint(0,5)):
		G.add_edge(i,j, color = 'yellow')
'''
with open('basic.json', 'w') as outfile:
    json.dump(json_graph.node_link_data(G), outfile)

show(G)