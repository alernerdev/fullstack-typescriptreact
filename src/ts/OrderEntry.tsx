import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Field from './Field';

export default class OrderEntry extends React.Component<any, IOrderEntryState> {
    state = {
        fields: { // individual order fields
            symbol: '',
            qty: '',
            side: ''
        },
        fieldErrors: {}
    };

    // this function is infolded by Field
    onInputChange = (name :string, value :string, error :string) => {
        const fields = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        fields[name] = value;
        fieldErrors[name] = error;
        //this.setState({fields, fieldErrors});
    }

    render() {
        return (
            <div>
                <Field
                    placeholder="Symbol"
                    name="symbol"
                    value={this.state.fields.symbol}
                    onChange={this.onInputChange}
                    validate={(val: string)=> (val ? false : 'Symbol Required')}
                />
                <br/>
                <Field
                    placeholder="Quantity"
                    name="qty"
                    value={this.state.fields.qty}
                    onChange={this.onInputChange}
                    validate={(val: string)=> ( val ? false : 'Symbol Required')}
                />
            </div>
        );

    }
}