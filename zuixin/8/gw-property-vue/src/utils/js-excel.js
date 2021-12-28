import xlsxStyle from 'xlsx-style';

export default {
  //https://www.cnblogs.com/liuxianan/p/js-excel.html
  // 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
  sheet2blob(sheet, sheetName) {
    sheetName = sheetName || 'sheet1';
    var workbook = {
      SheetNames: [sheetName],
      Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet;
    // 生成excel的配置项
    var wopts = {
      bookType: 'xlsx',
      // 要生成的文件类型
      bookSST: false,
      // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
      type: 'binary'
    };

    //转换成二进制 使用xlsx-style（XS）进行转换才能得到带样式Excel，2020-05-11
    var wbout = xlsxStyle.write(workbook, wopts);
    //console.log(wbout);
    var blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream"
    });
    // 字符串转ArrayBuffer
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
    return blob;
  },
  //获取当前日期，2019-12-25
  getFullTime() {
    var now = new Date();
    var yy = now.getFullYear(); //年
    var mm = now.getMonth() + 1; //月
    var dd = now.getDate(); //日
    var hh = now.getHours(); //时
    var ii = now.getMinutes(); //分
    var ss = now.getSeconds(); //秒
    var ms = now.getMilliseconds(); //毫秒
    var clock = yy + "-";
    if (mm < 10) clock += "0";
    clock += mm + "-";
    if (dd < 10) clock += "0";
    clock += dd + "-";
    if (hh < 10) clock += "0";
    clock += hh + "-";
    if (ii < 10) clock += '0';
    clock += ii + "-";
    if (ss < 10) clock += '0';
    clock += ss + "-";
    clock += ms;
    return clock; //获取当前日期
  },
  getColumnNameByIndex(i) {
    var result = String.fromCharCode('A'.charCodeAt() + i % 26);

    while (i >= 26) {
      i /= 26;
      i--;
      result = String.fromCharCode('A'.charCodeAt() + i % 26) + result;
    }
    return result;
  },
  saveAs(blob, fileName) {
    //生成一个a标签
    var a = document.createElement('a');
    a.style.display = 'none';
    a.download = fileName;
    a.id = "aexport";
    //生成一个label标签，用于触发a标签点击事件
    var lb = document.createElement('label');
    lb.
    for = "aexport";
    a.appendChild(lb);
    //创建一个URL对象，指向Blob对象
    var objectURL = window.URL.createObjectURL(blob);
    a.href = objectURL;

    //把a标签加入body
    document.body.appendChild(a);
    //触发a标签点击事件
    lb.click();
    //IE不支持createObjectURL，特殊处理
    // if (_isIE()) {
    //   window.navigator.msSaveOrOpenBlob(blob, fileName);
    // }
    //删除a标签
    document.body.removeChild(a);
    //回收内存
    URL.revokeObjectURL(objectURL);
  }
}
