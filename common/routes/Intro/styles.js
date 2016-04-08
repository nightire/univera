export default {
  position: 'absolute',
  top: 0, right: 0, bottom: 0, left: 0,
  background: `
  linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, black),
  url(${window.global ? '/assets/images/intro-background-full.png' : require('../../../public/assets/images/intro-background-full.png')})
  center / cover no-repeat fixed
  `,
  article: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
    padding: '4.5em 1.5em 1.5em',
    color: 'white',
  },

  'article:after': {
    content: '""',
    position: 'absolute',
    top: 0, right: 0, bottom: 0, left: 0,
  },

  header: {
    marginBottom: 20
  },

  h1: {
    fontSize: '1.4em',
    fontWeight: 'normal'
  },

  p: {
    fontSize: '.8em',
    lineHeight: '1.5',
  },

  button: {
    position: 'absolute',
    transform: 'translateX(-50%)',
    top: '75%', left: '50%',
    border: 'none',
    borderRadius: '1.5em',
    padding: '0.75em 4em 0.85em',
    background: 'rgba(202, 32, 39, 1)',
    fontSize: '1em',
    color: 'white',
  }
}
