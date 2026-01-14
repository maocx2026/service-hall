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
  age: [],
  class1:[],
  class2:[],

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
