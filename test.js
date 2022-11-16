const dateoptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const dateformat = 'ro-RO';
const mrz_code_lines = [
    'IDROUNUME<<PRENUME1<<PRENUME2<<<<<<<',
    'JD123456<1ROU0001012M100101311234564'
];
const mrz_code = 'IDROUNUME<<PRENUME1<<PRENUME2<<<<<<<JD123456<1ROU0001012M100101311234564'
const MRZ = require('./index.js');
const mrz = new MRZ(dateformat, dateoptions);
//load string
mrz.loadCode(mrz_code);
//set date format locale string
mrz.setDateFormat(dateformat);
//set date options object
mrz.setDateOptions(dateoptions);
// Output:
console.log(mrz.getRawData()); // raw data
console.log(mrz.getHumanReadableData()); // human readable


//load array
mrz.loadCode(mrz_code_lines);
//set date format locale string
mrz.setDateFormat(dateformat);
//set date options object
mrz.setDateOptions(dateoptions);
// Output:
console.log(mrz.getRawData()); // raw data
console.log(mrz.getHumanReadableData()); // human readable

