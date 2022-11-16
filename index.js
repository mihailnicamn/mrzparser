class MRZ {
    constructor() {
        this.dateformat = 'ro-RO';
        this.dateoptions = {};
        this._mrz = null;
    }
    loadCode(data) {
        this._mrz = this.normalize(data);
    }
    setDateOptions(dateoptions){
        this.dateoptions = dateoptions;
    }
    setDateFormat(dateformat){
        this.dateformat = dateformat;
    }
    normalize(data) {
      //if is array
      if (Array.isArray(data)) {
          //verify if data has 2 elements and if they are strings and the length of the strings is 36 each
          if (data.length === 2 && typeof data[0] === 'string' && typeof data[1] === 'string' && data[0].length === 36 && data[1].length === 36) {
              return this._mrz = data;
          } else {
              throw new Error('Invalid MRZ data');
          }
      }
      //if is string
      if (typeof data === 'string') {
          if(data.length < 72 || data.length > 72) throw new Error('Invalid MRZ length');
          //split the string into an array at 36 characters
          var lines = [
              data.substring(0, 36),
              data.substring(36, 72),
          ]
          //return the array
          return this._mrz = lines;
      }
    }
    parseDate(data) {
      const year = data.substring(0, 2);
      const month = data.substring(2, 4);
      const day = data.substring(4, 6);
      const current_year = new Date().getFullYear();
      const current_year_last_2_digits = parseInt(current_year.toString().substring(2, 4)) + 10;
      var normalised_year;
      if(year > current_year_last_2_digits) {
          normalised_year = '19'+year;
      }
      if(year < current_year_last_2_digits) {
          normalised_year = '20'+year;
      }
      return new Date(normalised_year+'-'+month+'-'+day).toLocaleDateString(this.dateformat, this.dateoptions);
    }
    getRawData(){
    return {
        type: this._mrz[0].substring(0, 2),
        issuer: this._mrz[0].substring(2, 5),
        full_name: this._mrz[0].substring(5, 36).replace(/</g, ' ').split(' ').filter(function (string) { return string.length > 0; }).join(' '),
        document_number: this._mrz[1].substring(0, 8).replace(/</g, ' '),
        cod_validare_1_9: this._mrz[1].substring(9, 10),
        nationality: this._mrz[1].substring(10, 13),
        date_of_birth: this._mrz[1].substring(13, 19),
        cod_validare_14_19: this._mrz[1].substring(19, 20),
        sex : this._mrz[1].substring(20, 21),
        valid_until : this._mrz[1].substring(21, 27),
        cod_validate_22_27: this._mrz[1].substring(27, 28),
        serie_cnp: this._mrz[1].substring(28, 29),
        cod_cnp: this._mrz[1].substring(29, 35),
        cod_validate_1_10_14_19_22_27: this._mrz[1].substring(35, 36),
    }

    }
    getHumanReadableData(){
        const raw_data = this.getRawData();
        return {
            tip: raw_data.type,
            tara: raw_data.issuer,
            nume_prenume: raw_data.full_name,
            serie_numar: raw_data.document_number,
            data_nastere: this.parseDate(raw_data.date_of_birth),
            data_expirare: this.parseDate(raw_data.valid_until),
            cnp: raw_data.serie_cnp+raw_data.date_of_birth+raw_data.cod_cnp,
            sex: raw_data.sex,
            cod_validare : {
                cod_1_9: raw_data.cod_validare_1_9,
                cod_14_19: raw_data.cod_validare_14_19,
                cod_22_27: raw_data.cod_validate_22_27,
                cod_1_10_14_19_22_27: raw_data.cod_validate_1_10_14_19_22_27,
            }
            
          }
    }
}
  
  module.exports = MRZ;