<template>
  <div class="navarea" :style="{'background-image': 'url('+getBackgroundImage+')'}">
    <nav :class="{sticky: scrolled}">
      <div class="capsule">
        <nuxt-link exact to="/" :class="['logo', {selected: (currentPage == 'index')}]">
          <i class="fas fa-store"></i>
        </nuxt-link>
        <ul>
          <li v-for="section in this.sections" :key="section.key" :class="{selected: (currentPage == section.key)}">
            <nuxt-link :to="'/'+section.key">{{section.name}}</nuxt-link>
          </li>
        </ul>
        <div class="rhs-links">
          <nuxt-link to="/account" :class="['user-account', {selected: (currentPage == 'account')}]">
            <div class="my-account">
              <i class="fas fa-user-circle"></i>
            </div>
          </nuxt-link>
          <nuxt-link to="/cart" :class="['shopping-cart', {selected: (currentPage == 'cart')}]">
            <div class="cartitem">
              <div v-if="cartTotal > 0" class="cartcount">{{ cartTotal }}</div>
              <i class="fas fa-shopping-cart"></i>
            </div>
          </nuxt-link>
        </div>
      </div>
    </nav>
    <div class="section-info capsule">
      <div class="info-wrap">
        <div class="info-block">
          <template v-if="currentPage == 'index'">
            <!--
            <h1>Find the right speaker for you</h1>
            <p>Discover our range of portable and smart speakers and check out our sale</p>
            -->
            <h1>Discover our speakers</h1>
            <p>Browse our catalogue to find the speaker that fits your lifestyle and don't forget to check out our sales while they last!</p>
          </template>
          <template v-else-if="currentPage == 'portable-speakers'">
            <h1>Take your music everywhere</h1>
            <p>Discover our range of portable bluetooth speakers and find the one that is suitable for your lifestyle</p>
          </template>
          <template v-else-if="currentPage == 'smart-speakers'">
            <!--
            <h1>Always at your command</h1>
            <p>Choose the right smart speaker for your home and automate your life effortlessly</p>
            -->
            <h1>Command the future</h1>
            <p>Choose the right smart speaker for your home and you'll wonder how you ever lived without one.</p>
          </template>
          <template v-else-if="currentPage == 'speaker-sale'">
            <h1>Sales are like music to my ears</h1>
            <p>Explore all our speakers on sale right now and bag one for every corner of the house. Only while sales last!</p>
          </template>
          <template v-else-if="currentPage == 'cart'">
            <h1>Checkout</h1>
            <template v-if="cartTotal===0">
              <p>Add some items to your cart to qualify for free worldwide shipping!</p>
            </template>
            <template v-else>
              <p>You've got {{cartTotal}} <template v-if="cartTotal===1">item</template><template v-else>items</template> in your cart and qualify for free worldwide shipping, congrats!</p>
            </template>
          </template>
          <template v-else-if="currentPage == 'account'">
            <h1>Your Account</h1>
            <p>Keep track of your purchases and cancel any product or order that hasn't shipped yet.</p>
          </template>
        </div>

        <div class="filters" v-if="currentPage != 'cart' && currentPage != 'account'">
          <app-sidebar :pricerange.sync="highprice" :currpage="currentPage" :sale="currentPage == 'speaker-sale'"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import AppSidebar from './../components/AppSidebar.vue';

