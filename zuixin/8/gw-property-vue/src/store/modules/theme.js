/**
 * 主题状态管理 license by http://eleadmin.com
 */
import setting from '@/config/setting';
import {changeColor} from 'ele-admin/packages/style/util.js';

// 获取本地缓存配置
let cache = {};
try {
  cache = JSON.parse(localStorage.getItem(setting.themeStoreName)) || {};
} catch (e) {
  console.error(e);
}

// 获取缓存的主题配置和缓存的主题css
const cacheTheme = getCache(cache, [
  'color', 'sideStyle', 'headStyle',
  'tabStyle', 'layoutStyle', 'sideMenuStyle', 'bodyFull',
  'fixedHeader', 'fixedSidebar', 'fixedBody',
  'showTabs', 'logoAutoSize', 'colorfulIcon',
  'sideUniqueOpen', 'showFooter', 'weakMode', 'darkMode'
], setting);

// 恢复色弱模式
if (cacheTheme.weakMode) {
  document.body.classList.add('ele-admin-weak');
}

// 恢复主题色
window.onload = function () {
  changeTheme(cacheTheme.color, cacheTheme.darkMode).catch(e => {
    console.error(e);
  });
}

// 获取屏幕宽度
const screenWidth = document.documentElement.clientWidth || document.body.clientWidth,
  screenHeight = document.documentElement.clientHeight || document.body.clientHeight;

export default {
  namespaced: true,
  state: {
    // 侧边栏风格: 0亮色, 1暗色
    sideStyle: cacheTheme.sideStyle,
    // 顶栏风格: 0亮色, 1暗色, 2主色
    headStyle: cacheTheme.headStyle,
    // 标签页风格: 0默认, 1圆点, 2卡片
    tabStyle: cacheTheme.tabStyle,
    // 布局风格: 0默认, 1顶部菜单风格, 2混合菜单风格
    layoutStyle: cacheTheme.layoutStyle,
    // 侧边栏菜单风格: default默认, mix双排菜单
    sideMenuStyle: cacheTheme.sideMenuStyle,
    // 是否固定侧栏
    fixedSidebar: cacheTheme.fixedSidebar,
    // 是否固定顶栏
    fixedHeader: cacheTheme.fixedHeader,
    // 是否固定主体
    fixedBody: cacheTheme.fixedBody,
    // 内容区域宽度铺满
    bodyFull: cacheTheme.bodyFull,
    // 是否开启多标签
    showTabs: cacheTheme.showTabs,
    // logo是否自适应宽度
    logoAutoSize: cacheTheme.logoAutoSize,
    // 侧栏是否多彩图标
    colorfulIcon: cacheTheme.colorfulIcon,
    // 侧边栏是否只保持一个子菜单展开
    sideUniqueOpen: cacheTheme.sideUniqueOpen,
    // 是否开启页脚
    showFooter: cacheTheme.showFooter,
    // 是否是色弱模式
    weakMode: cacheTheme.weakMode,
    // 是否是暗黑模式
    darkMode: cacheTheme.darkMode,
    // 主题色
    color: cacheTheme.color,
    // 是否折叠侧边栏
    collapse: screenWidth < 992,
    // 当前屏幕宽度
    screenWidth: screenWidth,
    // 当前屏幕高度
    screenHeight: screenHeight
  },
  mutations: {
    SET: (state, obj) => {
      state[obj.key] = obj.value;
      // 开关色弱模式
      if ('weakMode' === obj.key) {
        if (obj.value) {
          document.body.classList.add('ele-admin-weak');
        } else {
          document.body.classList.remove('ele-admin-weak');
        }
      }
      // 缓存修改的配置
      if (['collapse', 'screenWidth', 'screenHeight'].indexOf(obj.key) === -1) {
        let temp = JSON.parse(localStorage.getItem(setting.themeStoreName) || '{}');
        temp[obj.key] = obj.value;
        localStorage.setItem(setting.themeStoreName, JSON.stringify(temp));
      }
    }
  },
  actions: {
    /**
     * 修改配置
     * @param commit
     * @param obj
     */
    set({commit}, obj) {
      commit('SET', obj);
    },
    /**
     * 切换配置(boolean类型的配置)
     * @param commit
     * @param state
     * @param key
     */
    toggle({commit, state}, key) {
      commit('SET', {key: key, value: !state[key]});
    },
    /**
     * 更新屏幕尺寸
     * @param commit
     * @param state
     */
    updateScreen({commit, state}) {
      const w = document.documentElement.clientWidth || document.body.clientWidth,
        h = document.documentElement.clientHeight || document.body.clientHeight;
      if (w !== state.screenWidth) {
        commit('SET', {key: 'screenWidth', value: w});
      }
      if (h !== state.screenHeight) {
        commit('SET', {key: 'screenHeight', value: h});
      }
    },
    /**
     * 切换主题色
     * @param commit
     * @param state
     * @param color
     * @returns {Promise<>}
     */
    setColor({commit, state}, color) {
      return new Promise((resolve, reject) => {
        changeTheme(color, state.darkMode).then(() => {
          commit('SET', {key: 'color', value: color});
          return resolve();
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
}

/**
 * 获取缓存配置项
 * @param cache 缓存数据
 * @param k 配置项
 * @param v 默认值
 */
function getCache(cache, k, v) {
  if (Array.isArray(k)) {
    let obj = {};
    k.forEach(t => {
      obj[t] = (cache[t] === null || cache[t] === undefined) ? v[t] : cache[t];
    });
    return obj;
  } else {
    if (cache[k] === null || cache[k] === undefined) {
      return v;
    }
    return cache[k];
  }
}

/**
 * 切换主题
 * @param color 主题色
 * @param dark 是否是暗黑模式
 * @returns {Promise<>}
 */
function changeTheme(color, dark) {
  return new Promise((resolve, reject) => {
    try {
      changeColor(color, dark);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}
