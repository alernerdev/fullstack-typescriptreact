import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';

export default class Side extends React.Component<any, any> {
	constructor(props :any) {
		super(props);

		this.state = {
			side: null
		}
	}

	onSelectSide(evt :any) {
        const side = evt.target.value;
		this.setState({side: side});

		// bubble it up the chain
		//this.props.onChange({name: 'department', value: department});
	}

	/*
	onSelectDepartment = (evt: any) => {

        const course = null;

        this.props.onChange({name: 'department', value: department});
        this.props.onChange({name: 'course', value: course});

        if (department)
            this.fetch(department);
    }
*/
	render() {
		return (
			<select
				onChange={e => { this.onSelectSide(e)}}
				value= {this.state.side || ''}
			>
				<option value=''>
					Buy/Sell?
				</option>
				<option value='buy'>
					Buy
				</option>
				<option value='sell'>
					Sell
				</option>
				<option value='sellshort'>
					Sell Short
				</option>
			</select>
		);
	};
}
