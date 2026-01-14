export enum BOOK_CART_ADD_STATUS {
  SUCCESS = 'SUCCESS', // 加入书车成功！
  HAS_ADDED = 'HAS_ADDED', // 您的书车里已添加过此书
  FETCH_LIMIT = 'FETCH_LIMIT', // 您的新书预约送书数已达上限， 无法提交送书请求
}
