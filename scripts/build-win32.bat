set PLATFORM=%1%
set ARCH=%2%
set APP_NAME="RedisClient"

set ignore_list="dist|scripts|.*\.zip|\.idea|.*\.md|.*\.yml|node_modules/nodejieba"

electron-packager . "%APP_NAME%" --platform=%PLATFORM% --arch=%ARCH% --electronVersion=1.7.5  --app-version=1.0.0.0 --asar --icon=assets\icon.ico --overwrite --out=.\dist --ignore=%ignore_list%