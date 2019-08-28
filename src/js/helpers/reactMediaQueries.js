import useMediaQuery from '@material-ui/core/useMediaQuery';

/**
  Synchronize changes with src/css/base/_mixins.scss

  useMediaQuery() is a react hooks and can only be used within function components.
**/
export const isDesktop = () => useMediaQuery('(min-width:1080px)');
export const isMobileOrTablet = () => useMediaQuery('(max-width:1079px)');
export const isTablet = () => useMediaQuery('(min-width:768px) and (max-width:1079px)');
export const isMobile = () => useMediaQuery('(max-width:767px)');
