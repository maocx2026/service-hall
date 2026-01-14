import _ from 'lodash';
import { namespaceT } from '@/helps/namespace-t';
import { V_INDEX_CODE } from '@/consts/opac-fields';
import  { Ref } from 'vue';
import {getClass1Class2_ByAge, searchByTags} from '@/api/appdic';
import { getClass1ByAge } from '@/api/appdic';
import { getClass2_ByClass1Age } from '@/api/appdic';

export function objectNilFilter(obj) {
  return _.pick(obj, Object.keys(obj).filter((key) => !!obj[key]));
}

/** 根据年龄拿一级分类 */
export async function fetchClass1Options(ageList: string[]) {
  // if (!ageList.length) return [];                 // 没有年龄就返回空
  const { data } = await getClass1ByAge(ageList);
  return data.class1List || [];
}



export async function fetchClass2Options(class1List: string[], ageList?: string[]) {
  if (!class1List.length) return [];
  const { data } = await getClass2_ByClass1Age(class1List, ageList);
  //console.log(1111111)
  return data.class2List || [];
}


let isFetchingClass1Class2 = false;

/** 根据年龄拿一级分类 */
export async function fetchClass1Class2Options(ageList: string[]) {
  if (isFetchingClass1Class2) return;
  isFetchingClass1Class2 = true;
  try {
    const { data } = await getClass1Class2_ByAge(ageList);
    return data;
  } finally {
    isFetchingClass1Class2 = false;
  }
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
    V_INDEX_CODE.AGE,
    V_INDEX_CODE.CLASS1,
    V_INDEX_CODE.CLASS2,
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
    [V_INDEX_CODE.AGE, t('age')],
    [V_INDEX_CODE.CLASS1, t('class1')],
    [V_INDEX_CODE.CLASS2, t('class2')],
  ]);

  return list.map((value) => ({
    text: mapper.get(value),
    value,
  }));
}

export function createFilterModel() {
  return {
    subject: [],
    author: [],
    tablename: [],
    classno: [],
    publishyear: [],
    library: [],
    age:[],
    class1:[],
    class2:[],
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
    age:[],
    class1:[],
    class2:[],
  };
}


// 全部二级分类（默认全量显示）
export const class2OptionsAll = [];

// 把任意统一成字符串数组,参数去重
export function normalizeArray(value: any): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return Array.from(new Set(value.map(v => String(v))));
  return Array.from(new Set(String(value).split(',').filter(Boolean)));
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




/**
 * 分页加载书目列表（支持下滑加载更多）
 * @param filterModel 当前筛选条件
 * @param page 页码，从 1 开始
 * @param pageSize 每页条数
 */
export async function fetchBookListByFilter(
  filterModel: ReturnType<typeof createFilterModel>,
  page: number = 1,
  pageSize: number = 10
): Promise<any[]> {
  try {
    // 现在只传 4 个参数，编译通过
    const res = await searchByTags(filterModel.class2, filterModel.age, page, pageSize);
    return res?.data?.data || [];
  } catch (e) {
    console.error('分页加载书目失败:', e);
    return [];
  }
}

/**
 * 重置分页状态
 */
export function resetBookPagination(
  bookList: Ref<any[]>,
  currentPage: Ref<number>,
  finished: Ref<boolean>,
  loading: Ref<boolean>
) {
  bookList.value = [];
  currentPage.value = 1;
  finished.value = false;
  loading.value = false;
}
