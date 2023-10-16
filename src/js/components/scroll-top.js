function initScrollTop() {
  const SCROLL_TOP_HANDLER = document.querySelector( '#scroll-top' );
  const TARGET = document.querySelector( '#site-top' );
  if ( !SCROLL_TOP_HANDLER || !TARGET ) return;
  const OBSERVE_OPTIONS = {
    rootMargin: '600px',
    threshold: 1
  };
  const cb = ( entries ) => {
    entries.forEach( entry => {
      if ( !entry.isIntersecting ) {
        SCROLL_TOP_HANDLER.classList.add( 'scroll-top--show' )
      } else {
        SCROLL_TOP_HANDLER.classList.remove( 'scroll-top--show' )
      }
    } )
  };
  new IntersectionObserver( cb, OBSERVE_OPTIONS ).observe( TARGET );
}
