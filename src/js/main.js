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
    document.querySelector( 'html' ).classList.add( 'is-open-menu' );
  },
  isClose: ( burger ) => {
    document.querySelector( '#overlay' ).classList.remove( 'open' );
    document.querySelector( 'html' ).classList.remove( 'is-open-menu' );
  }
} );





const header = document.querySelector( ".header__mobile-top " );

let lastScrollPosition = 0;

window.addEventListener( "scroll", () => {

  let currentScrollPosition = window.pageYOffset;

  if ( currentScrollPosition - lastScrollPosition > 0 ) {

    header.classList.add( "hide" );
  } else {

    header.classList.remove( "hide" );
  }

  lastScrollPosition = currentScrollPosition;
} )
