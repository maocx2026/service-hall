// src/types/global.d.ts
import { Emitter } from 'mitt';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $eventBus: Emitter;
  }
}