export default {
  components: {
    AppSidebar
  },
  data() {
    return{
      scrolled: false,
      sections: [
        {key: "portable-speakers", name: "Portable Speakers"},
        {key: "smart-speakers", name: "Smart Speakers"},
        {key: "speaker-sale", name: "Sale"},
      ],
      highprice : 300
    }
  },
  computed: {
    totalOrders() {
      return this.$store.state.totalOrders;
    },
    cartTotal() {
      return this.$store.state.cartTotal;
    },
    currentPage(){
      return this.$store.state.page;
    },
    getBackgroundImage(){

      return '/header/'+this.currentPage+'.jpeg';
      /*
      switch(this.currentPage){
        default:
          return 'https://images.unsplash.com/photo-1430922080198-aa15f3a718b9';
        break;
        case 'portable-speakers':
          return 'https://images.unsplash.com/photo-1502556112530-246c3be76309';
        break;
        case 'smart-speakers':
          return 'https://images.unsplash.com/photo-1546800409-51b20e2a4433';
          return 'https://images.unsplash.com/photo-1546800197-408e420929fe';
        break;
        case 'speaker-sale':
          return 'https://images.unsplash.com/photo-1488610675821-b5776c22e019';
        break;
      }
      */
    }
  },

  methods: {
    handleScroll () {
      this.scrolled = window.scrollY > 0;
    }
  },

  beforeMount () {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
.navarea {
  overflow: hidden;
  box-shadow: 0px 2px 10px -4px #999;
  background-color: #666;
  height: 500px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.capsule {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo{
  font-size: 30px;
  padding: 0 20px;
  color: #333 !important;
  height: 50px;
  line-height: 50px;
  //background:rgba(255, 255, 255, 0.75);
  background:rgba(230, 230, 230, 1);
}

.logo:hover{
  background:rgba(255, 255, 255, 1);
  //background-color: rgba(51, 51, 51, 0.35);
}

.shopping-cart, .user-account {
  font-size: 30px;
  color: #fff;
  padding: 0 20px;
  height: 50px;
  line-height: 50px;
  transition: background-color 1000ms;
  display: inline-block;
  width: 50%;
  text-align: center;
}

.shopping-cart.selected, .shopping-cart:hover,
.user-account.selected, .user-account:hover{
  background-color: rgba(255, 255, 255, 0.25)
}

nav {
  width: 100vw;
  height: 50px;
  background: rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  z-index: 10;
  box-shadow: 0px 2px 4px -3px #333;
  transition: background 1000ms;
}

nav.sticky{
  background: rgba(0, 0, 0, 0.75);
}

ul {
  padding-left: 0;
  display: flex;
  list-style: none outside none;
  justify-content: center;
  align-items: center;
}

li {
  padding: 0;
  font-family: 'Josefin Sans', Arial, Helvetica, sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 13px;
  line-height: 50px;
  position: relative;
  transition: background-color 1000ms;
  z-index: 2;
}

li.selected, li:hover{
  //background-color: rgba(100, 100, 100, 0.5);
  background-color: rgba(255, 255, 255, 0.25)
}

li:after, .shopping-cart:after, .user-account:after, .logo:after{
  position:absolute;
  left: 0;
  bottom: -5px;
  z-index: 0;
  content:'';
  width:100%;
  height:100%;
  opacity:0;
  border-bottom: 0px solid transparent;
  transition: border-bottom 1500ms, opacity 500ms, bottom 500ms; 
}

li.selected:after, logo.selected:after, .shopping-cart.selected:after, .user-account.selected:after{
  opacity:1;
  bottom:0;
  border-bottom: 2px solid hsla(0, 0%, 100%, 0.5);
}

li a{
  padding: 0 50px;
}

a,
a:visited,
a:active {
  text-decoration: none;
  color: #fff;
  z-index: 2;
  position:relative;
  display: block;
}

.rhs-links {
  position: relative;
  float: right;
  display: flex;
}

.cartcount {
  font-family: 'Quicksand', sans-serif;
  position: absolute;
  background: #ff2211;
  color: #fff;
  text-align: center;
  padding-top: 4px;
  width: 20px;
  height: 20px;
  font-size: 12px;
  margin: -5px 0 0 20px;
  border-radius: 1000px;
  font-weight: 700;
  line-height: 12px;
  right: -10px;
  top: 5px;
}

.section-info{
  display: block;
  max-width: 100%;
  background: rgba(70, 70, 70, 0.4);
  margin-top: -50px;
  padding-top: 50px;
}

.info-wrap{
  position: relative;
  max-width: 1100px;
  height: 500px;
  padding: 0;
  margin: 0 auto;
}

.info-block{
  max-width: 430px;
  /* background-color: #4646465e; */
  height: 500px;
  padding: 20px 0px;
  margin-top: 50px;
}

h1{
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 200;
  letter-spacing: 4px;
  font-size: 40px;
  color: #fff;
  text-shadow: 1px 1px 5px #999;
  text-transform: uppercase;
  margin-top: 20px;
  margin-bottom: 10px;
}

p{
  line-height: 35px;
  color: #fff;
  font-size: 20px;
}

.filters{
  position: absolute;
  right: 0;
  top: 40px;
  width: 200px;
  text-align: right;
}


</style>
