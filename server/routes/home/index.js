import ssr from '../../middlewares/server-side-rendering';

export default ssr({
  title: process.env.npm_package_name,
  content: `
  <h1>Univera - Home</h1>
  <h2>An Universal Application Architecture</h2>
  `
});
