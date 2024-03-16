import React, {useState} from 'react'

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

    const filterData = (data, searchText) => {
        return data.filter(item => {
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
    const filteredData = filterData(dataList, searchText);


    return (
        <div>
            <div className="col-md-2">
                <label htmlFor="name" className="form-label"></label>
                <input
                    type="text"
                    className="form-control"
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
                    {filteredData.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            {Object.keys(dataList.reduce((acc, obj) => ({...acc, ...obj}), {})).map((key, colIndex) => (
                                <td key={colIndex}>{item[key] || '-'}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Search;