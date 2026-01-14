import { namespaceT } from './namespace-t';


const tm = namespaceT('common.error');

export function createInputRules({
  type = 'string',
  message = tm('thisFieldIsRequired'),
} = {
  type: 'string',
  message: tm('thisFieldIsRequired'),
}) {
  return {
    type,
    message,
    required: true,
    trigger: 'change',
  };
}

export function createSelectRules({
  type = 'string',
  message = tm('thisFieldIsRequired'),
} = {
  type: 'string',
  message: tm('thisFieldIsRequired'),
}) {
  return {
    type,
    message,
    required: true,
    trigger: 'change',
  };
}
