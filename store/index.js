import Vue from 'vue';
import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      page: 'index',
      priceLimit: 500,
      totalOrders: 0,
      orders: {},
      cartTotal: 0,
      cart: {},
      sale: false,
      products: [
        {
          name: 'Marshall Stanmore',
          brand: 'Marshall',
          price: 299,
          category: 'portable-speakers',
          sale: false,
          text: "Iconic Marshall design that stands out with its a vintage-looking front fret, gold-coloured metal details, and classic logo.",
          img: 'products/marshall.jpg'
        },
        {
          name: 'Marshall Acton II',
          brand: 'Marshall',
          price: 269.95,
          category: 'smart-speakers',
          sale: true,
          text: "Control the Marshall Acton II with your voice. Just tell it what you want to listen to, and the room will fill with your favourite tune.",
          img: 'products/marshall2.jpg'
        },
        {
          name: 'Bose Home Speaker 500',
          brand: 'Bose',
          price: 399,
          category: 'smart-speakers',
          sale: true,
          text: "The Bose Home Speaker 500 has Amazon Alexa voice control built-in, so it's as simple as saying: Alexa, play Ed Sheeran",
          img: 'products/bose.jpg'
        },
        {
          name: 'B&O Beoplay A1',
          brand: 'Bang & Olufsen',
          price: 199,
          category: 'portable-speakers',
          sale: true,
          text: "Equipped with True360 Bang & Olufsen Signature Sound to give balanced and powerful audio, perfect for sharing new tracks with your mates.",
          img: 'products/bo.jpg'
        },
        {
          name: 'B&O BeoPlay A9',
          brand: 'Bang & Olufsen',
          price: 1999,
          category: 'smart-speakers',
          sale: false,
          text: "Never feel the need to hide your speaker with the B&O BeoPlay A9; a sleek and attractive speaker with white with walnut legs.",
          img: 'products/bo2.jpg'
        },
        {
          name: 'Apple Homepod',
          brand: 'Apple',
          price: 319,
          category: 'smart-speakers',
          sale: false,
          text: "The Apple HomePod brings together Apple Music and Siri in a compact, yet powerful speaker.",
          img: 'products/apple.jpg'
        },
        {
          name: 'Google Home Max',
          brand: 'Google',
          price: 399,
          category: 'smart-speakers',
          sale: false,
          text: "Stream your favourite sounds with Google Home Max. This wireless speaker can connect to YouTube Music, Spotify and Deezer with a simple voice command.",
          img: 'products/google.jpg'
        },
        {
          name: 'Google Home Mini',
          brand: 'Google',
          price: 29,
          category: 'smart-speakers',
          sale: true,
          text: "Google Home Mini, gives you dynamic sound that fills the room. Its speaker delivers 360° sound to bring your music to life.",
          img: 'products/googlemini.jpg'
        },
        {
          name: 'Google Home Hub',
          brand: 'Google',
          price: 139,
          category: 'smart-speakers',
          sale: false,
          text: "The Google Home Hub has a 7 inch touchscreen so you will be able to see everything, whether it is an upcoming appointment or your shopping list.",
          img: 'products/googlehub.jpg'
        },
        {
          name: 'Amazon Echo',
          brand: 'Amazon',
          price: 79.99,
          category: 'smart-speakers',
          sale: false,
          text: "Through the Alexa Voice Service, the Amazon Echo lets you find and play music, ask questions about anything, get the latest sports results and weather reports, and much more by simply asking.",
          img: 'products/amazonecho.jpg'
        },
        {
          name: 'Amazon Echo Spot',
          brand: 'Amazon',
          price: 119.99,
          category: 'smart-speakers',
          sale: false,
          text: "The Amazon Echo Spot makes it incredibly easy to get your day started the right way. Simply say whatever you want to hear, see or do.",
          img: 'products/amazonspot.jpg'
        },
        {
          name: 'JBL Charge 3',
          brand: 'JBL',
          price: 99.99,
          category: 'portable-speakers',
          sale: false,
          text: "Enjoy the added richness of the JBL Bass radiator. It delivers bass you can feel for sound powerful enough to keep any party entertained.",
          img: 'products/jbl.jpg'
        },
        {
          name: 'SP-AD60-M White & Gold',
          brand: 'JVC',
          price: 29.99,
          category: 'portable-speakers',
          sale: true,
          text: "Perfect for streaming your favourite music, podcast or playlist wirelessly, the JVC AD60 Speaker is compatible with all Bluetooth enabled devices.",
          img: 'products/jvc.jpg'
        },
        {
          name: 'Replay HX-P250BK',
          brand: 'JAM',
          price: 9.99,
          category: 'portable-speakers',
          sale: true,
          text: "Great for listening to music and chatting wherever you go with big sound, a built-in microphone and a five-hour battery life.",
          img: 'products/jam.jpg'
        },
        {
          name: 'Wonderboom',
          brand: 'Ultimate Ears',
          price: 59.99,
          category: 'portable-speakers',
          sale: false,
          text: "It's ultra-compact but packs a punch with two tweeters and two bass drivers for fat, crisp and satisfying sound whatever you're listening to.",
          img: 'products/ue.jpg'
        },
        {
          name: 'SoundLink Mini',
          brand: 'Bose',
          price: 149.99,
          category: 'portable-speakers',
          sale: false,
          text: "Small and light enough to pack into your bag - the SoundLink Mini delivers big sound and deep bass, wherever you choose to listen.",
          img: 'products/bose2.jpg'
        },




      ]
    },
    getters: {
      'portable-speakers': state => filter(state.products, 'category', 'portable-speakers'),
      'smart-speakers': state => filter(state.products, 'category', 'smart-speakers'),
      'speaker-sale': state => filter(state.products, 'sale', true),
      currentPage: state => state.page
    },
    mutations: {
      setPage: (state, page) => {
        state.page = page;
      },
      setPriceLimit: (state, limit) => {
        state.priceLimit = limit;
      },
      switchSale: state => {
        state.sale = !state.sale;
      },
      clearCartCount: state => {
        state.cartTotal = 0;
      },
      clearCartContents: state => {
        state.cart = {};
      },
      addItem: (state, item) => {
        state.cartTotal++;
        if (item.name in state.cart) {
          //state.cart[item.name].count++;
          Vue.set(state.cart[item.name], 'count', state.cart[item.name].count+1);
        } else {
          let stateItem = Object.assign({}, item);
          stateItem.count = 1;
          //state.cart[item.name] = stateItem;
          Vue.set(state.cart, item.name, stateItem);
        }
      },
      removeItem: (state, item) => {
        if (item.name in state.cart) {
          //state.cart[item.name].count++;
          Vue.set(state.cart[item.name], 'count', state.cart[item.name].count - 1);
          if (!state.cart[item.name].count){
            // Was only item
            Vue.delete(state.cart, item.name);
          }
          state.cartTotal--;
        }
      },
      refundItem: (state, item) => {
        if (item.name in state.orders) {
          Vue.set(state.orders[item.name], 'count', state.orders[item.name].count - 1);
          if (!state.orders[item.name].count) {
            // Was only item
            Vue.delete(state.orders, item.name);
          }
          state.totalOrders--;
        }
      },
      removeItems: (state, item) => {
        if (item.name in state.cart) {
          if (state.cart[item.name].count){
            // We have this item
            state.cartTotal -= state.cart[item.name].count;
            Vue.delete(state.cart, item.name);
          }
        }
        //return 0;
      },

      // Moves an order from cart to account (executed on successful payment)
      completeOrder: (state, order) => {
        
        if (state.totalOrders) {
          // We've got some orders, merge data
          Vue.set(state, 'totalOrders', state.cartTotal + state.totalOrders);
        }else{
          // No order yet, new obj
          Vue.set(state, 'totalOrders', state.cartTotal);
        }

        // Iterate over each entry in the cart and add it to the orders object
        Object.keys(state.cart).forEach(productKey => {
          if (!productKey in state.orders || typeof state.orders[productKey] === 'undefined') {
            // We haven't ordered this item yet
            state.orders[productKey] = Object.assign({}, state.cart[productKey]);// deep copy
            state.orders[productKey].ordered = order.date;
            state.orders[productKey].codes = [];
            state.orders[productKey].count = 0;
          }
          
          for (var i = 0; i < state.cart[productKey].count; i++) {
            // Add as many items and codes as ordered
            state.orders[productKey].codes.push(order.code);
            Vue.set(state.orders[productKey], 'count', state.orders[productKey].count+1);
          }
        })

        console.log("order completed")
      },
    }
  });
};

export default createStore;

//helper
const filter = (array, key, value) => array.filter(item => item[key] === value);
