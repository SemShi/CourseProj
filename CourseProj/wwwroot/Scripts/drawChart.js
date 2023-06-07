function drawChart(arr, ctx, param) {
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
                    label: "Фактическая частота",
                    data: dataArr,
                    borderWidth: 1,
                    backgroundColor: '#9BD0F5',
                },
                {
                    label: "Теоритическая частота",
                    data: teorFreq,
                    borderWidth: 1,
                    backgroundColor: '#FFB1C1'
                }],
            
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                    scaleLabel:{
                        display: true,
                        labelString: 'Частота'
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: false,
                    },
                    scaleLabel:{
                        display: true,
                        labelString: param == 'Height' ? 'Рост' : 'Вес'
                    }
                }]
            }
        }
    });
}
