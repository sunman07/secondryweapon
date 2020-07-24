<template>
  <div>
    <div class="content-t">
      <van-search v-model="value" placeholder="请输入搜索关键词" @input="onSearch" />
    </div>
    <div>
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        class="listcell"
        center
        :is-link="item.Status === '3'|| item.Status === '5'||item.Status === '6'||item.Status === '7'"
        :value="item.text"
        :label="item.UserCode"
        title-class="left-title"
        :value-class="item.color"
        @click="torouter(item)"
      >
        <!-- 自定义title -->
        <template #title>
          <span>{{item.Name}}</span>
          <span style="font-size: 10px;color: #969799;margin: 0 0 0 10px;">{{item.gender}}</span>
        </template>
        <!-- 使用 icon 插槽来自定义 -->
        <template slot="icon">
          <van-image
            round
            width="40px"
            height="40px"
            :src="item.ico? item.ico:require('../../assets/logo.png')"
          />
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { SearchStudent } from '../../service/common.service';
import { setAntTitle } from '../../lib/common';
export default {
  data() {
    return {
      value: '',
      list: '',
    };
  },
  created() {
    setAntTitle('扫码返校');
    this.loadList('');
  },
  methods: {
    loadList(name) {
      SearchStudent(name).then(res => {
        console.log(res);
        if (res.data.FeedbackCode === 0) {
          const li = res.data.Data;
          li.forEach(r => {
            switch (r.Status) {
              case '1':
                r.color = 'st1';
                r.text = '待安排';
                break;
              case '2':
                r.color = 'st2';
                r.text = '未申请';
                break;
              case '3':
                r.color = 'st3';
                r.text = '待审批';
                break;
              case '4':
                r.color = 'st4';
                r.text = '被驳回';
                break;
              case '5':
                r.color = 'st5';
                r.text = '在途';
                break;
              case '6':
                r.color = 'st6';
                r.text = '隔离';
                break;
              case '7':
                r.color = 'st7';
                r.text = '到校';
                break;
            }
          });
          this.list = li;
          console.log(li);
        }
      });
    },
    onSearch() {
      console.log(this.value);
      this.loadList(this.value);
    },
    torouter(i) {
      if (
        i.Status === '3' ||
        i.Status === '4' ||
        i.Status === '5' ||
        i.Status === '6' ||
        i.Status === '7'
      ) {
        console.log(i);
        this.$router.push({
          path: '/scandetails',
          query: { id: i.IntelUserCode },
        });
      }
    },
  },
};
</script>

<style scoped>
.content-t {
  /* background: #fff; */
  margin: 10px 15px;
  /* height: 160px; */
  /* border-radius: 10px; */
  /* padding: 0px 5px; */
}

.content-l {
  background: #fff;
  margin: 0 15px 10px 15px;
  /* height: 160px; */
  border-radius: 10px;
  padding: 0px 5px;
}

.left-title {
  padding: 0px 7px;
}

.st1 {
  color: #fbb200;
}

.st2 {
  color: #949493;
}

.st3 {
  color: #fbb407;
}

.st4 {
  color: #ff5500;
}

.st5 {
  color: #bdc514;
}

.st6 {
  color: #ff0000;
}

.st7 {
  color: #1bc870;
}

.listcell.van-cell {
  border-bottom: 0.5px solid #ebedf0;
}
</style>
