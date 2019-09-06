import useMediaQuery from '@material-ui/core/useMediaQuery';

/**
  Synchronize changes with src/css/base/_mixins.scss

  useMediaQuery() is a react hook and can only be used within function components.
**/
export const isDesktopQuery = () => useMediaQuery('(min-width:1080px)');
export const isMobileOrTabletQuery = () => useMediaQuery('(max-width:1079px)');
export const isTabletQuery = () => useMediaQuery('(min-width:768px) and (max-width:1079px)');
export const isMobileQuery = () => useMediaQuery('(max-width:767px)');
