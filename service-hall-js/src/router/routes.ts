import { RouteRecordRaw } from 'vue-router';
import { SiderMenuCodes as SMC } from '@/config/sider-menu';
import { RouterName as RN } from '@/config/router';
import TheRoot from '@/components/the-root.vue';
import { namespaceT } from '@/helps/namespace-t';

const t = namespaceT('docTitle');

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RN.Root,
    component: TheRoot,
    redirect: { name: RN.Home },
    children: [
      // 首页
      {
        path: 'home',
        name: RN.Home,
        component: () => import('@/views/home'),
        meta: {
          activeCode: SMC.Home,
          showBottomMenu: true,
          title: t('szlib'),
        },
      },
      // 深图数据
      {
        path: 'szlib-data',
        name: RN.SzlibData,
        component: () => import('@/views/inner-pages/szlib-data'),
        meta: {
          title: t('szlibData'),
        },
      },
      // 图书查询
      {
        path: 'search-result',
        name: RN.SearchResult,
        component: () => import('@/views/inner-pages/search-result'),
        meta: {
          title: t('searchResult'),
        },
      },
      // 少儿图书导航
     {
        path: 'shaoer-search',
        name: RN.ShaoerSearch,
        component: () => import('@/views/inner-pages/shaoer-search'),
        meta: {
          title: t('shaoerSearch'),
          keepAlive: true,
        },
      },
      // 我的读者证
      {
        path: 'my-read-card',
        name: RN.MyReadCard,
        redirect: { name: RN.MyReadCardIndex },
        component: () => import('@/views/inner-pages/my-read-card'),
        children: [
          {
            path: '',
            name: RN.MyReadCardIndex,
            component: () => import('@/views/inner-pages/my-read-card/my-read-card-index'),
            meta: {
              title: t('myReadCard'),
            },
          },
          {
            path: 'service-search-open',
            name: RN.ServiceSearchOpen,
            component: () => import('@/views/inner-pages/my-read-card/service-search-open'),
            meta: {
              title: t('serviceSearchOpen'),
            },
          },
          {
            path: 'change-card-auth',
            name: RN.ChangeCardAuth,
            component: () => import('@/views/inner-pages/my-read-card/change-card-auth'),
            meta: {
              title: t('changeReaderAuth'),
            },
          },
          {
            path: 'message-order',
            name: RN.MessageOrder,
            component: () => import('@/views/inner-pages/my-read-card/message-order'),
            meta: {
              title: t('messageOrder'),
            },
          },
          {
            path: 'change-password',
            name: RN.ChangePassword,
            component: () => import('@/views/inner-pages/my-read-card/change-password'),
            meta: {
              title: t('changePwd'),
            },
          },
          {
            path: 'account-bind',
            name: RN.AccountBind,
            component: () => import('@/views/inner-pages/my-read-card/account-bind'),
            meta: {
              title: t('accountBind'),
            },
          },
        ],
      },
      // 我的财经
      {
        path: 'my-finance',
        name: RN.MyFinance,
        component: () => import('@/views/inner-pages/my-finance'),
        meta: {
          title: t('myFinance'),
        },
      },
      // 申办虚拟证
      {
        path: 'apply-virtually-card',
        name: RN.ApplyVirtuallyCard,
        component: () => import('@/views/inner-pages/apply-virtually-card'),
        redirect: { name: RN.ApplyVirtuallyCardEntry },
        children: [
          {
            path: '',
            name: RN.ApplyVirtuallyCardEntry,
            component: () => import('@/views/inner-pages/apply-virtually-card/entry'),
            meta: {
              title: t('applyVirtualltCard'),
            },
          },
          {
            path: 'face-verify',
            name: RN.FaceVerify,
            component: () => import('@/views/inner-pages/apply-virtually-card/face-verify'),
            meta: {
              title: t('faceVerify'),
            },
          },
          {
            path: 'success',
            name: RN.ApplyVirtuallyCardSucc,
            component: () => import('@/views/inner-pages/apply-virtually-card/apply-success'),
            meta: {
              title: t('applyVirtualltCard'),
            },
          },
        ],
      },
      // 无线上网
      {
        path: 'wifi',
        name: RN.Wifi,
        component: () => import('@/views/inner-pages/my-read-card/service-search-open'),
        meta: {
          title: t('wifi'),
        },
      },
      // 我的借阅
      {
        path: 'my-borrow',
        name: RN.MyBorrow,
        component: () => import('@/views/inner-pages/my-borrow'),
        meta: {
          title: t('myBorrow'),
        },
      },
      // 资源导航
      {
        path: 'datasource-navigator',
        name: RN.DatasourceNavigator,
        component: () => import('@/views/inner-pages/datasource-navigator'),
        meta: {
          title: t('datasourceNavigator'),
        },
      },
      // 图书预借
      {
        path: 'book-advance-borrow',
        name: RN.BookAdvanceBorrow,
        component: () => import('@/views/inner-pages/book-advance-borrow'),
        redirect: { name: RN.BookAdvanceBorrowList },
        children: [
          {
            path: '',
            name: RN.BookAdvanceBorrowList,
            component: () => import('@/views/inner-pages/book-advance-borrow/list'),
            meta: {
              title: t('bookAdvanceBorrow'),
            },
          },
          {
            path: 'add',
            name: RN.BookAdvanceBorrowAdd,
            component: () => import('@/views/inner-pages/book-advance-borrow/add'),
            meta: {
              title: t('preLoanAdd'),
            },
          },
          {
            path: 'fast-loan',
            name: RN.FastLoan,
            component: () => import('@/views/inner-pages/book-advance-borrow/fast-loan'),
            meta: {
              title: t('fastLoan'),
            },
          },
          {
            path: 'add-cart',
            name: RN.AddExpressBookCart,
            component: () => import('@/views/inner-pages/book-advance-borrow/add-cart'),
            meta: {
              title: t('addBookCart'),
            },
          },
        ],
      },
      // 服务指南
      {
        path: 'service-guide',
        name: RN.ServiceGuide,
        component: () => import('@/views/inner-pages/service-guide'),
        meta: {
          title: t('serviceGuide'),
        },
      },
      // 手机阅读
      {
        path: 'mobile-read',
        name: RN.MobileRead,
        component: () => import('@/views/inner-pages/mobile-read'),
        meta: {
          title: t('mobileRead'),
        },
      },
      // 新书直通车
      {
        path: 'new-book-car',
        name: RN.NewBookCar,
        component: () => import('@/views/inner-pages/new-book-car'),
        redirect: { name: RN.NewBookCarIndex },
        meta: {
          title: t('newBookCart'),
        },
        children: [
          {
            path: '',
            name: RN.NewBookCarIndex,
            component: () => import('@/views/inner-pages/new-book-car/entry'),
          },
          {
            path: 'list',
            name: RN.NewBookCarList,
            component: () => import('@/views/inner-pages/new-book-car/list'),
          },
          {
            path: ':id/detail',
            name: RN.NewBookCarDetail,
            component: () => import('@/views/inner-pages/new-book-car/detail'),
            meta: {
              title: t('bookDetail'),
            },
          },
        ],
      },
      // 少儿图书
      {
        path: 'shaoer-book-list',
        name: RN.ShaoerBookList,
        component: () => import('@/views/inner-pages/shaoer-book-list'),
        redirect: { name: RN.ShaoerBookList },
        children: [
          {
            path: '',
            name: RN.ShaoerBookList,
            component: () => import('@/views/inner-pages/shaoer-book-list/list'),
            meta: {
              title: t('shaoerBookList'),
            },
          },
          {
            path: ':id/detail',//少儿书目详情页路由匹配
            name: RN.ShaoerBookDetail,
            component: () => import('@/views/inner-pages/shaoer-book-list/detail'),
            meta: {
              title: t('bookDetail'),
            },
          },
        ],
      },
      // 深图书单
      {
        path: 'szlib-book-list',
        name: RN.SzlibBookList,
        component: () => import('@/views/inner-pages/szlib-book-list'),
        redirect: { name: RN.SzlibBookListList },
        children: [
          {
            path: '',
            name: RN.SzlibBookListList,
            component: () => import('@/views/inner-pages/szlib-book-list/list'),
            meta: {
              title: t('szlibBookList'),
            },
          },
          {
            path: ':id/detail',//书目详情页路由匹配
            name: RN.SzlibBookListDetail,
            component: () => import('@/views/inner-pages/szlib-book-list/detail'),
            meta: {
              title: t('bookDetail'),
            },
          },
          // 查看图书馆藏
          {
            path: 'view-lib-collection',
            name: RN.ViewLibCoolection,
            component: () => import('@/views/inner-pages/szlib-book-list/view-lib-coolection'),
          },
        ],
      },
      // 信用积分-列表
      {
        path: 'credit-point-list',
        name: RN.CreditPointList,
        component: () => import('@/views/inner-pages/credit-point-list'),
        meta: {
          title: t('creditPoint'),
        },
      },
      // 信用积分
      {
        path: 'credit-point',
        name: RN.CreditPoint,
        component: () => import('@/views/inner-pages/credit-point'),
        meta: {
          title: t('myCreditPoint'),
        },
      },
      // 阅读积分
      {
        path: 'read-point',
        name: RN.ReadPoint,
        component: () => import('@/views/inner-pages/read-point'),
        meta: {
          title: t('myReadPoint'),
        },
      },
      // 消息中心
      {
        path: 'news-center',
        name: RN.NewsCenter,
        component: () => import('@/views/inner-pages/news-center'),
        meta: {
          title: t('newsCenter'),
        },
      },

      // 发现
      {
        path: 'discover',
        name: RN.Discover,
        component: () => import('@/views/discover'),
        redirect: { name: RN.DiscoverList },
        children: [
          {
            path: '',
            name: RN.DiscoverList,
            component: () => import('@/views/discover/list'),
            meta: {
              activeCode: SMC.Discover,
              showBottomMenu: true,
              title: t('discover'),
            },
          },
          {
            path: ':id/detail',
            name: RN.DiscoverDetail,
            component: () => import('@/views/discover/detail'),
            meta: {
              title: t('discoverDetail'),
            },
          },
          {
            path: 'book-list',
            name: RN.DiscoverBookList,
            component: () => import('@/views/discover/book-list'),
            meta: {
              title: t('discover'),
            },
          },
        ],
      },
      // 活动
      {
        path: 'activity',
        name: RN.Activity,
        component: () => import('@/views/activity'),
        redirect: { name: RN.ActivityList },
        children: [
          {
            path: '',
            name: RN.ActivityList,
            component: () => import('@/views/activity/list'),
            meta: {
              activeCode: SMC.Activity,
              showBottomMenu: true,
              title: t('activity'),
            },
          },
          {
            path: ':id/detail',
            name: RN.ActivityDetail,
            component: () => import('@/views/activity/detail'),
            meta: {
              title: t('activityDetail'),
            },
          },
        ],
      },
      // 我的
      {
        path: 'mine',
        name: RN.Mine,
        component: () => import('@/views/mine'),
        meta: {
          activeCode: SMC.Mine,
          showBottomMenu: true,
          title: t('myLibrary'),
        },
      },
      // 我的收藏
      {
        path: 'my-collection',
        name: RN.MyCollection,
        component: () => import('@/views/inner-pages/my-collection'),
        meta: {
          title: t('myCollection'),
        },
      },
      // 借阅历史
      {
        path: 'borrow-history',
        name: RN.BorrowHistory,
        component: () => import('@/views/inner-pages/borrow-history'),
        meta: {
          title: t('borrowHistory'),
        },
      },
      // 预借/调阅
      {
        path: 'advance-borrow-and-loan',
        name: RN.AdvanceBorrowAndLoan,
        component: () => import('@/views/inner-pages/advance-borrow-and-loan'),
        meta: {
          title: t('myAdvanceBorrowLoad'),
        },
      },
      // 预约/签到
      {
        path: 'appoint-and-sign',
        name: RN.AppointAndSign,
        component: () => import('@/views/inner-pages/appoint-and-sign'),
        redirect: { name: RN.AppointAndSignIndex },
        children: [
          {
            path: '',
            name: RN.AppointAndSignIndex,
            component: () => import('@/views/inner-pages/appoint-and-sign/appoint-and-sign-index'),
            meta: {
              title: t('appointAndSign'),
            },
          },
          {
            path: 'sign',
            name: RN.ActivitySign,
            component: () => import('@/views/inner-pages/appoint-and-sign/activity-sign'),
            meta: {
              title: t('activitySign'),
            },
          },
          {
            path: 'my-position',
            name: RN.MyPosition,
            component: () => import('@/views/inner-pages/appoint-and-sign/my-position'),
            meta: {
              title: t('myPosition'),
            },
          },
        ],
      },
      // 个人信息
      {
        path: 'personal-info',
        name: RN.PersonalInfo,
        component: () => import('@/views/inner-pages/personal-info'),
        redirect: { name: RN.PersonalInfoView },
        children: [
          {
            path: '',
            name: RN.PersonalInfoView,
            component: () => import('@/views/inner-pages/personal-info/view'),
            meta: {
              title: t('personalInfo'),
            },
          },
          {
            path: 'edit',
            name: RN.PersonalInfoEdit,
            component: () => import('@/views/inner-pages/personal-info/edit'),
            meta: {
              title: t('personalInfoEdit'),
            },
          },
        ],
      },
      // 快递书车
      {
        path: 'express-book-cart',
        name: RN.ExpressBookCart,
        component: () => import('@/views/inner-pages/express-book-cart'),
        meta: {
          title: t('expressBookCart'),
        },
      },
      // 我的荐购
      {
        path: 'my-recommend-purchase',
        name: RN.MyRecommendPurchase,
        component: () => import('@/views/inner-pages/my-recommend-purchase'),
        redirect: { name: RN.MyRecommendPurchaseIndex },
        children: [
          {
            path: '',
            name: RN.MyRecommendPurchaseIndex,
            component: () => import('@/views/inner-pages/my-recommend-purchase/entry-page'),
            meta: {
              title: t('myRecommendPurchase'),
            },
          },
          {
            path: 'list',
            name: RN.MyRecommendPurchaseList,
            component: () => import('@/views/inner-pages/my-recommend-purchase/list'),
            meta: {
              title: t('recommendPurchaseQuery'),
            },
          },
          {
            path: 'add',
            name: RN.MyRecommendPurchaseAdd,
            component: () => import('@/views/inner-pages/my-recommend-purchase/add'),
            meta: {
              title: t('newBookRecommendPusrchase'),
            },
          },
        ],
      },
      // 账号设置
      {
        path: 'relate-family-account',
        name: RN.RelateFamilyAccount,
        component: () => import('@/views/inner-pages/relate-family-account'),
        meta: {
          title: t('familyAccount'),
        },
      },

      // 登录
      {
        path: 'login',
        name: RN.Login,
        component: () => import('@/views/login'),
        meta: {
          title: t('login'),
        },
      },
      // 找回密码
      {
        path: 'find-password',
        name: RN.FindPassword,
        component: () => import('@/views/inner-pages/find-password'),
        redirect: { name: RN.FindPasswordEntry },
        children: [
          {
            path: '',
            name: RN.FindPasswordEntry,
            component: () => import('@/views/inner-pages/find-password/entry'),
            meta: {
              title: t('findPassword'),
            },
          },
          {
            path: 'login',
            name: RN.FindLoginPassword,
            component: () => import('@/views/inner-pages/find-password/find-login-password'),
            meta: {
              title: t('findLoginPassword'),
            },
          },
          {
            path: 'self',
            name: RN.FindSelfPassword,
            component: () => import('@/views/inner-pages/find-password/find-self-password'),
            meta: {
              title: t('findSelfPassword'),
            },
          },
        ],
      },
    ],
  },
];
