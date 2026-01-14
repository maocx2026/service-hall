

export function createLibAreaOptions() {
  return [
    { text: '全部', value: '' },
    { text: '福田区', value: '福田区' },
    { text: '南山区', value: '南山区' },
    { text: '宝安区', value: '宝安区' },
    { text: '盐田区', value: '盐田区' },
    { text: '罗湖区', value: '罗湖区' },
    { text: '龙岗区', value: '龙岗区' },
    { text: '光明区', value: '光明区' },
    { text: '坪山区', value: '坪山区' },
    { text: '龙华区', value: '龙华区' },
    { text: '大鹏新区', value: '大鹏新区' },
    { text: '深汕特别合作区', value: '深汕特别合作区' },
  ];
}

export function createLibTypeOptions() {
  return [
    { text: '全部类型', value: '1,2,3' },
    { text: '市/区级图书馆', value: '1' },
    { text: '分馆', value: '2' },
    { text: '自助图书馆', value: '3' },
  ];
}

export function createSearchModel() {
  return {
    sitType: '1,2,3',
    district: '',
    keyword: '',
  };
}
