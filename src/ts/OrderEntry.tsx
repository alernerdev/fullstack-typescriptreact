import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Field from './Field';

export default class OrderEntry extends React.Component<any, IOrderEntryState> {
	constructor(props: any)
	{
		super(props);

		this.state = {
			fields: { // individual order fields
				symbol: '',
				qty: '',
				side: ''
			},
			fieldErrors: {}
		};
	}

    // this function is infolded by Field
    onInputChange = (name :any, value :any, error :any) => {
		console.log(`OrderEntry onImputChange name:${value} value:${value} error:${error}`);

        const fields :IFields  = this.state.fields;
        const fieldErrors :IFields = this.state.fieldErrors;
        fields[name] = value;
        fieldErrors[name] = error;
        this.setState({fields, fieldErrors});
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
					validate={(val: string)=> (val ? false : 'Qty Required')}
				/>
            </div>
        );

    }
}
