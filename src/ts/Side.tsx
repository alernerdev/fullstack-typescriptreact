import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default class Side extends React.Component<ISideProps, ISideState> {
	constructor(props :any) {
		super(props);

		this.state = {
			side: '',
			error: false
		}
	}

	onSelectSide(evt :any) {
		const side = evt.target.value;
		const name = this.props.name;

        // if validate func was passed in, validate it
		const error = this.props.validate ? this.props.validate(side) : false;
		this.setState({side: side, error: error});

		// bubble it up the chain
		this.props.onChange(name, side, error);
	}

	render() {
		return (
			<div>
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
        	   <span style={{color:'red'}}>{this.state.error}</span>
			</div>
		);
	};
}
