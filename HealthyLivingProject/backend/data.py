import json
#def test(location,goal):
def test():
    with open('result.json') as json_file:
        data = json.load(json_file)
        #if goal == 1: #bulk
            #sort(data[location],calories/protein)
        #return(data[location])
        return data
    
# print(test("IRVINE"))