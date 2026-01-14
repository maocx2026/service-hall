import { namespaceT } from '@/helps/namespace-t';
import { V_INDEX_CODE } from '@/consts/opac-fields';


export function createVIndexOptions() {
  const t = namespaceT('consts.v_index');
  const list = [
    V_INDEX_CODE.TITLE,
    V_INDEX_CODE.AUTHOR,
    V_INDEX_CODE.CLASSNO,
    V_INDEX_CODE.ISBN,
  ];
  const mapper = new Map([
    [V_INDEX_CODE.TITLE, t('title')],
    [V_INDEX_CODE.AUTHOR, t('author')],
    [V_INDEX_CODE.CLASSNO, t('calssno')],
    [V_INDEX_CODE.ISBN, t('isbn')],
  ]);

  return list.map((value) => ({
    text: mapper.get(value),
    value,
  }));
}

export function createCateColumns() {
  return [
    { text: '不限', value: '' },
    { text: '少儿', value: 'M02' },
    { text: '文学', value: 'I' },
    { text: '经济', value: 'F' },
    { text: '历史、地理', value: 'K' },
    { text: '文化、科学、教育、体育', value: 'G' },
    { text: '语言、文学、艺术', value: 'H,J' },
    { text: '哲学、宗教', value: 'B' },
    { text: '社会总论、政治、法律', value: 'C,D' },
    { text: '工业技术', value: 'T' },
    { text: '医药、卫生', value: 'R' },
    { text: '数理化、地理科学、生物科学', value: 'O,P,Q' },
    { text: '其他', value: 'A,E,N,S,U,V,X,Z' },
  ];
}
