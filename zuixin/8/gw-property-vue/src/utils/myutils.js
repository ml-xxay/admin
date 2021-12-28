export default {
  // 计算国网标准
  getGUOWANGBZ(kind, minvalue, maxvalue) {
    if (maxvalue == "0") {
      return ""
    } else {
      if (kind == 1) { //取最大值  <maxvalue
        return " < " + maxvalue;
      } else if (kind == 2) { //取区间值   minvalue~maxvalue
        return minvalue + " ~ " + maxvalue;
      } else if (kind == 3) { //取人均值   人均值value
        return " 人均值 " + maxvalue;
      } else if (kind == 4) { //取食堂值   小于100人*minvalue,大于100人的部分*maxvalue
        return " 小于100人 * " + minvalue + "，大于100人的部分 * " + maxvalue;
      } else {
        return "";
      }
    }
  },

  //传入 用房类型str  返回用房类型名称
  getGONGSILXNAME(str) {
    if (str == '1') {
      return "国网";
    } else if (str == '2') {
      return "一类用房";
    } else if (str == '3') {
      return "二类用房";
    } else if (str == '4') {
      return "三类用房";
    } else {
        if(str =='A类')
        {
          return "A类";
        }else if(str =='B类')
        {
          return "B类";
        }else if(str =='C类')
        {
          return "C类";
        }else
        {
          return "乡镇供电所";
        }
    }
  },

  //传入 用户权限num  返回权限名称
  getQUANXIAN(num) {
    if (num == 1) {
      return "超级管理员";
    } else if (num == 2) {
      return "国网用户";
    } else if (num == 3) {
      return "省级用户";
    } else if (num == 4) {
      return "市级用户";
    } else if (num == 5) {
      return "县级用户";
    } else {
      return ""
    }
  },

  //传入房产来源ID  返回房产来源名称
  getFangchan(num) {
    if (num == 1) {
      return "录入";
    } else if (num == 2) {
      return "导入";
    }
  },
  //传入房产属性转换
  getfangchanshuxing(num){
    if (num == 1) {
      return "自有";
    } else if (num == 2) {
      return "承租";
    }
  },
    //判断浏览器是否处于全屏状态 （需要考虑兼容问题）
  checkFull(){
    //火狐浏览器
    var isFull = document.mozFullScreen||
    document.fullScreen ||
    //谷歌浏览器及Webkit内核浏览器
    document.webkitIsFullScreen ||
    document.webkitRequestFullScreen ||
    document.mozRequestFullScreen ||
    document.msFullscreenEnabled
    if(isFull === undefined) {
        isFull = false
        }
        return isFull;
    },
  //转换成yy-mm-dd
  getFullDate(date) {
    var yy = date.getFullYear(); //年
    var mm = date.getMonth() + 1; //月
    var dd = date.getDate(); //日
    var clock = yy + "-";
    if (mm < 10) clock += "0";
    clock += mm + "-";
    if (dd < 10) clock += "0";
    clock += dd;
    return clock; //获取当前日期
  }
}
