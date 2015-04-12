$(function() {

    Morris.Area({
        element: 'morris-area-chart',
        data: [{
            period: '20',
            masculino: 2666,
            femenino: 2000,
        }, {
            period: '25',
            masculino: 2778,
            femenino: 2294,
        }, {
            period: '30',
            masculino: 4912,
            femenino: 1969,
        }, {
            period: '35',
            masculino: 3767,
            femenino: 3597,
        }, {
            period: '40',
            masculino: 6810,
            femenino: 1914,
        }, {
            period: '45',
            masculino: 5670,
            femenino: 4293,
        }, {
            period: '50',
            masculino: 4820,
            femenino: 3795,
        }, {
            period: '55',
            masculino: 15073,
            femenino: 5967,
        }, {
            period: '60',
            masculino: 1687,
            femenino: 4460,
        }, {
            period: '65',
            masculino: 8432,
            femenino: 5713,
        }],
        xkey: 'period',
        ykeys: ['masculino', 'femenino'],
        labels: ['Masculino', 'Femenino'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });

    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "Masculino",
            value: 75
        }, {
            label: "Femenino",
            value: 25
        }],
        resize: true
    });

    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
            y: '2006',
            a: 100,
            b: 90
        }, {
            y: '2007',
            a: 75,
            b: 65
        }, {
            y: '2008',
            a: 50,
            b: 40
        }, {
            y: '2009',
            a: 75,
            b: 65
        }, {
            y: '2010',
            a: 50,
            b: 40
        }, {
            y: '2011',
            a: 75,
            b: 65
        }, {
            y: '2012',
            a: 100,
            b: 90
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B'],
        hideHover: 'auto',
        resize: true
    });

});
