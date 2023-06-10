
import pandas as pd
import numpy as np
import requests
import re
import json 

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

def stats(query):
    api_url = 'https://api.api-ninjas.com/v1/nutrition?query={}'.format(query)
    response = requests.get(api_url, headers={'X-Api-Key': 'MKa1tulFrMzU/j4DIxjHrw==HIlnJuxxg5rGtspk'})
    if response.status_code == requests.codes.ok:
        print("response:",eval(response.text))
        if eval(response.text) == []:
            return None
        return([eval(response.text)[0]["calories"],eval(response.text)[0]["protein_g"],eval(response.text)[0]["sugar_g"]])
    else:
        return(None)

def get_json():
    dataset = pd.read_csv("dolthub_menus_master_menu_items.csv")        #read csv
    dataset = dataset.loc["CA" == np.array([i[-2:] for i in dataset["identifier"].values])]    #look for just california data
    temp = [i[:-4] for i in dataset["identifier"].values]
    keys = [i[i.rfind(",")+1:].strip() for i in temp]         #just take city 
    dataset["identifier"] = keys    #replace info with just city in dataset
    count = 0
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
                if j[x][1] in ["ANAHEIM","NEWPORT BEACH","TUSTIN","IRVINE","LONG BEACH", "COSTA MESA", "ORANGE","LAGUNA HILLS","LAGUNA BEACH","LAKE FOREST","FOUNTAIN VALLEY","GARDEN GROVEcl"]:
                    count += 1
                    if x in res:
                        if type(j[x][0]) == str:
                            match = re.search(r"[0-9]+OZ|[0-9]+.[0-9]+OZ|[0-9]+ OZ|[0-9]+.[0-9]+ OZ",j[x][0])
                            if match != None:
                                astring =  match.string[0:match.span()[0]] + match.string[match.span()[1]:len(match.string)]
                                j[x][0] = astring
                                j[x].append(stats(astring))
                                res[x].append(j[x])

                            else:
                                j[x].append(stats(j[x][0]))
                                res[x].append(j[x])

                    else:
                        if type(j[x][0]) == str:
                            match = re.search(r"[0-9]+OZ|[0-9]+.[0-9]+OZ|[0-9]+ OZ|[0-9]+.[0-9]+ OZ",j[x][0])
                            if match != None:
                                astring = match.string[0:match.span()[0]] + match.string[match.span()[1]:len(match.string)]
                                j[x][0] = astring
                                j[x].append(stats(j[x][0]))
                                res[x] = [j[x]]
                            else:
                                j[x].append(stats(j[x][0]))
                                res[x]= [j[x]]
        adict[i]=res
    with open('result.json', 'w') as fp:
        json.dump(adict, fp)
    


def test(location):
    with open('result.json') as json_file:
        data = json.load(json_file)
        return(data[location])

print(test("IRVINE"))

