import { slashEnd } from '@/helps/slash-end';

export const OutsideUrl = Object.freeze({
  officalWeb: slashEnd(process.env.VUE_APP_OFFICAL_WEB_URL), // 深图官网
  appointCenter: process.env.VUE_APP_APPOINT_CENTER_URL, // 预约中心
  szlibMedia: process.env.VUE_APP_SZLIB_MEDIA_URL, // 首页资源-深图视听
  cityAdvanceBorrow: process.env.VUE_APP_CITY_ADVANCE_BORROW_URL, // 首页上新-城际互借
  szlibNorth: process.env.VUE_APP_SZLIB_NORTH_URL, // 首页上新-深图北馆
  personalCenter: process.env.VUE_APP_PERSONAL_CENTER_URL, // 个人中心
});
