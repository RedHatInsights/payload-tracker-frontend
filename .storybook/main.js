const { createMainConfig } = require('@redhat-cloud-services/hcc-storybook-hub/config');

module.exports = createMainConfig({
    staticDirs: ['../static'],
});
