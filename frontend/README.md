## Requirements

* Node.js 4.5.0 or newer
* Following Node.js plugins.
    * Bower (npm install -g bower)
    * Gulp (npm install -g gulp)

## Installation

Go to project folder and run in terminal following commands:
```
cd web
npm install
```

## Run

Go to project folder and run in terminal following commands:
```
cd web
npm start
```

## Build

All scripts should be run from project folder via terminal.

Development build script:
```
cd web
npm run devbuild
```

Production build script:
```
cd web
npm run prodbuild
```

## Deploy

For deploy on ngnix you should have following part of code in app config file.
```
location / {
    if (!-e $request_filename){
        rewrite ^(.*)$ /index.html break;
    }
}
```

Build app using production build script and copy content from <PROJECT>/web/build to your server.
