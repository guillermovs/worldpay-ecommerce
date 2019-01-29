import Vuex from 'vuex'
import Helpers from 'mwangaben-vthelpers'
import { shallow, createLocalVue } from '@vue/test-utils'
import createStore from '@/store/index.js'
import AppNavigation from '@/components/AppNavigation.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper, store, b

describe('AppNavigation', () => {
  beforeEach(() => {
    store = new Vuex.Store(createStore)
    wrapper = shallow(AppNavigation, { localVue, store })
    b = new Helpers(wrapper, expect)
  })
  
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  
  test('cart is empty by default', () => {
    expect(wrapper.contains('.cartcount')).toBeFalsy()
  })

  test('adding items to cart shows cart counter', () => {
    store.state.cartTotal = 2; // Add items to cart
    
    // Updated store object
    wrapper = shallow(AppNavigation, {localVue, store})

    expect(wrapper.contains('.cartcount')).toBeTruthy()
  })
})