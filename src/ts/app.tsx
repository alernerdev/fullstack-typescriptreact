import React from 'react';
import ReactDOM from 'react-dom';

import OrderEntry from './OrderEntry';
import Field from './Field';

ReactDOM.render(
	/*
	<Field
	placeholder="Baaa!"
	name="baa"
	//validate={(val: string)=> (val ? false : 'Symbol Required')}
/>,
*/
	<OrderEntry />,
	document.getElementById('content')
);




