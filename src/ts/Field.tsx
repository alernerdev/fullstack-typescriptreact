import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';

	export default class Field extends React.Component<IFieldProps, IFieldState> {
	constructor(props: IFieldProps) {
		super(props);

		this.state = {
            value: this.props.value,
            error: false
        }
    }

    componentWillReceiveProps(update: any) {
		console.log(`Field componentWillReceiveProps value:${update.value}`);
        this.setState({value: update.value});
    }

    /* from input to here, from here further up to the parent */
	onChange = (evt: any) => {
        const name = this.props.name;
		const value = evt.target.value;
		console.log(`Field onChange name:${name} value:${value}`);

        // if validate func was passed in, validate it
		const error = this.props.validate ? this.props.validate(value) : false;
        this.setState({value : value, error : error });
        this.props.onChange(name, value, error);
	}

    render() {
        return (
            <div>
				{
					this.props.label ?
						(<label htmlFor={this.props.name}>{this.props.label}</label>) : ""
				}
                <input
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    id={this.props.name}
                    onChange={e => { this.onChange(e)}}
                />
                <span style={{color:'red'}}>{this.state.error}</span>
            </div>
        );
    }
}
