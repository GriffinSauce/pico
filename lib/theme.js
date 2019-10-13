// TODO: Review best naming scheme for colors

export default darkMode => ({
  darkMode,
  font: {
    header: `'Oswald', sans-serif`,
    body: `'Lato', sans-serif`,
  },
  color: darkMode
    ? {
        action: '#d900fc',
        actionHover: '#c900ea',
        actionText: '#fff',
        actionSecondary: '#514baf',
        textPrimary: '#fff',
        background: '#060063',
      }
    : {
        action: '#d900fc',
        actionHover: '#c900ea',
        actionText: '#fff',
        actionSecondary: '#e2e2e2',
        textPrimary: '#fff',
        background: '#FFF',
      },
});
