import React from 'react';
import ReactDOM from 'react-dom';

import TradingUI from './TradingUI';
import Field from './Field';

ReactDOM.render(
	/*
	<Field
	placeholder="Baaa!"
	name="baa"
	//validate={(val: string)=> (val ? false : 'Symbol Required')}
/>,
*/
	<TradingUI />,
	document.getElementById('content')
);




