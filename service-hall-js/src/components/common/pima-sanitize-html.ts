import sanitize from 'sanitize-html';
import { h } from 'vue';

const allowedTags = [
  ...sanitize.defaults.allowedTags,
  'span',
  'img',
  'video',
  'source',
];

const allowedAttributes = {
  ...sanitize.defaults.allowedAttributes,
  '*': ['class', 'style', 'width', 'height'],
  td: ['valign', 'rowspan', 'colspan'],
  video: ['src', 'controls', 'preload'],
  source: ['src', 'type'],
};

export default {
  props: {
    innerHtml: {
      type: String,
      default: '',
    },
  },
  render() {
    return h('div', {
      innerHTML: sanitize(this.innerHtml, {
        allowedTags,
        allowedAttributes,
      }),
    });
  },
};
