import React from 'react';
import Input from '../UI/Input/Input';
import is from 'is_js';

import classes from './AddRow.module.scss';

const defaultControl = {
  value: '',
  errorMessage: [],
  touched: false,
  valid: false,
  shouldValidate: true,
  type: 'text',
};

//Form controls setup
function createFormControls() {
  return {
    id: {
      ...defaultControl,
      label: 'id',
      validation: {
        required: { active: true, errorMessage: 'Обязатльное поле' },
        number: { active: true, errorMessage: 'Значение поля должно быть числом' },
      },
    },
    firstName: {
      ...defaultControl,
      label: 'First Name',
      type: 'name',
      validation: {
        required: { active: true, errorMessage: 'Обязатльное поле' },
      },
    },
    lastName: {
      ...defaultControl,
      label: 'Last Name',
      type: 'name',
      validation: {
        required: { active: true, errorMessage: 'Обязатльное поле' },
      },
    },

    email: {
      ...defaultControl,
      label: 'Email',
      type: 'email',
      validation: {
        required: { active: true, errorMessage: 'Обязатльное поле' },
        email: { active: true, errorMessage: 'Некорректно введен E-mail' },
      },
    },
    phone: {
      ...defaultControl,
      label: 'Phone',
      validation: {
        required: { active: true, errorMessage: 'Обязатльное поле' },
        phone: { active: true, errorMessage: 'Некорректно введен номер' },
      },
    },
  };
}

export default function AddRow({ onRowAddHandler }) {
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [formControls, setFormControls] = React.useState(createFormControls());

  //form validation
  function validateControl(value, validation) {
    if (!validation) {
      return true;
    }
    let isValid = true;
    let error = [];

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
      if (!(value.trim() !== '')) error.push(validation.required.errorMessage);
    }
    if (validation.email) {
      isValid = is.email(value) && isValid;
      if (!is.email(value) && value.trim() !== '') error.push(validation.email.errorMessage);
    }
    if (validation.phone) {
      isValid = is.nanpPhone(value) && isValid;
      if (!is.nanpPhone(value) && value.trim() !== '') error.push(validation.phone.errorMessage);
    }
    if (validation.number) {
      isValid = !!+value && isValid;
      if (!+value && value.trim() !== '') error.push(validation.number.errorMessage);
    }

    return { isValid, error };
  }

  const onInputChangeHandler = (event, controlName) => {
    const form = { ...formControls };
    const control = { ...form[controlName] };

    control.value = event.target.value;
    control.touched = true;
    const validation = validateControl(control.value, control.validation);
    control.valid = validation.isValid;
    control.errorMessage = validation.error;
    form[controlName] = control;

    let isFormValid = true;
    Object.keys(form).forEach((name) => {
      isFormValid = form[name].valid && isFormValid;
    });

    setIsFormValid(isFormValid);
    setFormControls(form);
  };

  const buttonClickHandler = (data) => {
    setFormControls(createFormControls());
    onRowAddHandler(data);
  };

  function renderInputs() {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return (
        <div key={controlName + index} className="col">
          <Input
            label={control.label}
            value={control.value}
            type={control.type}
            errorMessage={control.errorMessage}
            valid={control.valid}
            touched={control.touched}
            validation={control.validation}
            shouldValidate={control.shouldValidate}
            onChange={(event) => onInputChangeHandler(event, controlName)}
          />
        </div>
      );
    });
  }

  return (
    <div className={classes.addRow}>
      <form>
        <div className="row">{renderInputs()}</div>
        <button
          disabled={!isFormValid}
          onClick={() => buttonClickHandler(formControls)}
          type="button"
          className="btn btn-dark mb-4 mt-2">
          Добавить в таблицу
        </button>
      </form>
    </div>
  );
}
