import React from 'react';
import TextField from '@material-ui/core/TextField';

/**
 * @function SelectComponent
 * @param value : string -- value padrao do componente
 * @param label :string -- label do componente
 * @param onChange: callback()-- onChange selection data
 * @param children: JSX MENUITEM ou Value -- children Menu Items do select
 */
const CustomSelect = React.forwardRef((props, ref) => (
    <TextField
        select
        helperText={ props.error || null }
        error={ props.error ? true : false }
        id={ props.id || null }
        name={ props.name || null }
        innerRef={ ref }
        value={ props.value || '' }
        label={ props.label || 'Selecione:' }
        variant='filled'
        className={ props.className + ' c-select' || 'c-select' }
        onChange={ props.onChange || null }
    >
        { props.children }
    </TextField>
));

export default CustomSelect;

