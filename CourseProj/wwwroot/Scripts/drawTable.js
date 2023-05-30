function tableFromJson(object) {
    let col = [];
    for (let i = 0; i < object.length; i++) {
        for (let key in object[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // Create table.
    const table = document.getElementById("table");

    // Create table header row using the extracted headers above.
    let tr = table.insertRow(-1);                   // table row.

    for (let i = 0; i < col.length; i++) {
        let th = document.createElement("th");      // table header.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // add json data to the table as rows.
    for (let i = 0; i < object.length; i++) {

        tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            tabCell.innerHTML = object[i][col[j]];
        }
    }

    // Now, add the newly created table with json data, to a container.
    const divShowData = document.getElementById('calcResult');
    divShowData.appendChild(table);
}

function widthTable(data) {
    let jestcostMatrasov = [
        { type: "super-soft", from: 50.0, to: 58.0, count: 0, percent: 0 },
        { type: "soft", from: 58.0, to: 61.0, count: 0, percent: 0 },
        { type: "medium", from: 61.0, to: 65.0, count: 0, percent: 0 },
        { type: "medium-hard", from: 65.0, to: 69.0, count: 0, percent: 0 },
        { type: "hard", from: 69.0, to: 200.0, count: 0, percent: 0 }
    ]

    jestcostMatrasov.map(elem => {
        elem.count = data.reduce((sum, jsonElem) => {
            if (jsonElem.Avg > elem.from && jsonElem.Avg <= elem.to) {
                return sum + jsonElem.Count
            }
            else return sum
        },0);
    })

    jestcostMatrasov.map(elem => {
        return elem.percent = elem.count / 5000 * 100
    })

    let col = [];
    for (let i = 0; i < jestcostMatrasov.length; i++) {
        for (let key in jestcostMatrasov[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // Create table.
    const table = document.getElementById("secondTable");

    // Create table header row using the extracted headers above.
    let tr = table.insertRow(-1);                   // table row.

    for (let i = 0; i < col.length; i++) {
        let th = document.createElement("th");      // table header.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // add json data to the table as rows.
    for (let i = 0; i < jestcostMatrasov.length; i++) {

        tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            tabCell.innerHTML = jestcostMatrasov[i][col[j]];
        }
    }

    // Now, add the newly created table with json data, to a container.
    const divShowData = document.getElementById('showTable');
    divShowData.appendChild(table);

    console.log(jestcostMatrasov)

}

function heightTable(data) {

}

export { tableFromJson, widthTable }