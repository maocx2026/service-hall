export default {
  list: {
    keyword: '检索深圳市、区公共图书馆',

    action: {
      preLoan: '预借登记',
      fastLoan: '速借登记',
    },

    label: {
      bookCate: '文献类型',
      library: '所属图书馆',
      filter: '筛选',
      subject: '主题词',
      author: '作者',
      classno: '分类号',
      publishyear: '出版年',
      class1:'一级主题',
      class2:'二级主题',
      age:'年龄',
    },

    btn: {
      shrink: '收起',
      expend: '展开',
    },
  },

  cart: {
    tip: {
      title: '小提示：',
      content: [
        '图书馆免费为您找书，订单由快递公司负责配送。',
        '如只找到1册图书，亦安排配送，快递费不变。',
        '快递费到付6元',
      ],
    },

    btn: {
      backSearchReulust: '返回检索结果',
      viewBookCart: '查看书车',
    },

    hint: {
      addSuccess: '加入书车成功！',
      subSucc: '处理时间为3-5个工作日，敬请留意',
      hasAdded: '您的书车里已添加过此书',
      fetchLimit: '您的新书预约送书数已达上限， 无法提交送书请求',
    },
  },

  add: {
    btn: {
      viewOrder: '查看订单',
      submitLoan: '提交预借',
    },

    hint: {
      addSuccess: '提交成功',
      succTip: [
        '处理时间为3-5个工作日，敬请留意， ',
        '您的取书地点为',
      ],
      addFailed: '提交失败',
    },

    label: {
      noticeMethods: '1.选择通知方式',
      address: '2.选择取书地点',
    },

    text: {
      agree: [
        '我已同意',
        '《预借服务规则》',
      ],
      agreeInLibBorrow: [
        '我已同意',
        '《书海速借服务规则》',
      ],
      messageNoticeTip: '通知将由微信服务号"深圳图书馆｜图书馆之城"发送，敬请留意。',
      btnText: '同意并关闭',

      bookSeaTip: '请当天到取书点办理借书手续，否则将被记录违规。',
    },

    noticeMethod: {
      message: 'M 微信通知',
      self: 'S 网上自查',
    },

    error: {
      bookAddress: '请选择取书地点',
    },
  },
};
