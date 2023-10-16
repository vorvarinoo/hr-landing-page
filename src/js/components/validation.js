function validateForms() {
  const forms = document.querySelectorAll( 'form[data-validate]' )
  if ( forms.length < 1 ) return;
  forms.forEach( form => {
    const formID = `#${form.id}`;
    const validationRules = new JustValidate( formID, VALIDATION_ERRORS );
    const requiredFields = document.querySelectorAll( `${formID} [required]` )

    if ( requiredFields.length < 1 ) return;

    requiredFields.forEach( input => {
      switch ( input.dataset.validate ) {
        case 'text':
          validationRules.addField( `${formID} [type="text"]`, [ {
            rule: 'required',
            value: true,
            errorMessage: 'Поле обязательно для заполнения'
          }, ] )
          break;
        case 'phone':
          validationRules.addField( `${formID} [type="tel"]`, [ {
              rule: 'required',
              value: true,
              errorMessage: 'Поле обязательно для заполнения',
            },
            {
              rule: 'minLength',
              value: 18,
              errorMessage: 'Введите телефон в формате +7 (---) --- -- --',
            },
          ] )
          break;
        case 'policy':
          validationRules.addField( `${formID} [type="checkbox"]`, [ {
            rule: 'required',
            value: true,
            errorMessage: ' ',
            errorMessage: 'Подтвердите согласие с политикой конфидециальности',
          }, ] )
          break;
      }
    } );
    validationRules.onSuccess( ( evt ) => {
      formHandler( evt )
    } );
  } )
}
