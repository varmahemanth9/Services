# services

# prerequisites
should install node and mongoDB

# commands
npm start / node server.js

# Apis 
Create - POST | "/tinyurl" | {"longUrl": "<link>"}
Update - PUT | "/tinyurl/<key>" |  {"longUrl": "<link>"}
Delete - DELETE | "/tinyurl/<key>"
Redirect - GET | "/tinyurl/<key>"
