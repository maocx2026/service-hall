import CollectionCover from '@/assets/img/collection1.png';


export const SampleListData = {
  total: 4,
  data: [
    {
      id: 1,
      recordno: 6313459,
      cover: CollectionCover,
      title: '明朝那些事儿大合集',
      author: '[英] 奥斯汀',
      publisher: '北京理工大学出版社',
      price: '￥56.00',
      leftNum: 5,
      preloan: true,
    },
    {
      id: 2,
      recordno: 6313459,
      cover: CollectionCover,
      title: '品牌设计法则',
      author: '[英] 奥斯汀',
      publisher: '北京理工大学出版社',
      price: 'CNY56.00',
      leftNum: 5,
      preloan: true,
    },
    {
      id: 3,
      recordno: 6313459,
      cover: CollectionCover,
      title: '汉代的谣言',
      author: '[英] 奥斯汀',
      publisher: '北京理工大学出版社',
      price: '￥56.00',
      leftNum: 5,
      preloan: false,
    },
    {
      id: 4,
      recordno: 6313459,
      cover: CollectionCover,
      title: '明朝那些事儿大合集',
      author: '[英] 奥斯汀',
      publisher: '北京理工大学出版社',
      price: '￥56.00',
      leftNum: 5,
      preloan: true,
    },
  ],
};

export const FacetQueryDataSource = {
  subject: [
    {
      title: '古代史(1506)',
      value: '古代史',
    },
    {
      title: '中国历史(1156)',
      value: '中国历史',
    },
    {
      title: '纪传体(813)',
      value: '纪传体',
    },
    {
      title: '中国(458)',
      value: '中国',
    },
  ],
  author: [
    {
      title: '司马迁(1112)',
      value: '司马迁',
    },
    {
      title: '司马贞(129)',
      value: '司马贞',
    },
    {
      title: '张大可(125)',
      value: '张大可',
    },
    {
      title: '张守节(116)',
      value: '张守节',
    },
    {
      title: '韩兆琦(114)',
      value: '韩兆琦',
    },
    {
      title: '裴骃(99)',
      value: '裴骃',
    },
    {
      title: '西汉司马迁(75)',
      value: '西汉司马迁',
    },
    {
      title: '王立群(50)',
      value: '王立群',
    },
    {
      title: '丁德科(46)',
      value: '丁德科',
    },
    {
      title: '张新科(39)',
      value: '张新科',
    },
  ],
  classno: [
    {
      title: '马克思主义(6)',
      value: 'A*',
    },
    {
      title: '哲学(11)',
      value: 'B*',
    },
    {
      title: '社会科学总论(14)',
      value: 'C*',
    },
  ],
  publishyear: [
    {
      title: '2023(85)',
      value: '2023',
    },
    {
      title: '2022(87)',
      value: '2022',
    },
    {
      title: '2021(71)',
      value: '2021',
    },
    {
      title: '2020(35)',
      value: '2020',
    },
  ],
  library: [
    {
      text: '全部图书馆',
      value: '',
    },
    {
      text: '深圳图书馆',
      value: '01',
    },
    {
      text: '宝安区图书馆',
      value: '02',
    },
    {
      text: '龙岗区图书馆',
      value: '03',
    },
    {
      text: '罗湖区图书馆',
      value: '04',
    },
  ],
  tablename: [
    {
      text: '全部',
      value: 'bibliosm,serbibm,apabibibm,mmbibm',
    },
    {
      text: '图书',
      value: 'bibliosm',
    },
    {
      text: '预借图书',
      value: 'bibliosm_pre',
    },
    {
      text: '外借图书',
      value: 'bibliosm_borrow',
    },
    {
      text: '阅览图书',
      value: 'bibliosm_read',
    },
    {
      text: '期刊',
      value: 'serbibm',
    },
    {
      text: '电子书',
      value: 'apabibibm',
    },
    {
      text: '音像',
      value: 'mmbibm',
    },
  ],
};
