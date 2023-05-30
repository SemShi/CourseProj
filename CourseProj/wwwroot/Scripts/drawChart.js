export default function drawChart(arr, ctx) {
    let intervalArr = [];
    for (let elem of arr) {
        intervalArr.push(elem.Interval);
    }
    let teorFreq = [];
    for (let elem of arr) {
        teorFreq.push(elem.TeorChastota);
    }
    let dataArr = [];
    for (let elem of arr) {
        dataArr.push(elem.Count);
    }
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: intervalArr,
            datasets: [
                {
                    label: "Fact chastota",
                    data: dataArr,
                    borderWidth: 1,
                    backgroundColor: '#9BD0F5'
                },
                {
                    label: "Teor chastota",
                    data: teorFreq,
                    borderWidth: 1,
                    backgroundColor: '#FFB1C1'
                }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        }
    });
}
