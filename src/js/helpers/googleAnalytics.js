import ReactGA from 'react-ga'

export const logPageView = (page) => {
  if (typeof document === 'undefined') return null;

  if (page) {
    ReactGA.set({
      page: page,
      host: window.location.host
    });
    ReactGA.pageview(page);
    return null
  }

  ReactGA.set({
    location: `${window.location.origin}${window.location.pathname}${window.location.search}`
  });
  ReactGA.pageview(window.location.pathname);
  return null;
};

export const logEvent = (event) => {

  if (typeof document === 'undefined') return null;

  const { category = 'UNSET', action = 'UNSET', label = null, nonInteraction = false } = event;

  ReactGA.event({
    category: category,
    action: action,
    label: label,
    nonInteraction: nonInteraction
  });

  return null;
};
