set PLATFORM=%1%
set ARCH=%2%
set APP_NAME="RedisClient"

set ignore_list="dist|scripts|\.idea|.*\.md|.*\.yml|node_modules/nodejieba"

electron-packager . ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/ "%APP_NAME%" --platform=%PLATFORM% --arch=%ARCH% --electronVersion=1.7.5  --app-version=0.1.0 --asar --icon=.\assets\icon.png --overwrite --out=.\dist --ignore=%ignore_list%