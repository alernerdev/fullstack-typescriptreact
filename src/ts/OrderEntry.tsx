import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Field from './Field';
import Side from './Side';

export default class OrderEntry extends React.Component<any, IOrderEntryState> {
	constructor(props: any)
	{
		super(props);

		this.state = {
			fields: { // individual order fields
				symbol: '',
				price: '',
				qty: '',
				side: ''
			},
			fieldErrors: {}
		};
	}

	validate = () => {
        const order = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const errMessages = Object.keys(fieldErrors).filter((k)=>fieldErrors[k]);

		if (!order.symbol) {
			console.log("NOT symbol. returning");
			return true;
		}
		if (parseInt(order.qty) < 200) {
			console.log("< 200. returning");
			return true;
		}
        if (errMessages.length)
            return true;

		console.log("OrderEntry got to the validation bottom");
        return false;
    }

    // this function is infolded by Field
    onInputChange = (name :any, value :any, error :any) => {
        const fields :IFields  = this.state.fields;
        const fieldErrors :IFields = this.state.fieldErrors;
        fields[name] = value;
		fieldErrors[name] = error;

		this.setState({fields, fieldErrors});

		// if there are errors at a single field level, no point in validating at the whole order level
		const errMessages = Object.keys(fieldErrors).filter((k)=>fieldErrors[k]);
		if (error || errMessages.length !=0)
			return;

		// if got here, there are no errors at a single field level
        // if whole order validate func was passed in, validate it
		const orderEntryError = this.props.validate ? this.props.validate(value) : false;
		if (!orderEntryError) {
			this.props.onChange(name, value);
		}
    }

    render() {
        return (
            <div>
                <Field
                    placeholder="symbol"
                    name="symbol"
					value={this.state.fields.symbol}
                    onChange={this.onInputChange}
                    validate={(val: string)=> (val ? false : 'Symbol Required')}
				/>
				<br/>
				<Field
					placeholder="price"
					name="price"
					value={this.state.fields.price}
					onChange={this.onInputChange}
					validate={(val: string)=> (val ? false : 'Price Required')}
				/>
				<br/>
				<Field
					placeholder="quantity"
					name="qty"
					value={this.state.fields.qty}
					onChange={this.onInputChange}
					validate={(val: string)=> (val ? false : 'Qty Required')}
				/>
				<br/>
				<Side />
				<br/>
                <span style={{color:'red'}}>{this.state.error}</span>
            </div>
        );

    }
}
