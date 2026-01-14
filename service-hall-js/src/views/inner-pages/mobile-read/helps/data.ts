import { namespaceT } from '@/helps/namespace-t';
import { OutsideUrl } from '@/config/outside-url';

export function createTopAnchorLinkData() {
  const t = namespaceT('mobileRead.anchor');
  return [
    {
      key: 'readBook',
      title: t('readBook'),
      idName: 'read-book',
    },
    {
      key: 'listenBook',
      title: t('listenBook'),
      idName: 'listen-book',
    },
    {
      key: 'journal',
      title: t('journal'),
      idName: 'journal',
    },
    {
      key: 'study',
      title: t('study'),
      idName: 'study',
    },
    {
      key: 'media',
      title: t('media'),
      idName: 'media',
    },
  ];
}

export function createLinksData() {
  const ta = namespaceT('mobileRead.anchor');
  const tl = namespaceT('mobileRead.links');
  // TODO：这里链接需补充
  return [
    {
      key: 'readBookLinkBlock',
      title: ta('readBook'),
      idName: 'read-book',
      children: [
        {
          key: 'readBookLinkBlock-1',
          title: tl('qqRead'),
          url: '',
          isEn: false,
          isChild: false,
          isTry: false,
        },
        {
          key: 'readBookLinkBlock-2',
          title: tl('gede'),
          url: '',
        },
        {
          key: 'readBookLinkBlock-3',
          title: tl('yuanbanEn'),
          url: '',
          isEn: true,
          isChild: true,
          isTry: false,
        },
        {
          key: 'readBookLinkBlock-4',
          title: tl('aiDuAiKan'),
          url: '',
        },
        {
          key: 'readBookLinkBlock-5',
          title: tl('zhangyue'),
          url: '',
        },
        {
          key: 'readBookLinkBlock-6',
          title: tl('shuxiangshenzhen'),
          url: '',
          isTry: true,
        },
        {
          key: 'readBookLinkBlock-7',
          title: tl('zhutishugui'),
          url: '',
          isTry: true,
        },
        {
          key: 'readBookLinkBlock-8',
          title: tl('mingzhiguoxue'),
          url: '',
          isTry: true,
        },
      ],
    },
    {
      key: 'listenBookLinkBlock',
      title: ta('listenBook'),
      idName: 'listen-book',
      children: [
        {
          key: 'listenBookLinkBlock-1',
          title: tl('nezhakanshu'),
          url: '',
          isChild: true,
        },
        {
          key: 'listenBookLinkBlock-2',
          title: tl('ximalaya'),
          url: '',
        },
        {
          key: 'listenBookLinkBlock-3',
          title: tl('bokan'),
          url: '',
          isTry: true,
        },
        {
          key: 'listenBookLinkBlock-4',
          title: tl('baitingtingshu'),
          url: '',
          isTry: true,
        },
      ],
    },
    {
      key: 'journalLinkBlock',
      title: ta('journal'),
      idName: 'journal',
      children: [
        {
          key: 'journalLinkBlock-1',
          title: tl('bokanweikan'),
          url: '',
        },
        {
          key: 'journalLinkBlock-2',
          title: tl('longyuandianzikan'),
          url: '',
        },
      ],
    },
    {
      key: 'studyLinkBlock',
      title: ta('study'),
      idName: 'study',
      children: [
        {
          key: 'studyLinkBlock-1',
          title: tl('xindongfang'),
          url: '',
        },
        {
          key: 'studyLinkBlock-2',
          title: tl('tiantianwei'),
          url: '',
        },
        {
          key: 'studyLinkBlock-3',
          title: tl('zhiyequanneng'),
          url: '',
        },
        {
          key: 'studyLinkBlock-4',
          title: tl('zhongkekaoshi'),
          url: '',
        },
        {
          key: 'studyLinkBlock-5',
          title: tl('ruanjiantong'),
          url: '',
        },
        {
          key: 'studyLinkBlock-6',
          title: tl('shejishizhijia'),
          url: '',
        },
        {
          key: 'studyLinkBlock-7',
          title: tl('metEnglish'),
          url: '',
        },
        {
          key: 'studyLinkBlock-8',
          title: tl('weipu'),
          url: '',
        },
        {
          key: 'studyLinkBlock-9',
          title: tl('meChildTongshi'),
          url: '',
        },
        {
          key: 'studyLinkBlock-10',
          title: tl('chengxingshici'),
          url: '',
          isTry: true,
        },
        {
          key: 'studyLinkBlock-11',
          title: tl('chengxinglishi'),
          url: '',
          isTry: true,
        },
        {
          key: 'studyLinkBlock-12',
          title: tl('yuyaoyuan'),
          url: '',
          isTry: true,
        },
        {
          key: 'studyLinkBlock-13',
          title: tl('zhonghuafushi'),
          url: '',
          isTry: true,
        },
      ],
    },
    {
      key: 'mediaLinkBlock',
      title: ta('media'),
      idName: 'media',
      children: [
        {
          key: 'mediaLinkBlock-1',
          title: tl('shentushiting'),
          url: OutsideUrl.szlibMedia,
        },
        {
          key: 'mediaLinkBlock-2',
          title: tl('shenzhenjiyi'),
          url: '',
        },
        {
          key: 'mediaLinkBlock-3',
          title: tl('wangshangbaogaoting'),
          url: '',
        },
        {
          key: 'mediaLinkBlock-4',
          title: tl('kuke'),
          url: '',
        },
        {
          key: 'mediaLinkBlock-5',
          title: tl('jindaiyinxiang'),
          url: '',
        },
        {
          key: 'mediaLinkBlock-6',
          title: tl('zhishishijie'),
          url: '',
          isTry: true,
        },
      ],
    },
  ];
}
