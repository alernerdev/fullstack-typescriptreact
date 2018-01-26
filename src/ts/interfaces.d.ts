interface IFieldState {
    value: string | undefined,
    error: boolean
}

interface IFieldProps {
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
    name: string
}

interface IOrderEntryState {
    fields: IFields,
    fieldErrors: IFields
}

