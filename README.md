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
  entry: discoverEntries({
    basePath: __dirname,
    entriesDirName: 'assets/features', 
    entryFilename: 'entry',
    entryExtensions: ['js', 'ts']
  }) 
};
```

With such config, discoverer will count as entry every `entry` `js` or `ts` file 
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

When no params is provided - defaults will be used:
```javascript
{
    basePath: '',
    entriesDirName: 'src', 
    entryFilename: 'index',
    entryExtensions: ['js']
}
```