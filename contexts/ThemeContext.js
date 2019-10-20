import React from 'react';
import theme from '~/lib/theme';

const ThemeContext = React.createContext({
  theme,
});
ThemeContext.displayName = 'ThemeContext';

export default ThemeContext;
