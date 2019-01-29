<template>
  <div class="capsule cart">

    <div class="cart-header">
      <div class="product field">Product</div>
      <div class="status field">Status</div>
      <div class="units field">Units</div>
      <div class="total field">Total</div>
    </div>

    <div v-if="totalOrders > 0">
      <div class="cartitems" v-for="(item, key) in orders" :key="'item'+key">

        <div class="product field">
          <div class="product-text cleared">
            <h4>{{ item.name }}</h4>
            <p>Unit price {{ item.price | gbp }}</p>
          </div>
          <img class="cartimg" :src="`/${item.img}`" :alt="`Image of ${item.name}`">
        </div>
        <div class="status field">
          <div class="product-text">
            <h4>Pending shipment</h4>
            <p title="Date of first order">{{item.ordered}}</p>
          </div>
        </div>
        <div class="units field">
          {{item.count}} <div class="controls"><label class="fas fa-backspace" title="Refund one unit" @click="refundItem(item)"></label></div>
        </div>
        <div class="total field">
          {{ item.price * item.count | gbp }}
        </div>

      </div>
      
      <!--
      <div class="total">
        <h3>Total: {{ total | gbp }}</h3>
      </div>
      -->

    </div>

    <div v-else-if="totalOrders === 0" class="empty">
      <div class="cartitems">
        <div class="notice">
          <strong>You haven't ordered any items!</strong>
          <p><nuxt-link to="/">Home</nuxt-link> | <nuxt-link to="/portable-speakers">Portable Speakers</nuxt-link> | <nuxt-link to="/smart-speakers">Smart Speakers</nuxt-link> | <nuxt-link to="/speaker-sale">Sales</nuxt-link></p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      
    };
  },
  components: {
    
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    },
    totalOrders() {
      return this.$store.state.totalOrders;
    },
    total() {
      return Object.values(this.orders)
        .reduce((acc, el) => acc + (el.count * el.price), 0)
        .toFixed(2);
    }
  },
  mounted(){
    this.$store.commit('setPage', 'account');    
  },
  methods: {
    addItem(item) {
      this.$store.commit('addItem', item);
    },
    removeItems(item) {
      return this.$store.commit('removeItems', item);
      for(let i=0; i<=item.count; i++){
        this.removeItem(item)
      }
    },

    refundItem(item) {
      if(confirm("Are you sure you wish to cancel and refund one item?")){
        this.issueRefund(item);
      }
    },
    issueRefund: function(item){

      var that = this;
      var lastCode = item.codes.pop();
      axios.get('http://209.97.141.255/wp-proxy.php',{
          params: {
            refund: lastCode, 
            amount: item.price
          }
        }).then(response => {
          console.log("response from Worldpay", response)

          if('status' in response && response.status == '200'){
            that.$store.commit('refundItem', item);
          }else{
            // Error communicating with server
            alert("Error communicating with server. Please try again shortly.")
            item.codes.push(lastCode);
          }

        }).catch(err => {
          console.log("Error occurred:", err)
        })

      // end of issueRefund
    }
  },
  filters: {
    gbp: function(value) {
      return `£${value.toFixed(2)}`;
    }
  }
};
</script>

<style scoped>

.cart-header{
  //height:50px;
  display: flex;
}

.cart-header .field{
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

.cartitems .field{
  font-weight: normal;
  font-family: 'Quicksand', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
  padding: 20px 15px;
}

.product{
  width: 42%;
}

.status{
  width: 23%;
}

.units{
  width: 17%;
}

.total{
  width: 18%;
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

.product-text.cleared {
  padding-left:90px;
}

.product-text p,
.product-text h4 {
  padding: 5px;
}

.product-text h4 {
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
