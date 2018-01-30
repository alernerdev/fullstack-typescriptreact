//---------------------------------
interface IFieldState {
    value: string | undefined,
    error: boolean
}

interface IFieldProps {
	label?: string,
    placeholder?: string,
    name: string,
    value?: string,
    validate?: Function,
    onChange: Function
}

//--------------------------------------------
interface IFields {
    // This is an index signature. It means this object can hold
    // a key of any name, and they can be accessed and set using
    // bracket notation: `this.state.fields["somekey"]`
    [name: string]: string
}

interface IOrderEntryState {
	fields: IFields,
	orders: Order[],
    fieldErrors: IFields
}

interface IOrderEntryProps {
    onChange: Function
}

interface ISideProps {
	name: string,
	onChange: Function
	validate? : Function
}

interface ISideState {
	side: string,
	error: false
}

declare const enum SideEnum {
	None = 0, Buy=1, Sell=2, SellShort=3
}

//----------------------------------------
interface Order {
	symbol: string,
	price: number,
	qty: number,
	side: SideEnum
}
