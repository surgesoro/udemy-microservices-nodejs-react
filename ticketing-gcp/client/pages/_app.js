import "bootstrap/dist/css/bootstrap.css"; //requires bootstrap installation at the project level
import buildClient from "../api/build-client";
import Header from "../components/header";

// this is how NextJS creates a think wrapper around the component we are trying to show
// in below, Component is the component from one of the .js pages, i.e. index.js
// NextJS does now take you component and show it on the screen, instead it wraps it up inside it's
// custom default component and it's referred inside NextJS as and app
// by creating _app.js file, we have defiled our own custom app component
// e.g. index.js passed to this wrapper as a Component,
//      and pageProps would be a set of component that would be passed to index.js
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  //note that the structure of the context passed to App Components in NextJS
  //is different than the one passed in Page Components (it's a NextJS thing)
  //you can verify by running console.log
  //console.log(Object.keys(appContext));
  console.log("Landing Page!");
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");
  //this is how you call Landing Page's getInitialProps from within AppComponent getInitialProps - not straight forward - NextJS thing
  //wrapping inside check for pages where getInitialProps is not defined (yet..)
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    //currentUser: data.currentUser, or you can use something like below
    ...data,
  };
};

export default AppComponent;
