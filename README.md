# Apex Weapon API
Because there is currently no player stats API for Apex Legends, I went ahead and created an API to serve up weapon stats.
I pulled the data from these locations:

[@TheThrillGame's apex weapon chart](https://twitter.com/TheThrillGame/status/1094234867754250240)

[The Ultimate Apex Weapon Spreadsheet](https://docs.google.com/spreadsheets/d/1KxEHPfftQzCcJd6C1GOOd6EzacugepiX8IcyqYwdaVo/edit#gid=0)

I pulled the data down, and created a csv holding all the weapon data. Then used Python to read the csv, and output a json file which then was loaded into the MongoDB database.
I chose not to include the Mongo URI, so if you want to make edits, update data - feel free to ask me and I will send you the info.

Currently, the supported endpoints are as follows:
## HTTP requests
| GET        | Parameters           | Returns  |
| ------------- |:-------------:| -----:|
| /v1/guns      | None | All guns in Apex Legends |
| /v1/guns/gun/:ID      | Gun ID       |   A single gun |
| /v1/guns/search/ |   gunClass, ammo (ex:gunClass=AR&ammo=HEAVY    |    All Guns matching the search criteria |

This is a brand new project, so contributers are always welcome, as well as any feedback. Thanks :)
