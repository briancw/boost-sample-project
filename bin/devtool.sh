#!/bin/bash
PN=$(sed -n 's/^.*\"name\" *: *\"\(.*\)\".*$/\1/p' ecosystem.json)
NN=${PN/ /-}
# echo $NN
CU=$(tail -n 20 ~/.pm2/logs/$NN-error.log | grep -o chrome-devtools.*node$ | head -1)
echo $CU
echo $CU | pbcopy
# TU='http://google.com'
# This command doesnt seem to work.
# It interprets the url as a file because is starts with the chrome-devtools:// protocol
#open -a -n -g "Google Chrome Canary" $CU

# Insteas use an applescript to open it
osascript <<EOD
set theURL to "$CU"
tell application "Google Chrome Canary"
  if windows = {} then
    set newwindow to make new window
    set URL of active tab of window newwindow to theURL
  else
    make new tab at the end of window 1 with properties {URL:theURL}
  end if
  activate
end tell
EOD
