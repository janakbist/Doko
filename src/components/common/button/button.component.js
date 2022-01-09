import React from 'react';

export const Button = (props) => {
    let enabledLabel = props.enabledLabel || 'submit';
    let disabledLabel = props.disabledLabel || 'submitting...'
    let btn = props.isSubmitting
        ? <button disabled className="btn btn-info">{disabledLabel}</button>
        : <button disabled={!props.isValidForm} type="submit" className="btn btn-primary">{enabledLabel}</button>
    return btn;
}