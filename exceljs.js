'use strict';

const Excel = require('exceljs'),
    readline = require('readline-sync');

let userInput = false;

const data = [
    { name: '버터와플', price: 1500 },
    { name: '초코송이', price: 1200 },
    { name: '롯데샌드', price: 2200 },
    { name: '포스틱', price: 2000 },
    { name: '제크', price: 1800 },
    { name: '꿀탕콩', price: 1200 },
    { name: '맛동산', price: 800 },
    { name: '자갈치', price: 1000 },
    { name: '새우깡', price: 1500 },
    { name: '포카칩', price: 1800 }
];

async function makeExcel(data) {

    let excel_data = await data.map(val => {
        return {
            '과자명': val.name,
            '가격': `${val.price}원`
        };
    });

    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('Result');

    worksheet.columns = Object.keys(excel_data[0]).map(function (v, i) {
        return { header: v.charAt(0).toUpperCase() + v.slice(1), key: v, };
    });

    worksheet.addRows(excel_data);

    workbook.xlsx.writeFile(userInput + '.xlsx').then(function () {
        console.log('saved');
    });
};

userInput = readline.question('저장할 파일 명 입력 (종료는 Ctrl+c) > ');

if (userInput.trim().length > 0) {
    makeExcel(data);
};
