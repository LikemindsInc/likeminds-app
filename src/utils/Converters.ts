class Converter {
  static dataURItoBlob(dataURI: string) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  static thousandSeparator(amount: number) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  static formatNumber(number: number) {
    if (number >= 1e12) {
      // If the number is greater than or equal to 1 trillion, format as T (trillion)
      return Converter.thousandSeparator(number / 1e12) + "T";
    } else if (number >= 1e9) {
      // If the number is greater than or equal to 1 billion, format as B (billion)
      return Converter.thousandSeparator(number / 1e9) + "B";
    } else if (number >= 1e6) {
      // If the number is greater than or equal to 1 million, format as M (million)
      return Converter.thousandSeparator(number / 1e6) + "M";
    } else if (number >= 1e3) {
      // If the number is greater than or equal to 1 thousand, format as K (thousand)
      return Converter.thousandSeparator(number / 1e3) + "K";
    } else {
      // Otherwise, leave the number as is
      return number.toString();
    }
  }
}

export default Converter;
