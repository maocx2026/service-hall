// src/uses/useKeepAliveCache.ts
import { onActivated, onDeactivated } from 'vue';
import { useRoute } from 'vue-router';

export function useKeepAliveCache(key: string, state: Record<string, any>) {
  const route = useRoute();
  const cacheKey = `keepalive_${key}_${route.fullPath}`;

  function deepAssign(target: any, source: any) {
    for (const k in source) {
      if (k in target && Array.isArray(target[k])) {
        target[k] = [...source[k]]; // 数组特殊处理
      } else if (k in target && typeof target[k] === 'object' && target[k] !== null) {
        Object.assign(target[k], source[k]);
      } else if (k in target) {
        target[k] = source[k];
      }
      // 不在 target 里的字段直接丢弃，防止污染结构
    }
  }

  function saveState() {
    sessionStorage.setItem(cacheKey, JSON.stringify(state));
  }

  function restoreState() {
    const raw = sessionStorage.getItem(cacheKey);
    if (raw) {
      try {
        const data = JSON.parse(raw);
        deepAssign(state, data); // 安全赋值
      } catch (e) {
        console.warn('缓存数据解析失败', e);
      }
    }
  }

  onActivated(() => {
    restoreState();
  });

  onDeactivated(() => {
    saveState();
  });
}
