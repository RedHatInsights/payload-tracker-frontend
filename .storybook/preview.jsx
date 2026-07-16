import '@patternfly/react-core/dist/styles/base.css';
import '@patternfly/patternfly/patternfly-addons.css';
import '@redhat-cloud-services/hcc-storybook-hub/css/storybook.css';
import { initialize, mswLoader } from 'msw-storybook-addon';
import React from 'react';

const preview = {
    beforeAll: async () => {
        initialize({ onUnhandledRequest: 'warn' });
    },
    loaders: [mswLoader],
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => <Story />,
    ],
};

export default preview;
