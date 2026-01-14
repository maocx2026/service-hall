<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import { namespaceT } from '@/helps/namespace-t';
  import '@/styles/tag-pill.less';
  export default defineComponent({
    props: {
      modelValue: {
        type: Object,
        default: () => {},
      },
    },

    setup(props) {

      const colorMap: Record<string, string> = {
        '咖啡色': '#8B4513',
        '绿色': '#008000',
        '橙色': '#FFA500',
        '黄色': '#FFFF00',
        '蓝色': '#0000FF',
        '紫色': '#800080',
        '红色': '#FF0000',
        '银灰色': '#C0C0C0',
        '白色': '#FFFFFF'
      };





      const t = namespaceT('szlibBookList.detail');
      const model = ref(props.modelValue);

      return {
        t,
        model,
        colorMap,
      };
    },
  });
</script>


<template>
  <div class="content-wrap">
    <div class="base-info">
      <div class="sub-title">
        {{ t('title.baseInfo') }}
      </div>
      <div class="item">
        <div class="label">
          {{ t('label.publisher') }}
        </div>
        <div class="content">
          {{ model.publisher }}
        </div>
      </div>
      <div class="item">
        <div class="label">
          {{ t('label.isbn') }}
        </div>
        <div class="content">
          {{ model.isbn }}
        </div>
      </div>
      <div class="item">
        <div class="label">
          {{ t('label.classno') }}
        </div>
        <div class="content">
          {{ model.classno }}
        </div>
      </div>
      <div class="item">
        <div class="label">
          {{ t('label.subject') }}
        </div>
        <div class="content">
          {{ model.subject }}
        </div>
      </div>
      <div class="item">
        <div class="label">
          {{ t('label.price') }}
        </div>
        <div class="content">
          {{ model.price }}
        </div>
      </div>
    </div>

    <div class="base-info">
      <div class="sub-title">
        {{ t('label2.labelInfo') }}
      </div>



      <!-- 内容标签（仅AI分类显示） -->
      <div class="item" v-if="model.fenlei_type === 'AI分类'">
        <div class="label">AI内容标签</div>
        <div class="content content-tags">
    <span
      class="tag"
      v-for="t in (model.content_tag || '').split(',')"
      :key="t"
    >{{ t.trim() }}</span>
        </div>
      </div>

      <!-- 主题标签（始终显示） -->
      <div class="item">
        <div class="label">
          {{ model.fenlei_type === 'AI分类' ? 'AI主题标签' : '主题标签' }}
        </div>
        <div class="content ai-tags">
    <span
      class="tag"
      v-for="t in (model.all_themes || '').split(',')"
      :key="t"
    >{{ t.trim() }}</span>
        </div>
      </div>

      <!-- 年龄标签（始终显示） -->
      <div class="item">
        <div class="label">
          {{ model.fenlei_type === 'AI分类' ? 'AI年龄标签' : '年龄标签' }}
        </div>
        <div class="content age-tags">
            <span
              class="tag"
              v-for="t in (model.age || '').split(',')"
              :key="t"
            >{{ t.trim().replace(/^"+|"+$/g, '') }}</span>
        </div>
      </div>


      <div class="item">
        <div class="label">
          {{ t('label2.color') }} &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
        </div>
        <div class="content">
            <span
              class="color-dot"
              :style="{ backgroundColor: colorMap[model.color] || '#ccc' }"
            />
        </div>
        <div class="label">
          &nbsp;{{model.shelf }}
        </div>
      </div>



      <div class="item">
        <div class="label">
          {{ t('label2.fenlei_type') }}
        </div>
        <div class="content">
          &nbsp;&nbsp;{{ model.fenlei_type }}
        </div>
      </div>
    </div>
    <div
      v-if="model.recommendReason"
      class="block-item"
    >
      <div class="sub-title">
        {{ t('title.recommendReason') }}
      </div>
      <div class="content">
        {{ model.recommendReason }}
      </div>
    </div>



<!--
    <div
      v-if="model.contentSummary"
      class="block-item"
    >
      <div class="sub-title">
        {{ t('title.contentSummary') }}
      </div>
      <div class="content">
        {{ model.contentSummary }}
      </div>
    </div>
