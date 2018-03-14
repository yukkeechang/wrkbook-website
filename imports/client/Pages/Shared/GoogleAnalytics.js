import ReactGA from 'react-ga';
import React from 'react';

export const initGA = () => {
  //console.log("GA initialized")
  ReactGA.initialize('UA-102580306-1')
}

export const logPageView = () => {
  ReactGA.set({page:window.location.pathname});
  ReactGA.pageview(window.location.pathname)
  //console.log("Google Analytics: "+window.location.pathname)
}
