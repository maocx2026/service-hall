import { namespaceT } from '@/helps/namespace-t';
import { V_INDEX_CODE } from '@/consts/opac-fields';

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
