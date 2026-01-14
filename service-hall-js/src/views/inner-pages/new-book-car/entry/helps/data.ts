import { namespaceT } from '@/helps/namespace-t';

import SelfFetchImg1 from '@/assets/img/self-fetch1.png';
import SelfFetchImg2 from '@/assets/img/self-fetch2.png';
import SelfFetchImg3 from '@/assets/img/self-fetch3.png';
import SelfFetchImg4 from '@/assets/img/self-fetch4.png';
import ExpressFetch1 from '@/assets/img/express-fetch1.png';
import ExpressFetch2 from '@/assets/img/express-fetch2.png';
import ExpressFetch3 from '@/assets/img/express-fetch3.png';
import ExpressFetch4 from '@/assets/img/express-fetch4.png';

export const TabCode = Object.freeze({
  SELF: 'SELF', // 预借自取
  EXPRESS: 'EXPRESS', // 快递到家
});

export function createTabs() {
  const t = namespaceT('newBookCart.tabs');
  return [
    {
      key: TabCode.SELF,
      title: t('self'),
    },
    {
      key: TabCode.EXPRESS,
      title: t('express'),
    },
  ];
}

export function getContentData(tabCode) {
  const ts = namespaceT('newBookCart.selfFetch');
  const te = namespaceT('newBookCart.expressFetch');
  const selfContent = {
    desc: ts('desc'),
    steps: [
      {
        key: 'step1',
        title: ts('step1[0]'),
        desc: ts('step1[1]'),
        img: SelfFetchImg1,
      },
      {
        key: 'step2',
        title: ts('step2[0]'),
        desc: ts('step2[1]'),
        img: SelfFetchImg2,
      },
      {
        key: 'step3',
        title: ts('step3[0]'),
        desc: ts('step3[1]'),
        img: SelfFetchImg3,
      },
      {
        key: 'step4',
        title: ts('step4[0]'),
        desc: ts('step4[1]'),
        img: SelfFetchImg4,
      },
    ],
  };
  const expressContent = {
    desc: te('desc'),
    steps: [
      {
        key: 'step1',
        title: te('step1[0]'),
        desc: te('step1[1]'),
        img: ExpressFetch1,
      },
      {
        key: 'step2',
        title: te('step2[0]'),
        desc: te('step2[1]'),
        img: ExpressFetch2,
      },
      {
        key: 'step3',
        title: te('step3[0]'),
        desc: te('step3[1]'),
        img: ExpressFetch3,
      },
      {
        key: 'step4',
        title: te('step4[0]'),
        desc: te('step4[1]'),
        img: ExpressFetch4,
      },
    ],
  };

  if (tabCode === TabCode.SELF) {
    return selfContent;
  }
  return expressContent;
}
