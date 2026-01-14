import { OutsideUrl } from '@/config/outside-url';
import { namespaceT } from '@/helps/namespace-t';
import { QuickLinkData } from '@/types/quick-link';

export function createMenuDatas(): QuickLinkData[] {
  const t = namespaceT('menus.serviceGuide');
  return [
    {
      key: 'readerKonwnAndCardGuide',
      title: t('readerKonwnAndCardGuide'),
      url: `${OutsideUrl.officalWeb}/page/admission-notice.html`,
    },
    {
      key: 'serviceAreaDsiplay',
      title: t('serviceAreaDsiplay'),
      url: `${OutsideUrl.officalWeb}/libraryLayout/first-floor.html`,
    },
    {
      key: 'bookBorrowService',
      title: t('bookBorrowService'),
      url: `${OutsideUrl.officalWeb}/page/interlibrary-loan-service.html`,
    },
    {
      key: 'netDataSourceService',
      title: t('netDataSourceService'),
      url: `${OutsideUrl.officalWeb}/page/network-service-area.html`,
    },
    {
      key: 'consultAndSubjectService',
      title: t('consultAndSubjectService'),
      url: `${OutsideUrl.officalWeb}/page/interlibrary-loan.html`,
    },
    {
      key: 'childService',
      title: t('childService'),
      url: `${OutsideUrl.officalWeb}/page/children-service-area.html`,
    },
    {
      key: 'voiceAndPhoneSystem',
      title: t('voiceAndPhoneSystem'),
      url: `${OutsideUrl.officalWeb}/page/self-voice-calls.html`,
    },
    {
      key: 'mobilePortal',
      title: t('mobilePortal'),
      url: `${OutsideUrl.officalWeb}/page/id-2254083.html`,
    },
    {
      key: 'messageServicePlatform',
      title: t('messageServicePlatform'),
      url: `${OutsideUrl.officalWeb}/page/sms-service-platform.html`,
    },
    {
      key: 'weboAndWechart',
      title: t('weboAndWechart'),
      url: `${OutsideUrl.officalWeb}/page/library-weibx-webbo.html`,
    },
  ];
}
