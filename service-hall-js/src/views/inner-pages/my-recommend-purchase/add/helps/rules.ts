import { createInputRules, createSelectRules } from '@/helps/rules';

export function createFromRules() {
  return {
    name: [
      createInputRules(),
    ],
    publicationPlace: [
      createSelectRules(),
    ],
    isbn: [
      createInputRules(),
    ],
  };
}
