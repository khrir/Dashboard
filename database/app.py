#import\n"
import pandas as pd

# Select 10 maximum value
def mkNewCSV(url):
    data = pd.read_csv(url)
    newData = data.sort_values(max(data[['TOTAL']]), ascending=False)[:10]
    newData.to_csv(f'{url.upper()}', index=False)


mkNewCSV('Repasses_M.csv')
mkNewCSV('despesas_PF.csv')
