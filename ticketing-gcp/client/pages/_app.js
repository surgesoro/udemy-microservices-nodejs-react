import "bootstrap/dist/css/bootstrap.css"; //requires bootstrap installation at the project level

// this is how NextJS creates a think wrapper around the component we are trying to show
// in below, Component is the component from one of the .js pages, i.e. index.js
// NextJS does now take you component and show it on the screen, instead it wraps it up inside it's
// custom default component and it's referred inside NextJS as and app
// by creating _app.js file, we have defiled our own custom app component
// e.g. index.js passed to this wrapper as a Component,
//      and pageProps would be a set of component that would be passed to index.js
export default ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
