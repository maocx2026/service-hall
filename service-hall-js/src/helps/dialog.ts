import { showDialog, showConfirmDialog } from 'vant';

export function openErrorDialog(message, cb = () => {}) {
  // eslint-disable-next-line max-len
  const formatMsg = `<div class="dialog-bg"></div><div class="sh-msg-dialog"><div class="spirte spirte-result-error"></div><div class="message">${message}</div></div>`;
  showDialog({
    message: formatMsg,
    allowHtml: true,
    className: 'sh-msg-dialog-wrap',
  }).then(() => {
    cb();
  });
}

export function openSuccDialog(message, cb = () => {}) {
  // eslint-disable-next-line max-len
  const formatMsg = `<div class="dialog-bg"></div><div class="sh-msg-dialog"><div class="spirte spirte-result-success"></div><div class="message">${message}</div></div>`;
  showDialog({
    message: formatMsg,
    allowHtml: true,
    className: 'sh-msg-dialog-wrap',
  }).then(() => {
    cb();
  });
}

export function openConfirmDialog(message, resolve = () => {}, reject = () => {}) {
  // eslint-disable-next-line max-len
  const formatMsg = `<div class="dialog-bg"></div><div class="sh-msg-dialog"><div class="message">${message}</div></div>`;
  showConfirmDialog({
    message: formatMsg,
    allowHtml: true,
    className: 'sh-msg-dialog-wrap',
  }).then(() => {
    resolve();
  }).catch(() => {
    reject();
  });
}

export function openFavouriteDialog(message, cb = () => {}) {
  // 点赞的结果弹窗
  // eslint-disable-next-line max-len
  const formatMsg = `<div class="dialog-bg"></div><div class="sh-msg-dialog"><div class="spirte spirte-favourite-dialog"></div><div class="message">${message}</div></div>`;
  showDialog({
    message: formatMsg,
    allowHtml: true,
    className: 'sh-msg-dialog-wrap',
  }).then(() => {
    cb();
  });
}

export function openCollectionDialog(message, cb = () => {}) {
  // 收藏的结果弹窗
  // eslint-disable-next-line max-len
  const formatMsg = `<div class="dialog-bg"></div><div class="sh-msg-dialog"><div class="spirte spirte-collection-dialog"></div><div class="message">${message}</div></div>`;
  showDialog({
    message: formatMsg,
    allowHtml: true,
    className: 'sh-msg-dialog-wrap',
  }).then(() => {
    cb();
  });
}

export function openMessagerDialog(message, cb = () => {}) {
  // eslint-disable-next-line max-len
  const formatMsg = `<div class="dialog-bg"></div><div class="sh-msg-dialog"><div class="message">${message}</div></div>`;
  showDialog({
    message: formatMsg,
    allowHtml: true,
    className: 'sh-msg-dialog-wrap',
  }).then(() => {
    cb();
  });
}
