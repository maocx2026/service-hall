// import _ from 'lodash';


export function isiOSClient() {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

export function getWxConfigUrl() {
  let signLink = '';

  if (isiOSClient()) {
    signLink = sessionStorage.getItem('wxIosFirstVisitUrl');
    if (!signLink) {
      [signLink] = window.location.href.split('#');
    }
  } else {
    [signLink] = window.location.href.split('#');
  }

  return signLink;
}

export function setWxIosFirstVisitUrl() {
  if (isiOSClient()) {
    sessionStorage.setItem('wxIosFirstVisitUrl', window.location.href.split('#')[0]);
  }
}
