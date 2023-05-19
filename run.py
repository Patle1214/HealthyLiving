
import pandas as pd
import numpy as np

def mergeDictionary(dict_1, dict_2):
   dict_3 = {**dict_1, **dict_2}
   for key, value in dict_3.items():
       if key in dict_1 and key in dict_2:
               dict_3[key] = [value , dict_1[key]]
   return dict_3

dataset = pd.read_csv("dolthub_menus_master_menu_items.csv")        #read csv
dataset = dataset.loc["CA" == np.array([i[-2:] for i in dataset["identifier"].values])]    #look for just california data
temp = [i[:-4] for i in dataset["identifier"].values]
keys = [i[i.rfind(",")+1:].strip() for i in temp]         #just take city 
dataset["identifier"] = keys    #replace info with just city in dataset

adict = {}
dataset = dataset[["name","restaurant_name","identifier","price_usd"]]
dataset = dataset.values.tolist()

for item in dataset:
    if item[2] in adict:
        adict[item[2]].append(item)
    else:
        adict[item[2]] = [item]


for i in adict:
    for j in range(len(adict[i])):
        adict[i][j] = {adict[i][j][1]:[x for k,x in enumerate(adict[i][j]) if k!=1]}

for i in adict:
    res = dict()
    for j in adict[i]:
        for x in j:
            if x in res:  
                res[x].append(j[x])
            else:
                res[x] = [j[x]]    
    adict[i]=res
def ans():
    dataset = pd.read_csv("dolthub_menus_master_menu_items.csv")        #read csv
    dataset = dataset.loc["CA" == np.array([i[-2:] for i in dataset["identifier"].values])]    #look for just california data
    temp = [i[:-4] for i in dataset["identifier"].values]
    keys = [i[i.rfind(",")+1:].strip() for i in temp]         #just take city 
    dataset["identifier"] = keys    #replace info with just city in dataset

    adict = {}
    dataset = dataset[["name","restaurant_name","identifier","price_usd"]]
    dataset = dataset.values.tolist()

    for item in dataset:
        if item[2] in adict:
            adict[item[2]].append(item)
        else:
            adict[item[2]] = [item]


    for i in adict:
        for j in range(len(adict[i])):
            adict[i][j] = {adict[i][j][1]:[x for k,x in enumerate(adict[i][j]) if k!=1]}

    for i in adict:
        res = dict()
        for j in adict[i]:
            for x in j:
                if x in res:  
                    res[x].append(j[x])
                else:
                    res[x] = [j[x]]    
        adict[i]=res
    return(adict["IRVINE"])
print(ans())
