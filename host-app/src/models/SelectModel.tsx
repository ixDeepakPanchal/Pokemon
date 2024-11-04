import { Select } from "antd";
interface prop {
    value?: string
    width: string
    options?: any[];
    field?: any;
    placeHolder?: string
    handleChangeValue?: (message: string) => void
}

const SelectModel = ({ value, width, options, placeHolder, handleChangeValue }: prop) => {
    return (
        <Select
        // autoFocus={true}
            className={`${width} z-[999]`}
            value={value}
            showSearch
            placeholder={placeHolder || ""}
            optionFilterProp="value"
            filterSort={(optionA, optionB) =>
                (optionA?.value ?? '').toLowerCase().localeCompare((optionB?.value ?? '').toLowerCase())
            }
            options={options}
            onChange={(value) => {
                handleChangeValue &&
                    handleChangeValue(value)
                return value
            }}
        />
    );
};
export default SelectModel;
