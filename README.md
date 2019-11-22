# Webpack Entries Autodiscovery

This package adds abilty to autodiscover webpack entries.

## Installing
```
npm install webpack-entries-autodiscovery --dev
```

### Usage
In your `webpack.config.js`:
```javascript
const {discoverEntries} = require('webpack-entries-autodiscovery');

module.exports = {
  entry: discoverEntries(__dirname) 
};
```

You can add configuration in `package.json`:
```json
{
  "devDependencies": {
    "webpack-entries-autodiscovery": "^1.0"
  },
  "webpackEntriesAutodiscovery": {
    "entriesDirName": "assets/features", 
    "entryFilename": "entry",
    "entryExtensions": ["js", "ts"]
  }
}
```

When no params is provided in `package.json` - default params will be used:
```javascript
{
    entriesDirName: 'src';
    entryFilename: 'index';
    entryExtensions: ['js'];
}
```

With that config discoverer will count as entry every `entry` `js` or `ts` file 
in folder or subfolder of `./assets/features`. Example output:
```
Webpack Entries Autodiscovery
=============================

Entries for /var/www/someproject
-----------------------------------------------

demo:                   /var/www/someproject/assets/features/demo/entry.js
cool-feature:           /var/www/someproject/assets/features/cool-feature/entry.ts
nested/cool-feature:    /var/www/someproject/assets/features/nested/cool-feature/entry.ts
styleguide:             /var/www/someproject/assets/features/styleguide/entry.ts
                                                                                                                        
[OK] 4 entries are discovered!                                                                                         

```