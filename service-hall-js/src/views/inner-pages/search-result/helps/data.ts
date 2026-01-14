import _ from 'lodash';
import { namespaceT } from '@/helps/namespace-t';
import { V_INDEX_CODE } from '@/consts/opac-fields';

export function objectNilFilter(obj) {
  return _.pick(obj, Object.keys(obj).filter((key) => !!obj[key]));
}

export function createVIndexOptions() {
  const t = namespaceT('consts.v_index');
  const list = [
    V_INDEX_CODE.TITLE,
    V_INDEX_CODE.AUTHOR,
    V_INDEX_CODE.ALL,
    V_INDEX_CODE.SUBJECT,
    V_INDEX_CODE.CLASSNO,
    V_INDEX_CODE.ISBN,
    V_INDEX_CODE.CALLNO,
    V_INDEX_CODE.PUBLISHER,
  ];
  const mapper = new Map([
    [V_INDEX_CODE.TITLE, t('title')],
    [V_INDEX_CODE.AUTHOR, t('author')],
    [V_INDEX_CODE.ALL, t('all')],
    [V_INDEX_CODE.SUBJECT, t('subject')],
    [V_INDEX_CODE.CLASSNO, t('calssno')],
    [V_INDEX_CODE.ISBN, t('isbn')],
    [V_INDEX_CODE.CALLNO, t('callno')],
    [V_INDEX_CODE.PUBLISHER, t('publisher')],
  ]);

  return list.map((value) => ({
    text: mapper.get(value),
    value,
  }));
}

export function createFilterModel() {
  return {
    f_subject: '',
    f_author: '',
    classno: '',
    publishyear: '',
  };
}

export function createFacetFilterModel() {
  return {
    subject: [],
    author: [],
    tablename: [],
    classno: [],
    publishyear: [],
    library: [],
  };
}

// 二级查询转化成对象
export function handleSecondQueryFilterString(str) {
  const obj = createFilterModel();
  str.split('fq=')
    .forEach((item) => {
      const [key, value] = item.split(':');
      obj[key] = value;
    });

  return obj;
}

// 二级查询转化成字符串
export function getSecondQueryFilterString(queryModel) {
  const filterModel = _.pick(queryModel, Object.keys(createFilterModel()));
  const filterQueryModel = objectNilFilter(filterModel);
  const string = Object.keys(filterQueryModel)
    .map((key) => {
      return `fq=${key}:${filterQueryModel[key]}`;
    })
    .join('');
  return string;
}
