<template>
  <div>
    <transition name="fade">
      
      <template v-if="complete">
        <div class="success">
          Congratulations on your purchase!
        </div>
      </template>
      <template v-else>
      <form action="/account" id="paymentForm" method="post">
        <div id='paymentSection'></div>
      </form>
      </template>

    </transition>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    total: {
      type: [Number, String],
      default: '50.00'
    }
  },
  data() {
    return {
      clientKey: 'T_C_a8ce8dd9-f80d-4ee4-93c3-ecb2055349a1',
      //serviceKey: 'T_S_41af157c-5025-4a9b-87e4-27f5dc456122',
      token: null,
      complete: false,
    };
  },
  mounted() {
    var that = this;
    
    Worldpay.useTemplateForm({
      'clientKey': that.clientKey,
      'form': 'paymentForm',
      'paymentSection': 'paymentSection',
      'display': 'modal',
      'reusable': false,
      'templateOptions': {
        enterCardDetailsButton: 'Proceed to payment'
      },
      'callback': function(obj) {
        if (obj && obj.token) {
          that.token = obj.token;
          that.pay();
        }
      }
    });

  },
  methods: {

    pay(){
      if(this.token){
        // We have the tokenised credit card details
        var that = this;
        // 4242 4242 4242 4242

        /* Access to XMLHttpRequest at 'https://api.worldpay.com/v1/orders' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. */

        axios.get('http://209.97.141.255/wp-proxy.php',{
          params: {
            token: that.token, 
            amount: that.total
          }
        }).then(response => {
          console.log("response from Worldpay", response)

          if('status' in response && response.status == '200'){
            let data = 'data' in response ? response.data : null;
            if('httpStatusCode' in data && data.httpStatusCode != '200'){
              // Typically included only on error
              if('message' in data && data.message){
                alert(data.message);
              }
            }else if('orderCode' in data && data.orderCode){
              // Status 200 & we have an orderCode, successful transaction
              that.complete = true;
              that.$store.commit('completeOrder', {date: that.orderDate(), code: data.orderCode});
              that.$store.commit('clearCartCount');
              that.$store.commit('clearCartContents');
              that.$router.push('account');// Goes to account
            }
          }else{
            // Error communicating with server
            alert("Error communicating with server. Please try again shortly.")
          }

        }).catch(err => {
          console.log("Error occurred:", err)
        })

      }else{
        // No tokenised CC details

      }
    },

    orderDate(){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) {
          dd = '0'+dd
      } 

      if(mm<10) {
          mm = '0'+mm
      } 

      return dd + '/' + mm + '/' + yyyy;
    },

  }
};
</script>

<style>

#token_container-button{
  background: #ffad00;
  text-align: center;
  padding: 12px 10px;
  font-size: 18px;
  font-weight: 500;
  box-shadow: inset 0px -10px 30px -10px hsl(41, 80%, 50%);
  width: 100%;
  cursor: pointer;
}

#token_container-button:hover{
  box-shadow: inset 0px -10px 30px -10px hsl(41, 40%, 50%);
}

#token_container-button:active{
  background: hsla(41, 90%, 50%, 1);
  box-shadow: inset 0px -10px 30px -10px hsl(41, 40%, 50%);
}

#token_container-button:focus{
  outline: none;
}


</style>