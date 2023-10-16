const SMOOTH_SCROLL_OPTIONS = {
    speed: 900,
    speedAsDuration: true,
    updateURL: false
  },
  MODAL_OPTIONS = {
    linkAttributeName: false,
    catchFocus: true,
    closeOnEsc: true,
    backscroll: true,
  },
  simpleModal = new HystModal( MODAL_OPTIONS ),
  VALIDATION_ERRORS = {
    errorFieldCssClass: 'invalid',
    errorLabelStyle: {
      color: '#CF4D4D',
      marginTop: '6px',
      fontSize: '12px',
      textAlign: 'left',
    },
  };
