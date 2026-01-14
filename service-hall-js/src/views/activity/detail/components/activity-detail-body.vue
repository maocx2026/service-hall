<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';
import { Button } from 'vant';
import URI from 'urijs';

import { namespaceT } from '@/helps/namespace-t';
import { OutsideUrl } from '@/config/outside-url';
import { goOutSideUrl } from '@/helps/navigation';

import { ActivityStaus, getActivityReserveBtnText } from '../helps/activity-status';

export default defineComponent({
  components: {
    VButton: Button,
  },

  props: {
    model: {
      type: Object,
      default: () => {},
    },
  },

  setup() {
    const vm = getCurrentInstance();

    function onClickMapLocation() {
      console.log('TODO:可能去到地图定位？');
    }

    function onClickReserve() {
      const { id } = vm.proxy.$route.params;
      const uri = new URI(OutsideUrl.appointCenter);
      uri.segment('BookingForm');
      uri.addQuery({
        id,
      });
      const url = uri.toString();
      goOutSideUrl({ url });
    }

    return {
      t: namespaceT('activity'),

      ActivityStaus,

      onClickMapLocation,
      onClickReserve,

      getActivityReserveBtnText,
    };
  },
});
</script>

<template>
  <div class="activity-body">
    <div class="location-wrap">
      <div class="location">
        <div class="location">
          {{ model.location }}
        </div>
        <div class="address">
          <div class="spirte spirte-activity-location" />
          {{ model.address }}
        </div>
      </div>

      <div
        class="spirte spirte-location-btn"
        @click="onClickMapLocation"
      />
    </div>

    <div class="activity-meta">
      <div class="meta-item">
        <div class="label">
          {{ t('label.organizer') }}
        </div>
        <div class="value">
          {{ model.organizer }}
        </div>
      </div>
      <div class="meta-item">
        <div class="label">
          {{ t('label.joinMethod') }}
        </div>
        <div class="value">
          {{ model.joinMethod }}
        </div>
      </div>
      <div class="meta-item">
        <div class="label">
          {{ t('label.reserveTime') }}
        </div>
        <div class="value">
          {{ model.reserveTime }}
        </div>
      </div>
    </div>

    <div class="activity-desc">
      <div class="title">
        {{ t('label.activityDesc') }}
      </div>
      <div class="cont">
        {{ model.activityDesc }}
      </div>
    </div>

    <div
      v-if="model.isNeedReserve"
      class="action-block"
    >
      <VButton
        block
        type="primary"
        class="vant-primary-btn"
        :disabled="model.status === ActivityStaus.END"
        @click="onClickReserve"
      >
        {{ getActivityReserveBtnText(model.status) }}
      </VButton>
    </div>
  </div>
</template>

<style lang="less" scoped>
.activity-body {
  margin-top: -0.24rem;
  padding: 0.2rem 0.2rem 1rem;
  border-top-left-radius: 0.24rem;
  border-top-right-radius: 0.24rem;
  background-color: #fff;
}

.location-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.16rem;
  border-bottom: 0.005rem solid fade(#000, 7);

  > .location {
    flex: 1;

    .location {
      color: #1d2129;
      font-weight: 500;
      font-size: 0.15rem;
      line-height: 1.4;
    }

    .address {
      display: flex;
      align-items: center;
      gap: 0.04rem;
      margin-top: 0.04rem;
      color: #777;
      font-weight: 400;
      font-size: 0.14rem;
    }
  }

  .spirte-location-btn {
    cursor: pointer;
  }
}

.activity-meta {
  padding-bottom: 0.16rem;
  border-bottom: 0.005rem solid fade(#000, 7);

  .meta-item {
    margin-top: 0.16rem;
    color: #777;
    font-weight: 400;
    font-size: 0.14rem;
    line-height: 1.4;

    .label {
      margin-bottom: 0.04rem;
      color: #222;
      font-weight: 500;
    }
  }
}

.activity-desc {
  margin-top: 0.16rem;

  .title {
    color: #222;
    font-weight: 500;
    font-size: 0.14rem;
    line-height: 1.4;
  }

  .cont {
    margin-top: 0.04rem;
    color: #777;
    font-weight: 400;
    font-size: 0.14rem;
    line-height: 1.57;
  }
}
</style>
