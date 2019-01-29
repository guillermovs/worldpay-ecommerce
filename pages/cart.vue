<template>
  <div class="capsule cart">

    <div class="cart-header">
      <div class="product field">Product</div>
      <div class="units field">Units</div>
      <div class="total field">Total</div>
    </div>

    <div v-if="cartTotal > 0">
      <div class="cartitems" v-for="(item, key) in cart" :key="'item'+key">

        <div class="product field">
          <div class="carttext">
            <h4>{{ item.name }}</h4>
            <p>Unit price {{ item.price | gbp }}</p>
          </div>
          <img class="cartimg" :src="`/${item.img}`" :alt="`Image of ${item.name}`">
        </div>
        <div class="units field">
          {{item.count}} <div class="controls"><label class="fas fa-plus" title="Add another item" @click="addItem(item)"></label><label class="fas fa-minus" title="Remove one item" @click="removeItem(item)"></label></div>
        </div>
        <div class="total field">
          {{ item.price * item.count | gbp }} <div class="controls"><label class="fas fa-times" title="Remove all items" @click="removeItems(item)"></label></div>
        </div>

      </div>
      
      <div class="cart-footer">
        <div class="product field">Subtotal</div>
        <div class="units field">{{cartTotal}} <template v-if="cartTotal==1">item</template><template v-else>items</template></div>
        <div class="total field">£{{total}}</div>
      </div>

      <app-checkout :total="total"></app-checkout>
    </div>

    <div v-else-if="cartTotal === 0" class="empty">
      <div class="cartitems">
        <div class="notice">
          <strong>You've got no items in your cart!</strong>
          <p><nuxt-link to="/">Home</nuxt-link> | <nuxt-link to="/portable-speakers">Portable Speakers</nuxt-link> | <nuxt-link to="/smart-speakers">Smart Speakers</nuxt-link> | <nuxt-link to="/speaker-sale">Sales</nuxt-link></p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import AppCheckout from './../components/AppCheckout.vue';

export default {
  data() {
    return {
      
    };
  },
  components: {
    AppCheckout
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    cartTotal() {
      return this.$store.state.cartTotal;
    },
    total() {
      return Object.values(this.cart)
        .reduce((acc, el) => acc + (el.count * el.price), 0)
        .toFixed(2);
    }
  },
  mounted(){
    this.$store.commit('setPage', 'cart');    
  },
  methods: {
    addItem(item) {
      this.$store.commit('addItem', item);
    },
    removeItem(item) {
      this.$store.commit('removeItem', item);
    },
    removeItems(item) {
      return this.$store.commit('removeItems', item);
      for(let i=0; i<=item.count; i++){
        this.removeItem(item)
      }
    },
  },
  filters: {
    gbp: function(value) {
      return `£${value.toFixed(2)}`;
    }
  }
};
</script>

<style scoped>

.cart-header, .cart-footer{
  display: flex;
}

.cart-header .field, .cart-footer .field{
  white-space: nowrap;
  text-transform: uppercase;
  background: rgba(0,0,0,0.5);
  color: #fff;
  padding: 10px 15px;
  font-weight: normal;
  font-family: 'Quicksand', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
}

.cart-footer .field{
  background: #fff;
  padding-bottom: 15px;
  color:#333;
}

.cartitems .field{
  font-weight: normal;
  font-family: 'Quicksand', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
  padding: 20px 15px;
}

.product{
  width: 50%;
}

.units{
  width: 25%;
}

.total{
  width: 25%;
}

.cart{
  position: relative;
  margin-top: -250px;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

/*
.cart > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  border-radius: 3px;
  margin-top: 10px;
  padding-bottom: 80px;
}
*/

.cart.empty h1,
.cart.empty h3 {
  margin-bottom: 15px;
}

.cartitems {
  display: flex;
  flex-direction: row;
  position: relative;
  border-bottom: 5px solid #fff;
  width: 100%;
  background: #f5f5f5; 
}

.cartitems .units, .cartitems .total{
  font-size: 20px;
  line-height: 50px;
}

.cartitems .controls{
  display: inline-block;
  background: rgba(0, 0, 0, 0.1);
  color: #fff;
  line-height: 20px;
  height: 30px;
  padding: 5px 10px;
  border-radius: 20px;
  opacity: 0;
  transition: opacity 500ms;
}

.cartitems:hover .controls{
  opacity: 0.5;
}

.cartitems .controls:hover{
  opacity: 1;
}

.cartitems label:hover{
  color: #666;
}

.cartitems label:focus, .cartitems label:active{
  transition: color 0ms;
  color: #333;
}

.cartitems .controls label{
  padding:0 5px;
  cursor: pointer;
  transition: color 500ms;
}

.notice{
  margin: 0 auto;
  padding: 25px;
  text-align:center;
  font-family: "Quicksand", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.notice strong{
  display: inline-block;
  margin-bottom: 10px;
}

.notice a{
  text-decoration: none;
  text-transform: uppercase;
  font-weight: normal;
  font-family: 'Quicksand', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
  color: #333;
}

.carttext {
  padding-left:90px;
}

.carttext p,
.carttext h4 {
  padding: 5px;
}

.carttext h4 {
  font-size: 16px;
  font-weight: 500;
}

.cartimg {
  width: 80px;
  border: 2px solid #ccc;
  border-radius: 50px;
  position: absolute;
  left: 10px;
  background: #fff;
  padding: 3px;
  top: 10px;
}

.total {
  //margin: 20px 0;
}
</style>
