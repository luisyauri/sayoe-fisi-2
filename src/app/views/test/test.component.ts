import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

    arrayTest = [3,2,4,5,1,0];
    arrayIHE = [0,2,4,6,8,10];

    //Variables Chart Inventario de Habitos de Estudio.
    titleIHE = 'Inventario de Habitos de Estudio';
    typeIHE = 'ComboChart';
    columnNamesIHE= ['Área', 'Puntaje',{type: 'string', role: 'tooltip'}, 'Total',{type: 'string', role: 'tooltip'}];
    optionsIHE= {
        legend: {position: 'none'},
        chartArea: {width: '50%', height: '70%'},
        vAxis: { title: 'Categorías',
            ticks: [
            {v: 0, f: 'Muy negativo'}, {v: 2, f: 'Negativo'},
            {v: 4, f: 'Tendencia (-)'}, {v: 6, f: 'Tendencia (+)'},
            {v: 8, f: 'Positivo'}, {v: 10, f: 'Muy positivo'},
        ]
        },
        hAxis: { title: 'Áreas' },
        seriesType: 'bars',
        series: { 1: { type: 'line' } },
        focusTarget: 'category',

    }
    widthIHE = 700;
    heightIHE = 400;

    dataIHE = [
        // ['Área I', 0,'10', 0,'10'],
        // ['Área II', 2,'20', 2,'20'],
        // ['Área III', 4,'30', 4,'30'],
        // ['Área IV', 6,'40', 6,'40'],
        // ['Área V', 8,'50', 8,'50'],
        // ['Total', 10,'60', 10,'60']

    ];

    constructor() {
    }

    ngOnInit() {
        this.startChartIHE();
    }

    startChartIHE(){
        let i = 1;
        for(let valueTest of this.arrayTest){
            for(let valueIHE of this.arrayIHE){
                if(valueTest == valueIHE/2){
                    if(i!=this.arrayTest.length){
                        this.dataIHE.push(['Área '+ this.romanize(i), valueIHE,'10',valueIHE,'10'],);
                    }else{
                        this.dataIHE.push(['Total', valueIHE,'10',valueIHE,'10'],);
                    }
                    i++;
                }
            }
        }
    }

     romanize (num) {
        if (isNaN(num))
            return NaN;
        var digits = String(+num).split(""),
            key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                "","I","II","III","IV","V","VI","VII","VIII","IX"],
            roman = "",
            i = 3;
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        return Array(+digits.join("") + 1).join("M") + roman;
    }

}



// title = 'Inventario de Habitos de Estudio';
// type = 'ComboChart';
// columnNames = ['Área', 'Puntaje', {type: 'string', role: 'tooltip'}, {role: 'style'},'Average'];
// data = [
//     ['Área I', 2, '4', '#3366cc', 3],
//     ['Área II', 2, '5', '#dc3912', 3],
//     ['Área III', 4, '10', '#ff9900', 3],
//     ['Área IV', 6, '12', '#109618', 3],
//     ['Área V', 8, '10', '#990099', 3],
//     ['Total', 12, '11', '#0099c6', 3]
// ];
// options = {
//     legend: {position: 'none'},
//     chartArea: {width: '70%', height: '80%'},
//     vAxis: {
//         ticks: [
//             {v: 2, f: 'Muy negativo'}, {v: 4, f: 'Negativo'},
//             {v: 6, f: 'Tendencia (-)'}, {v: 8, f: 'Tendencia (+)'},
//             {v: 10, f: 'Positivo'}, {v: 12, f: 'Muy positivo'},
//         ]
//     },
//     focusTarget: 'category',
//     colors: ['#000000'],
//     seriesType: 'bars',
//     series: { 2: { type: 'line' } }
// };
// width = 550;
// height = 400;
