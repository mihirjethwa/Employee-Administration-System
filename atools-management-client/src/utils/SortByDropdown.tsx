import { Select } from 'antd';
import React from 'react';
import './utils.css'
const { Option } = Select;
interface Data {
    options: any,
    defaultValue?: any,
    data: any,
    callback: any
}
const SortByDropdown: React.FunctionComponent<Data> = ({ options, defaultValue = "Sort By :", callback, data }) => {

    const onChange = (value: any) => {
        console.log(`selected ${value}`);
        callback(value,data)
      }
    const optionsOpt = [...options];

    return (
        <div style={{ display: "flex", justifyContent: "end" }}>
            <div className="sort-right">
                <span className="sort-right-sorted">Sort By</span>
                <Select
                    defaultValue={defaultValue}  size="large"
                    className="sort-right-select"
                    placeholder="Sort By"
                    bordered={false}
                    onChange={onChange}
                >
                    {optionsOpt.map((option) => (
                        <Option value={option} key={option}>{option}</Option>

                    ))}

                </Select>
            </div>
        </div>




    );
}

export default SortByDropdown;