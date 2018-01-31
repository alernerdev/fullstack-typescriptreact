import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Field from './Field';
import Side from './Side';
import { getOrders, saveOrders } from './api';

export default class TradingUI2 extends React.Component<any, IOrderEntryState> {
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
			orders: [],
			fieldErrors: {}
		};
	}

	componentWillMount() {
        getOrders((orders: Order[]) => {
			console.log(`retrieved orders upon load: ${JSON.stringify(orders)}`);
            this.setState({orders: orders});
        });
    }

	validate = () => {
        const order = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const errMessages = Object.keys(fieldErrors).filter((k)=>fieldErrors[k]);

		if (!order.symbol) {
			return true;
		}
		if (!order.qty) {
			return true;
		}
		if (!order.side) {
			return true;
		}
        if (errMessages.length)
            return true;

        return false;
    }

	SideToTextDisplay(side :SideEnum) :string {
		switch (side) {
			case SideEnum.Buy:
			return "Buy";

			case SideEnum.Sell:
			return "Sell";

			case SideEnum.SellShort:
			return "SellShort";

			default:
			return "None";
		}
	}

	textValueToSide(text :string) : SideEnum {
		if (text === 'buy')
			return SideEnum.Buy;
		else if (text === 'sell')
			return SideEnum.Sell;
		else if (text === 'sellshort')
			return SideEnum.SellShort;
		else 
			return SideEnum.None;
	}
	valueToSide(val :number) : SideEnum {
		if (val === 1)
			return SideEnum.Buy;
		else if (val === 2)
			return SideEnum.Sell;
		else if (val === 3)
			return SideEnum.SellShort;
		else 
			return SideEnum.None;
	}

	onFormSubmit = (evt :any) => {
		const fields = this.state.fields;
        const order :Order = {
			symbol: fields.symbol,
			price: parseFloat(fields.price),
			qty: parseInt(fields.qty),
			side: this.textValueToSide(fields.side)
		}
		const orders :Order[] = [...this.state.orders, order];

		evt.preventDefault();

		if (this.validate())
            return;

		console.log('done with validation');
		saveOrders(orders)
            .then(() =>{
                this.setState({
                      fields: {
                        symbol:'',
						price:'',
						qty:'',
						side:''
					},
					orders: orders,
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    // this function is infolded by Field
    onInputChange = (name :any, value :any, error :any) => {
        const fields :IFields  = this.state.fields;
        const fieldErrors :IFields = this.state.fieldErrors;
        fields[name] = value;
		fieldErrors[name] = error;

		this.setState({fields, fieldErrors});
	}

	validateQty(val: string) {
		if (!val)
			return 'Quantity Required';

		const err = 'Quantity must be numeric, greater than 0 and a multiple of 100 shares';
		let qty = 0;
		try {
			qty = parseInt(val);
			if (isNaN(qty))
				return err;
			}
		catch(e) {
			return err;
		}

		if (qty <= 0.0)
			return err;

		const roundLot = 100;
		if ( (qty % roundLot) != 0)
			return err;

		return false;
	}

	validatePrice(val: string) {
		if (!val)
			return 'Price Required';

		let price = 0.0;
		try {
			price = parseFloat(val);
			if (isNaN(price))
				return 'Price must be numeric and greater than 0';
			}
		catch(e) {
			return 'Price must be numeric and greater than 0';
		}

		if (price <= 0.0)
			return 'Price must be greater than 0.0';

		return false;
	}

	validateSide(val: string) {
		if (!val)
			return 'Order side required';

		return false;
	}

    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
	                <Field
    	                placeholder="symbol"
        	            name="symbol"
						value={this.state.fields.symbol}
                	    onChange={this.onInputChange}
                    	validate={(val: string)=> (val ? false : 'Symbol Required')}
					/>
					<br/>
					<Field
						placeholder="price 0.0"
						name="price"
						value={this.state.fields.price}
						onChange={this.onInputChange}
						validate={ this.validatePrice}
					/>
					<br/>
					<Field
						placeholder="qty 0"
						name="qty"
						value={this.state.fields.qty}
						onChange={this.onInputChange}
						validate={ this.validateQty}
					/>
					<br/>
					<Side
						name="side"
						onChange={this.onInputChange}
						validate={this.validateSide}
					/>
					<br/>
					<input type="submit" disabled={this.validate()}/>
                </form>
                <div>
					<hr/>
                    <h3>Book</h3>
                    <ul>
						{/* return li element for each name in the array */}
                        {
							this.state.orders.map( ( order: Order, index: number) :JSX.Element => {
								return (<li key={index}>{order.symbol} {this.SideToTextDisplay(order.side)} {order.price}x{order.qty}</li>);
							})
                    	}
                    </ul>
                </div>
            </div>
        );

    }
}
