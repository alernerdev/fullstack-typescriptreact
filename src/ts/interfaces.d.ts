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

interface ICourseSelectProps {
    department?: string,
    course?: string,
    onChange: Function
}

interface ICourseSelectState {
    department: string | null,
    course: string | null,
    courses: string[],
    _loading: boolean
}

interface IFields {
    // This is an index signature. It means this object can hold
    // a key of any name, and they can be accessed and set using
    // bracket notation: `this.state.fields["somekey"]`
    [name: string]: string
}

interface IOrderEntryState {
    fields: IFields,
    fieldErrors: IFields
}
