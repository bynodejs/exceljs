'use strict';

// require modules
const Excel = require('exceljs'),
    readline = require('readline-sync');

let userInput = false;

const data = [
    { id: 1, name: 'hi' },
    { id: 2, name: 'bye' }
];

async function makeExcel(data) {

    let excel_data = await data.map(val => {
        return {
            '아이디': val.id,
            '이름': val.name
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
