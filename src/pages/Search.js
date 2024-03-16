import React, { useState } from 'react';
import FilterCheckboxes from '../Component/FilterCheckboxes';

function Search() {

    /*const dataList = [{
        id: 1, name: 'foo', city: 'dallas', category: 'one', type: 'A', active: 'FALSE'
    }, {
        id: 2, name: 'bar', city: 'dallas', category: 'one', type: 'B', active: 'FALSE'
    }, {
        id: 3, name: 'jim', city: 'san francisco', category: 'one', type: 'B', active: 'TRUE',
    }, {
        id: 4, name: 'jane', city: 'denver', category: 'two', type: 'C', active: 'FALSE'
    }]*/

    const dataList = [
        {
            id: 1,
            mall: 'V R mall',
            address: 'Surat',
            rating: 'A'
        },
        {
            id: 2,
            mall: 'Rahul Raj Mall',
            address: 'dallas',
            rating: 'B'
        },
        {
            id: 3,
            mall: 'Raj Imperial',
            address: 'san francisco',
            category: 'one',
            rating: 'B'
        },
        {
            id: 4,
            mall: 'jane',
            address: 'denver',
            category: 'two',
            rating: 'C'
        }
    ]
    const [searchText, setSearchText] = useState('');
    const [filters, setFilters] = useState({});

    const handleCheckboxChange = (key, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: prevFilters[key] ? prevFilters[key].includes(value)
                    ? prevFilters[key].filter(item => item !== value)
                    : [...prevFilters[key], value]
                : [value]
        }));
    };

    const filterData = (data, searchText, filters) => {
        return data.filter(item => {
            const matchesFilter = Object.entries(filters).every(([key, values]) => {
                return values.length === 0 || values.includes(item[key]);
            });

            if (!matchesFilter) return false;

            if (!searchText) return true;

            const searchString = searchText.toLowerCase();
            return Object.values(item).some(val => {
                return val.toString().toLowerCase().includes(searchString);
            });
        });
    };

    const handleChange = value => {
        setSearchText(value);
    };
    const filteredData = filterData(dataList, searchText, filters);

    return (
        <div className="row">
            <FilterCheckboxes dataList={dataList} handleCheckboxChange={handleCheckboxChange}/>
            <div className="col-md-2">
                <label htmlFor="name" className="form-label"></label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={searchText}
                    onChange={e => handleChange(e.target.value)}
                />
            </div>
            <div className="col-12">
                <table className="table">
                    <thead>
                    <tr>
                        {Object.keys(dataList.reduce((acc, obj) => ({...acc, ...obj}), {})).map((key, index) => (
                            <th key={index} scope="col">{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.length > 0 ? filteredData.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            {Object.keys(dataList.reduce((acc, obj) => ({...acc, ...obj}), {})).map((key, colIndex) => (
                                <td key={colIndex}>{item[key] || '-'}</td>
                            ))}
                        </tr>
                    )) : <div>{'No record found'}</div>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Search;