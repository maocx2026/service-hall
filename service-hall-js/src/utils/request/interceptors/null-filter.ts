import _ from 'lodash';


function arrayNilFilter(arr) {
  return arr.filter((o) => !_.isNil(o));
}

function objectNilFilter(obj) {
  return _.pick(obj, Object.keys(obj).filter((key) => !_.isNil(obj[key])));
}

function nilFilter(target) {
  if (_.isArray(target)) {
    let arr = arrayNilFilter(target);
    arr = arr.map((item) => nilFilter(item));
    return arr;
  }

  if (_.isPlainObject(target)) {
    const obj = objectNilFilter(target);
    Object.keys(obj).forEach((key) => {
      obj[key] = nilFilter(obj[key]);
    });
    return obj;
  }

  return target;
}

export function interceptorNilFilter(config) {
  const params = objectNilFilter(config.params);
  Object.assign(config, {
    params,
  });


  if (config.data instanceof FormData) {
    return config;
  }

  const data = nilFilter(_.cloneDeep(config.data));
  Object.assign(config, {
    data,
  });

  return config;
}
