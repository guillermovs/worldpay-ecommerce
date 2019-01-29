<template>
  <main class="capsule">
    <div class="contain">
      
      <transition-group v-if="sProducts.length" name="items" tag="section" class="content" >
        <app-item
          v-for="(item, index) in sProducts"
          :key="'i-'+index"
          :item="item"
          :index="index"
        />
      </transition-group>
      <div v-else>
        No products!
      </div>
      
    </div>
  </main>
</template>

<script>
import AppItem from './../components/AppItem.vue';

export default {
  components: {
    AppItem
  },
  data() {
    return {
      //highprice: 300
    };
  },
  computed: {
    sProducts() {
      return this.$store.getters['speaker-sale'].filter(el => el.price < this.$store.state.priceLimit);
    }
  },
  mounted() {
    this.$store.commit('setPage', 'speaker-sale');
  }
};
</script>

<style>

</style>
