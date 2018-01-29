import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Field from './Field';
//import apiClient from './api';
import loadingImg from '../images/loading.gif';
import OrderEntry from './OrderEntry';

// using ref gives direct access to the DOM element
export default class TradingUI extends React.Component<any, ITradingState> {
	constructor(props: any) {
		super(props);

		this.state = {
			orders: []
		};
	}

    /*
    componentWillMount() {
        apiClient.loadPeople().then((orders : any[]) => {
            this.setState({_loading: false, orders: orders});
        });
    }*/

    /*
    validate = () => {
        const order = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const errMessages = Object.keys(fieldErrors).filter((k)=>fieldErrors[k]);

        if (!order.symbol)
            return true;
        if (!order.qty)
            return true;

        if (!person.course)
            return true;
        if (!person.department)
            return true;

        if (errMessages.length)
            return true;

        return false;
    }
*/
    onFormSubmit = (evt:any) => {
        evt.preventDefault();

        //if (this.validate())
        //    return;

        //const order = this.state.fields;
        //const orders = [...this.state.orders, order];
        ///this.setState({_saveStatus: 'SAVING'});
        /*
        apiClient.savePeople(orders)
            .then(() =>{
                this.setState({
                    orders: orders,
                    fields: {
                        name:'',
                        email:'',
                    },
                });
            })
            .catch((err) => {
                console.error(err); // eslint-disable-line no-console
            });*/
    }

	onOrder(order: Order) {
        const orders = [...this.state.orders, order];
		this.setState({orders});
	}

    render() {
        return (
            <div>
                <h1> Enter Order </h1>
				<OrderEntry onChange={this.onOrder} />
                <form onSubmit={this.onFormSubmit}>
                    <input type="submit"/>
                </form>
                <div>
                    <h3>Orders</h3>
                    <ul>
                        {/* return li element for each name in the array */}
                        {
							this.state.orders.map( ( order: Order, index: number) :JSX.Element => {
								return (<li key={index}>{order.symbol} {order.qty}</li>);
							})
                    	}
                    </ul>
                </div>
            </div>
        );
    }
}
