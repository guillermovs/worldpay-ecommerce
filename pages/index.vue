<template>
  <main class="capsule">
    <div class="contain">

      <transition-group v-if="products.length" name="items" tag="section" class="content" >
        <app-item
          v-for="(item, index) in products"
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
  //props : ['highprice'],
  data() {
    return {
      //highprice: 300
    };
  },
  computed: {
    products() {
      return this.$store.state.products.filter(el =>
        this.$store.state.sale
          ? el.price < this.$store.state.priceLimit && el.sale
          : el.price < this.$store.state.priceLimit
      );
    }
  },

  mounted() {
    this.$store.commit('setPage', 'index');
  }
};
</script>

<style>
/* no grid support */
/*
aside {
  float: left;
  width: 19.1489%;
}
*/

.content {
  /*no grid support*/
  width: 100%;
  /* grid */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  padding: 0 !important;
  margin-top: -130px;
}

@supports (display: grid) {
  .capsule > * {
    width: auto;
    margin: 0;
  }
}
</style>
