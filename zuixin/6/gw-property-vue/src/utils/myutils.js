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

  //传入 用房类型num  返回用房类型名称
  getGONGSILXNAME(num) {
    if (num == 1) {
      return "国网";
    } else if (num == 2) {
      return "一类用房";
    } else if (num == 3) {
      return "二类用房";
    } else if (num == 4) {
      return "三类用房";
    } else {
      return "乡镇供电所";
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
  }
}
