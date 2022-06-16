cd %~dp0
cd ..\..\
git add -u *.csv
git add -u *.json
git commit -m "daily update"
git push