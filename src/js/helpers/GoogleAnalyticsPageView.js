import ReactGA from 'react-ga'

const GoogleAnalyticsPageView = () => {
  ReactGA.set({
    page: window.location.pathname,
    location: `${window.location.origin}${window.location.pathname}${window.location.search}`
  });

  ReactGA.pageview(window.location.pathname);
  return null;
};

export default GoogleAnalyticsPageView;
