import React from 'react'

function FilterCheckboxes({ dataList }) {
    const checkBoxValue = dataList.reduce((acc, curr) => {
        Object.keys(curr).forEach(key => {
            if (key !== 'id') {
                if (!acc[key]) {
                    acc[key] = [];
                }
                if (!acc[key].includes(curr[key])) {
                    acc[key].push(curr[key]);
                }
            }
        });
        return acc;
    }, {});

    const handleChange = (key, value) => {
        console.log(key, value);
    };

    return (
        <div className="row justify-content-md-center col-md-12">
            {Object.keys(checkBoxValue).map((key, index) => (
                <div className="col-md-2" key={index}>
                    <div className="row mb-3">
                        <label className="fw-bold">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                        <div className="col-sm-10">
                            {checkBoxValue[key].map((value, i) => (
                                <div key={i} className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id={value}
                                        onChange={() => handleChange(key, value)}
                                    />
                                    <label className="form-check-label" htmlFor={value}>{value}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FilterCheckboxes;