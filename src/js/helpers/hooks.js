import { useEffect } from 'react';

/**
  Apply logic needed for every mobile menu popup.
  @param menuOpened {Boolean}: the state value indicating whether a mobile menu is open or not.
  @param setMenuOpened {Function}: the setter function to change the value of "menuOpened".
**/
export const mobilePopupHelper = (menuOpened, setMenuOpened) => {
  // Freeze the body of the page when mobile menu is opened.
  // Unfreeze the body of the page when mobile menu is closed.
  return useEffect(() => {
    if (menuOpened) {
      window.document.body.classList.add('frozen-body');
    } else {
      window.document.body.classList.remove('frozen-body');
    }

    // Closes menu when user pressed "back" button on browser
    window.onpopstate = function(event) {
      if (menuOpened) setMenuOpened(false);
    };
  }, [menuOpened]);
}
