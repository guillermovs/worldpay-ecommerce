<template>
  <main class="capsule">
    <div class="contain">
      <transition-group v-if="wProducts.length" name="items" tag="section" class="content" >
        <app-item
          v-for="(item, index) in wProducts"
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
    wProducts() {
      return this.$store.getters['smart-speakers'].filter(el =>
        this.$store.state.sale
          ? el.price < this.$store.state.priceLimit && el.sale
          : el.price < this.$store.state.priceLimit
      );
    }
  },

  mounted() {
    this.$store.commit('setPage', 'smart-speakers');
  }
};
</script>
