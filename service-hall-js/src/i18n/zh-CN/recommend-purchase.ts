export default {
  menu: {
    add: '新书荐购',
    list: '荐购查询',
  },

  add: {
    label: {
      name: '题名',
      author: '作者',
      publicationPlace: '出版地',
      publisher: '出版社',
      publicationYear: '出版年',
      isbn: 'ISBN/ISSN',
      price: '价格',
      page: '页码',
      noticeMethod: '通知方式',
    },

    place: {
      name: '请输入题名',
      author: '请输入作者',
      publicationPlace: '请选择出版地',
      publisher: '请输入出版社',
      publicationYear: '请输入出版年',
      isbn: '请输入ISBN/ISSN',
      price: '请输入价格',
      page: '请输入页码',
    },

    tip: {
      title: '网上荐购',
      cont: [
        '1.如果您在某一领域涉猎较多，愿意参与图书馆的采购工作，您可以提出推荐意见，您的推荐将成为图书馆采访的重要依据。',
        '2.已入藏、已订购、已截止的图书不再接受推荐。',
      ],
    },
  },

  list: {
    label: {
      title: '题名：',
      people: '荐购人数：',
      replayMsg: '回复意见',
    },

    status: {
      replyed: '·已通知',
      reject: '·已拒绝',
      pending: '·待处理',
    },
  },
};
