import React from 'react';

export default function MoreInfo({ content }) {
  return (
    <div className="jumbotron mt-4">
      <h4>
        Выбран пользователь:{' '}
        <b>
          {content.firstName && content.firstName} {content.lastName && content.lastName}
        </b>
      </h4>
      <p className="lead">Описание:</p>
      {content.description && (
        <textarea readOnly={true} className="form-control" value={content.description}></textarea>
      )}
      {content.address && content.address.streetAddress && (
        <p className="mt-4">
          Адрес проживания: <b>{content.address.streetAddress}</b>
        </p>
      )}
      {content.address && content.address.city && (
        <p>
          Город: <b>{content.address.city}</b>
        </p>
      )}
      {content.address && content.address.state && (
        <p>
          Провинция/штат: <b>{content.address.state}</b>
        </p>
      )}
      {content.address && content.address.zip && (
        <p>
          Индекс: <b>{content.address.zip}</b>
        </p>
      )}
    </div>
  );
}
