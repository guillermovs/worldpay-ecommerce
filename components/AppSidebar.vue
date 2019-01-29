<template>
  <aside>
    <div class="sidearea">
      
      <app-switch v-if="!sale" />
      
      <label for="pricerange" class="max-price-wrap">
        <label class="price-label">Showing products</label>
        <div class="selected-price"><span>£{{ pricerange }}</span> <label>and under</label></div>
      </label>
      <input 
        class="slider" 
        id="pricerange" 
        type="range"
        :value="pricerange"  
        :min="min" 
        :max="max" 
        step="1" 
        @input="updatePriceLimit($event.target.value)"
        inputa="$emit('update:pricerange', $event.target.value)"
      />
      <span class="min">£{{ min }}</span>
      <span class="max">£{{ max }}</span>
    </div>

  </aside>
</template>

<script>
import AppSwitch from './AppSwitch.vue';

export default {
  props: {
    sale: {
      type: Boolean,
      default: false
    },
    pricerange: {
      type: [Number, String],
      default: 300
    }
  },
  data() {
    return {
      min: 100,
      max: 2000
    };
  },
  components: {
    AppSwitch
  },
  methods: {
    updatePriceLimit: function(newPrice){
      this.$emit('update:pricerange', newPrice)
      this.$store.commit('setPriceLimit', newPrice)
    }
  }
};
</script>

<style lang="scss" scoped>

.sidearea {
  border-bottom: 1px solid #ccc;
  &:last-of-type {
    border: none;
  }
}

.callout {
  padding: 20px 0;
  h4 {
    padding-bottom: 10px;
  }
}

label {
  font-family: 'Quicksand', serif;
  padding: 15px 0;
  text-align: center;
}

/*--input range--*/
.sidearea:first-of-type {
  padding-bottom: 30px;
}

label {
  font-family: 'Quicksand', serif;
  padding: 15px 0;
  text-align: center;
}

.max-price-wrap{
  display:block;
  text-align: right;
  padding: 0;
}

.max-price-wrap .price-label{
  text-align: right;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 0px;
  display: block;
  padding-bottom: 10px;
  color:#fff;
}

.selected-price{
  font-size: 25px;
  background-color: rgba(255, 255, 255, 0.25);
  padding: 2px 8px;
  border-radius: 8px;
  display: inline-block;
  color:#fff;
}

.selected-price label{
  font-size: 14px;
  position: relative;
  bottom: 4px;
}

span {
  font-family: 'Quicksand', sans-serif;
}

.max, .min {
  font-size: 14px;
  float: right;
  color: #fff;
}

.min {
  float: left;
}
</style>