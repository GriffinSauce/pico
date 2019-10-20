import { configure } from '@storybook/react';
import { addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';

addParameters({
  options: {
    theme: themes.dark,
  },
});

// automatically import all files ending in *.stories.js
configure(require.context('../.storybook', true, /\.stories\.js$/), module);
configure(require.context('../components', true, /\.stories\.js$/), module);
