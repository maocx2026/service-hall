export function createBookDetailModel() {
  return {

    title: '',
    author: '',
    publisher: '',
    cover: '',
    isbn: '',
    series: '',
    classno: '',// 分类号
    lang: '',

    content_tag: '',
    all_themes: '',
    final_theme: '',
    age: '',
    color: '',
    fenlei_type:'',


    favouriteNum: 0, // 点赞数量
    isFavourite: false, // 是否点赞
    rate: 0, // 评分
    isCollected: false, // 是否收藏
    subject: '', // 关键词
    price: '', // 价格
    canPreLoan: false, // 是否能预借登记
    canAddCart: false, // 是否能加书车
    recommendReason: '', // 推荐理由
    additionSummary: '', // 附注提要
    contentSummary: '', // 内容提要
    booklistInfo: {
      cate: '',
      cateText: '',
      year: '',
      issue: '',
    }, // 深图书单信息
  };
}
