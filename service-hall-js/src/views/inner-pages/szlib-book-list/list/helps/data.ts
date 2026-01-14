import { namespaceT } from '@/helps/namespace-t';


export function createCateDatas() {
  const t = namespaceT('szlibBookList.cate');

  return [
    {
      code: '',
      title: t('home'),
    },
    {
      code: 'cate-1',
      title: t('newBook'),
    },
    {
      code: 'cate-2',
      title: t('eBook'),
    },
    {
      code: 'cate-3',
      title: t('childBook'),
    },
    {
      code: 'cate-4',
      title: t('mandushiguang'),
    },
    {
      code: 'cate-5',
      title: t('nanshufang'),
    },
    {
      code: 'cate-6',
      title: t('shenzhenjiyi'),
    },
    {
      code: 'cate-7',
      title: t('yiyuxiezheng'),
    },
    {
      code: 'cate-8',
      title: t('shuhai'),
    },
    {
      code: 'cate-9',
      title: t('meidu'),
    },
    {
      code: 'cate-10',
      title: t('jiating'),
    },
  ];
}
