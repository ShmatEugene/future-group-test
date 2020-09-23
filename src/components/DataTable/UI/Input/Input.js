import classes from './Input.module.scss';
import React from 'react';

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

export default function Input(props) {
  const inputType = props.type || 'text';
  const htmlFor = inputType + '-' + Math.random();

  return (
    <>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        className="form-control"
        id={htmlFor}
        type={inputType}
        value={props.value}
        onChange={props.onChange}
      />
      {isInvalid(props) ? (
        <span className={classes.error}>
          {props.errorMessage
            ? props.errorMessage.map((error, index) => <p key={index}>{error}</p>)
            : 'Введено некорректное значение'}
        </span>
      ) : null}
    </>
  );
}
