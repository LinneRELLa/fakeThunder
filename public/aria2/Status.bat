@echo off & title Aria2 Status
TaskList /FI "IMAGENAME eq aria2c.exe" /FO LIST
pause > nul