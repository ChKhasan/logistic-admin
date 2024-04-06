<template>
<div>
<TextComp ref="testComp" />
</div>

</template>

<script>
import CkeditorNuxt from '@/components/CkeditorNuxt';
import TextComp from '../components/text-comp.vue';

export default {
  components: { CkeditorNuxt },
  data() {
    return {
      content: '',
    };
  },
  async mounted() {
    await Object.assign(this.$refs.testComp,this.testList)
    console.log(this.$refs.testComp);
    let list = this.$refs.testComp.getData();
    list = list.map(item => item + 10);
    this.$refs.testComp.setList(list);
    this.$refs.testComp.$el.children[0].style.color = 'red'
  },
  methods: {
    testList() {
      console.log("tst list")
    }
  },
};
</script>
