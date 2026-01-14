import { ActivityStaus } from './activity-status';

export function createDetailModel() {
  return {
    activityType: '',
    title: '',
    activityTime: '',
    status: null,
    location: '',
    address: '',
    organizer: '',
    joinMethod: '',
    reserveTime: '',
    activityDesc: '',
    isNeedReserve: false,
  };
}

export function createActivityDetailData() {
  return {
    activityType: '书海探底',
    title: '智慧书库参观体验活动',
    activityTime: '2024年01月01日 10:00 - 2024年12月31日 11:30 ',
    status: ActivityStaus.PROCESS,
    location: '深圳图书馆北馆·智慧书库',
    address: '深圳市龙华区腾龙路30号',
    organizer: '深圳图书馆',
    joinMethod: '“图书馆之城”预约中心',
    reserveTime: '04.03 10:00 - 04.04 15:00',
    activityDesc: '虚拟与现实结合，游览全国最大地下智能立体书库和全国最快的图书分拣系统，以及跨楼层轨道调阅系统，亲身体验书箱纵横穿梭和自行走小车智能传输，感受这座智慧图书馆“深藏不露”的一面。',
    isNeedReserve: true,
  };
}
