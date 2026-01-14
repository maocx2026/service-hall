import CollectionCover from '@/assets/img/collection1.png';

export const SelfSampleListData = {
  total: 3,
  data: [
    {
      id: 1,
      recordno: 6313459,
      cover: CollectionCover,
      title: '品牌设计法则',
      type: '预借自取',
      address: '深圳北馆二楼总服务台',
      updateTime: '2024.03.31',
      status: 'READYING',
    },
    {
      id: 2,
      recordno: 6313459,
      cover: CollectionCover,
      title: '品牌设计法则',
      type: '预借自取',
      address: '深圳北馆二楼总服务台',
      updateTime: '2024.03.31',
      status: 'TIME_OUT',
      latestFetchTime: '2024.03.31',
    },
    {
      id: 3,
      recordno: 6313459,
      cover: CollectionCover,
      title: '品牌设计法则',
      type: '预借自取',
      address: '深圳北馆二楼总服务台',
      updateTime: '2024.03.31',
      status: 'READER_CANCEL',
    },
  ],
};

export const LoanSampleListData = {
  total: 3,
  data: [
    {
      id: 1,
      recordno: 6313459,
      cover: CollectionCover,
      title: '品牌设计法则',
      type: '保障本调取',
      address: '深圳北馆二楼总服务台',
      updateTime: '2024.03.31',
      status: 'READYING',
    },
    {
      id: 2,
      recordno: 6313459,
      cover: CollectionCover,
      title: '品牌设计法则',
      type: '保障本调取',
      address: '深圳北馆二楼总服务台',
      updateTime: '2024.03.31',
      status: 'TIME_OUT',
      latestFetchTime: '2024.03.31',
    },
    {
      id: 3,
      recordno: 6313459,
      cover: CollectionCover,
      title: '品牌设计法则',
      type: '保障本调取',
      address: '深圳北馆二楼总服务台',
      updateTime: '2024.03.31',
      status: 'READER_CANCEL',
    },
  ],
};

export function getSampleListData(type) {
  return type === 'SELF' ? SelfSampleListData : LoanSampleListData;
}

export const ExpressSampleListData = {
  total: 3,
  data: [
    {
      id: 1,
      orderNo: 6313459,
      orderTime: '2024.04.02 15:19:36',
      total: 3,
      status: 'PENDING',
      books: [
        {
          id: 1,
          cover: CollectionCover,
        },
        {
          id: 2,
          cover: CollectionCover,
        },
        {
          id: 3,
          cover: CollectionCover,
        },
      ],
    },
    {
      id: 2,
      orderNo: 6313459,
      orderTime: '2024.04.02 15:19:36',
      total: 3,
      status: 'READER_CANCEL',
      books: [
        {
          id: 1,
          cover: CollectionCover,
        },
        {
          id: 2,
          cover: CollectionCover,
        },
        {
          id: 3,
          cover: CollectionCover,
        },
      ],
    },
  ],
};
