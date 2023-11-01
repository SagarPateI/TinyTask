const fs = require('fs');

// Read the template file
const template = fs.readFileSync('app.template.json', 'utf-8');

// Replace placeholders with actual environment variables
const appJson = template
    .replace('REPLACE_NAME', process.env.APP_NAME || 'projectname')
    .replace('REPLACE_SLUG', process.env.APP_SLUG || 'projectname')
    .replace('REPLACE_VERSION', process.env.APP_VERSION || '1.0.0')
    .replace('REPLACE_BUNDLE_IDENTIFIER', process.env.IOS_BUNDLE_ID || 'com.myprojectname')
    .replace('REPLACE_PACKAGE_NAME', process.env.ANDROID_PACKAGE || 'com.mypackagename')
    .replace('REPLACE_PROJECT_ID', process.env.EXPO_PROJECT_ID || 'myprojectIDgoeshere')
    .replace('REPLACE_OWNER_NAME', process.env.APP_OWNER || 'myname');

// Write the generated app.json file
fs.writeFileSync('app.json', appJson);

console.log('app.json generated successfully!');
