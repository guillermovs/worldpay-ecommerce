<template>
  <div class="item" @mousemove="setPositioning" @mouseleave="resetPositioning">
    <div :class="['product-image', {'hovering': hovering}]" :style="{'background-image': 'url(/'+item.img+')', 'background-position': getPositioning}"></div>
    <div class="product-data">
      <h4>{{item.brand}}</h4>
      <h3>{{item.name}}</h3>
      <p>{{item.text}}</p>
    </div>
    <span class="sale-badge" v-if="item.sale">Sale</span>
    <span :class="['bagged-badge', {animate: baggedAnimation}]" v-if="inCart">{{inCart}}</span>
    <button class="add" @click="addItem">Add to cart<label>{{ item.price | gbp }}</label></button>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data(){
    return {
      baggedAnimation:false,
      hovering:false,
      posX:0,
      posY:0,
    }
  },
  computed:{
    getPositioning(){
      if(this.posX && this.posY){
        return this.posX+'px '+this.posY+'px';
      }else{
        return 'center center';
      }
    },

    inCart: function(){
      if(this.item.name in this.$store.state.cart){
        return this.$store.state.cart[this.item.name].count;
      }
      return 0;
    },
  },
  filters: {
    gbp: function(value) {
      return `£${value}`;
    }
  },
  methods: {
    addItem() {
      this.$store.commit('addItem', this.item);
      this.baggedAnimation = true;
      var that = this;
      setTimeout(() => {
        that.baggedAnimation = false;
      }, 1000);
    },

    setPositioning(evt){
      //console.log(evt.layerX, evt.layerY)
      //console.log(evt)

      //var elWidth = evt.target.offsetWidth;
      //var elHeight = evt.target.offsetHeight;
      this.hovering = true;

      var halfWidth = evt.target.offsetWidth/2;
      var halfHeight = evt.target.offsetHeight/2;

      var MAXCHANGE = 20;// in px

      var mouseX = evt.layerX < halfWidth

      if(evt.layerX < halfWidth){
        // We're left of centre
        mouseX = evt.layerX*MAXCHANGE/halfWidth;
        this.posX = mouseX-MAXCHANGE;
      }else{
        // We're right of centre
        mouseX = (evt.layerX-halfWidth)*MAXCHANGE/halfWidth;
        this.posX = mouseX;
      }
      
      if(evt.layerY < halfHeight){
        // We're top of centre
        mouseY = evt.layerY*MAXCHANGE/halfHeight;
        this.posY = mouseY-MAXCHANGE;
      }else{
        // We're bottom of centre
        mouseY = (evt.layerY-halfHeight)*MAXCHANGE/halfHeight;
        this.posY = mouseY;
      }

      //this.posX = mouseX;
      //this.posY = mouseY;

      //console.log(this.posX, this.posY)

      return;

      var halfWidth = evt.target.offsetWidth/2;
      var halfHeight = evt.target.offsetHeight/2;

      var mouseX = (evt.layerX < halfWidth/2) ? halfWidth/2 : (evt.layerX > halfWidth+(halfWidth/2) ? halfWidth+(halfWidth/2) : evt.layerX)
      var mouseY = (evt.layerY < halfHeight/2) ? halfHeight/2 : (evt.layerY > halfHeight+(halfHeight/2) ? halfHeight+(halfHeight/2) : evt.layerY)

      this.posX = halfWidth-mouseX;
      this.posY = halfHeight-mouseY;
    },

    resetPositioning(evt){
      //console.log(evt.target.className)
      this.posX = null;
      this.posY = null;
      this.hovering = false;
    }
  }
};
</script>

<style scoped>

.product-image{
  width:100%;
  height:100%;
  position:absolute;
  top:0;
  left:0;
  z-index: 0;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  transition: background-position 200ms ease-out;
}

.product-image.hovering{
  transition: background-position 1000ms linear;
}

.product-image:after{
  position: absolute;
  content: '';
  width:100%;
  height:100%;
  background-color: #000;
  opacity: .5;
}

.item:hover .product-data{
  bottom: -50px;
}

.item:hover .product-data p{
  opacity: 1;
}

.product-data{
  position:absolute;
  padding:20px;
  width:100%;
  height:100%;
  bottom: -120px;
  transition: bottom 750ms;
}

.item {
  //padding: 20px;
  background: #e7e7e7;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 360px;
  z-index: 2;
  margin-bottom: 40px;
  box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.item:before{
  content: '';
  opacity: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  -webkit-box-shadow: 0 0.25rem 0.125rem 0 rgba(0,0,0,0.05);
  box-shadow: 0 0.25rem 0.125rem 0 rgba(0,0,0,0.05);
  opacity:0;
  -webkit-transition: box-shadow 500ms, opacity 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: box-shadow 500ms, opacity 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.item:hover:before{
  opacity: 1;
}

.sale-badge {
  background: rgba(232, 35, 25, 0.4);
  color: white;
  font-family: 'Quicksand', sans-serif;
  position: absolute;
  z-index: 2;
  right: 0px;
  top: 0px;
  padding: 2px 10px 4px;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 700;
  border-radius: 4px;
  border-top-right-radius: 0;
}

.bagged-badge{
  background-color: rgba(255, 255, 255, 0.50);
  position: absolute;
  padding: 4px;
  border-radius: 20px;
  display: block;
  width: 30px;
  height: 30px;
  text-align: center;
  top: -2px;
  z-index: 5;
  border-top-left-radius: 0;
  left: -2px;
  transition: background-color 500ms, width 500ms, height 500ms;
}

.bagged-badge.animate{
  background-color: #fff;
  width: 32px;
  height: 32px;
}

p {
  font-size: 14px;
  line-height: 22px;
  color: #fff;
  font-weight: 400;
  text-align: left;
  opacity: 0;
  transition: opacity 1000ms;
}

h4{
  text-transform: uppercase;
  font-size: 14px;
  font-family: 'Quicksand', sans-serif;
  line-height: 25px;
  font-weight: 500;
  color: #ccc;
}

h3{
  margin-top:5px;
  font-size: 35px;
  font-weight: bold;
  color: #fff;
  font-family: 'Josefin sans', sans-serif;
  line-height: 45px;
}

.add{
  text-align: left;
}

.add label{
  float:right;
}

</style>