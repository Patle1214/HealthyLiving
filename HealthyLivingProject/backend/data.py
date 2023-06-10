import json
#def test(location,goal):
def test(goal):
    with open('result.json') as json_file:
        data = json.load(json_file)
        if goal == 'Gain muscle' or goal == 'Just trying to be healthy!':
            for i in data:
                if data[i] != {}:
                    for j in data[i]:
                        data[i][j] = list(filter(lambda item: item[3] is not None and (item[3][1] != 0 or item[3][0] != 0.0),data[i][j]))
              
                        data[i][j] = sorted(data[i][j], key = (lambda x:x[3][1]/x[3][0]),reverse=True)
        else:
            for i in data:
                if data[i] != {}:
                    for j in data[i]:
                        data[i][j] = list(filter(lambda item: item[3] is not None and (item[3][1] != 0 or item[3][0] != 0.0),data[i][j]))
                        data[i][j] = sorted(data[i][j], key = lambda x:(x[3][1]/x[3][0], x[3][2]),reverse=True)
        return data
    
# print(test("IRVINE"))