-->



    <div
      v-if="model.ai_comment"
      class="block-item"
    >
      <div class="cartoon-title">AI趣书评</div>
      <div class="content">
        {{ model.ai_comment }}
      </div>
    </div>

    <div
      v-if="model.additionSummary"
      class="block-item"
    >
      <div class="sub-title">
        {{ t('title.additionSummary') }}
      </div>
      <div class="content">
        {{ model.additionSummary }}
      </div>
    </div>



  </div>
</template>

<style lang="less" scoped>
  .content-wrap {
    min-height: calc(100vh - 1.89rem);
    padding: 0.2rem;
    margin-top: -0.24rem;
    border-radius: 0.24rem 0.24rem 0 0;
    background-color: #fff;

    .sub-title {
      margin-bottom: 0.04rem;
      color: #222;
      font-weight: 500;
      font-size: 0.14rem;
      line-height: 1.45;
    }

    .base-info {
      padding-bottom: 0.06rem;

      .sub-title {
        margin-bottom: 0.1rem;
      }

      .item {
        display: flex;
        gap: 0.1;
        margin-bottom: 0.1rem;
        color: #444;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 1.45;

        .label {
          min-width: 0.42rem;
          margin-right: 0.1rem;
          color: #777;
        }
      }
    }

    .block-item {
      padding-bottom: 0.16rem;
      padding-top: 0.16rem;
      border-top: 0.005rem solid fade(#000, 7);

      .content {
        color: #777;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 1.57;
      }
    }
    .color-dot {
      display: inline-block;
      width: 0.12rem;
      height: 0.12rem;
      border-radius: 0.02rem;
    }


    /* AI趣书评样式
    1. 选系统里最圆的商用免费字体 */
    .cartoon-title{
      /* 1. 字号改小 */
      font-size: 0.18rem;          /* 原来是 0.32rem */

      /* 2. 字重变细 */
      font-weight: 400;            /* 原来是 700 */

      /* 3. 描边减到 0.5 px，阴影也相应缩小 */
      text-shadow:
          -0.5px -0.5px 0 #000,
          0.5px -0.5px 0 #000,
        -0.5px  0.5px 0 #000,
        0.5px  0.5px 0 #000,
        2px 2px 0 #ff4d8d;         /* 原来是 3px */

      /* 3. 轻微倾斜 = 俏皮 */
      transform: rotate(-2deg);

      /* 4. 渐变背景（文字裁切模式）= 贴纸感 */
      background: linear-gradient(180deg, #ffe66f 0%, #ffb6c1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      /* 5. 再加一个外框圆角底，模拟贴纸 */
      position: relative;
      display: inline-block;
      padding: 0.06rem 0.18rem;
      border-radius: 0.12rem;
      background: linear-gradient(180deg, #ffe66f 0%, #ffb6c1 100%);
      box-shadow: 0 2px 4px rgba(0,0,0,.15);
    }

    /* 6. 白色高光小条，增强塑料贴纸感 */
    .cartoon-title::before{
      content: "";
      position: absolute;
      left: 0.08rem;
      top: 0.04rem;
      width: 60%;
      height: 0.04rem;
      background: rgba(255,255,255,.75);
      border-radius: 0.02rem;
    }

    /* ===== 1. 呼吸式缩放 ===== */
    @keyframes breathe {
      0%   { transform: rotate(-2deg) scale(1); }
      50%  { transform: rotate(-2deg) scale(1.3); } /* 4% 的放大，很轻微 */
      100% { transform: rotate(-2deg) scale(1); }
    }

    /* ===== 2. 晃两下（悬停） ===== */
    @keyframes wiggle {
      0%   { transform: rotate(-2deg); }
      25%  { transform: rotate(2deg); }
      50%  { transform: rotate(-2deg); }
      75%  { transform: rotate(2deg); }
      100% { transform: rotate(-2deg); }
    }

    /* ===== 3. 贴纸默认状态 ===== */
    .cartoon-title {
      /* 原来已有的样式保留，只补充动画 */
      animation: breathe 3s ease-in-out infinite; /* 3 秒一次，无限循环 */
    }

    /* ===== 4. 鼠标放上去 ===== */
    .cartoon-title:hover {
      /* 先停掉呼吸，再晃 */
      animation: none;
      animation: wiggle 0.3s ease-in-out 1;
    }
  }
</style>
