new SmoothScroll( 'a[href*="#"]', SMOOTH_SCROLL_OPTIONS );
new justPhoneMask( {
  bodyMask: ' (___) ___ __ __',
} );
initModal( simpleModal, 'data-hystmodal' );
validateForms();
initScrollTop();

const burger = new JustBurger( {
  animationSpeed: 400,
  menuId: 'menuList',
  isOpen: ( burger ) => {
    document.querySelector( '#overlay' ).classList.add( 'open' );
  },
  isClose: ( burger ) => {
    document.querySelector( '#overlay' ).classList.remove( 'open' );
  }
} );