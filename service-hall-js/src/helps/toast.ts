import { showSuccessToast, showFailToast, showLoadingToast } from 'vant';

export function openToastLoading(text) {
  showLoadingToast({
    message: text,
    forbidClick: true,
  });
}

export function openToastError(content) {
  showFailToast(content);
}

export function openToastSuccess(content) {
  showSuccessToast(content);
}
