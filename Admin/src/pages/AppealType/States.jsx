import React, { useState, useEffect } from 'react';
const data = ["James", "John", "Jessica", "Jamie"];
function States() {
    const [visibilities, setVisibilities] = React.useState(() => data.map((x) => true));
    const handleClick = (event) => {
        const index = parseInt(event.currentTarget.dataset.index, 10);
        const newVisibilities = [...visibilities];
        newVisibilities[index] = !newVisibilities[index];
        setVisibilities(newVisibilities);
    };

    return (
        <div>
            <div className="App">
                {data.map((value, index) => (
                    <h1 key={index} data-index={index} onClick={handleClick} className={visibilities[index] ? "selected" : undefined}>
                        Hello {value}, you are {visibilities[index] ? "visible" : "hidden"}!
                    </h1>
                ))}
            </div>
        </div>
    )
}

export default States