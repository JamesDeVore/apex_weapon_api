import csv
import json

allGuns = {}
with open('../data/4_29_19.csv', newline='') as csvfile:
  gunFile = csv.reader(csvfile, delimiter=',', quotechar='|')
  lineCount = 0
  #gunHeaderMap = {}
  headers = []
  gunID = 0
  for row in gunFile:
    
    if lineCount == 0:
      headerIndex = 0
      for header in row:
        #make a map to make later dict creation easier
        #gunHeaderMap[headerIndex] = header
        headers.append(header)
      lineCount += 1
    else:
      #now we are onto the guns
      newGun = dict()
      headerIndex = 0
      
      newGun['id'] = gunID
      for item in row:   
        newGun[headers[headerIndex]] = item
        headerIndex +=1
      allGuns[gunID] = newGun
      gunID = gunID + 1
print(allGuns)
with open('../data/gunData.json', 'w') as outfile:
    json.dump(allGuns, outfile)
        
          
