"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var SMOOTH_SCROLL_OPTIONS = {
    speed: 900,
    speedAsDuration: true,
    updateURL: false
  },
  MODAL_OPTIONS = {
    linkAttributeName: false,
    catchFocus: true,
    closeOnEsc: true,
    backscroll: true
  },
  simpleModal = new HystModal(MODAL_OPTIONS),
  VALIDATION_ERRORS = {
    errorFieldCssClass: 'invalid',
    errorLabelStyle: {
      color: '#CF4D4D',
      marginTop: '6px',
      fontSize: '12px',
      textAlign: 'left'
    }
  };
var initModal = function initModal(name, handler) {
  name.config.linkAttributeName = handler;
  name.init();
};
function initScrollTop() {
  var SCROLL_TOP_HANDLER = document.querySelector('#scroll-top');
  var TARGET = document.querySelector('#site-top');
  if (!SCROLL_TOP_HANDLER || !TARGET) return;
  var OBSERVE_OPTIONS = {
    rootMargin: '600px',
    threshold: 1
  };
  var cb = function cb(entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        SCROLL_TOP_HANDLER.classList.add('scroll-top--show');
      } else {
        SCROLL_TOP_HANDLER.classList.remove('scroll-top--show');
      }
    });
  };
  new IntersectionObserver(cb, OBSERVE_OPTIONS).observe(TARGET);
}
function sendForm(evt) {
  var formData = new FormData(evt);
  fetch('mail.php', {
    method: 'POST',
    body: formData
  }).then(function (data) {
    if (data.status === 200) {
      // do something
    }
  }).catch(function (error) {
    console.log(error.message);
  });
}
function formHandler(evt) {
  sendForm(evt.target);
  evt.target.reset();
}
function validateForms() {
  var forms = document.querySelectorAll('form[data-validate]');
  if (forms.length < 1) return;
  forms.forEach(function (form) {
    var formID = "#".concat(form.id);
    var validationRules = new JustValidate(formID, VALIDATION_ERRORS);
    var requiredFields = document.querySelectorAll("".concat(formID, " [required]"));
    if (requiredFields.length < 1) return;
    requiredFields.forEach(function (input) {
      switch (input.dataset.validate) {
        case 'text':
          validationRules.addField("".concat(formID, " [type=\"text\"]"), [{
            rule: 'required',
            value: true,
            errorMessage: 'Поле обязательно для заполнения'
          }]);
          break;
        case 'phone':
          validationRules.addField("".concat(formID, " [type=\"tel\"]"), [{
            rule: 'required',
            value: true,
            errorMessage: 'Поле обязательно для заполнения'
          }, {
            rule: 'minLength',
            value: 18,
            errorMessage: 'Введите телефон в формате +7 (---) --- -- --'
          }]);
          break;
        case 'policy':
          validationRules.addField("".concat(formID, " [type=\"checkbox\"]"), [_defineProperty({
            rule: 'required',
            value: true,
            errorMessage: ' '
          }, "errorMessage", 'Подтвердите согласие с политикой конфидециальности')]);
          break;
      }
    });
    validationRules.onSuccess(function (evt) {
      formHandler(evt);
    });
  });
}
new SmoothScroll('a[href*="#"]', SMOOTH_SCROLL_OPTIONS);
new justPhoneMask({
  bodyMask: ' (___) ___ __ __'
});
initModal(simpleModal, 'data-hystmodal');
validateForms();
initScrollTop();
var burger = new JustBurger({
  animationSpeed: 400,
  menuId: 'menuList',
  isOpen: function isOpen(burger) {
    document.querySelector('#overlay').classList.add('open');
    document.querySelector('html').classList.add('is-open-menu');
  },
  isClose: function isClose(burger) {
    document.querySelector('#overlay').classList.remove('open');
    document.querySelector('html').classList.remove('is-open-menu');
  }
});
var header = document.querySelector(".header__mobile-top ");
var lastScrollPosition = 0;
window.addEventListener("scroll", function () {
  var currentScrollPosition = window.pageYOffset;
  if (currentScrollPosition - lastScrollPosition > 0) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }
  lastScrollPosition = currentScrollPosition;
});