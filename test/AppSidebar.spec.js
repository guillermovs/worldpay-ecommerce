import Vuex from 'vuex'
import Helpers from 'mwangaben-vthelpers'
import { shallow, mount, createLocalVue } from '@vue/test-utils'
import createStore from '@/store/index.js'
import AppSidebar from '@/components/AppSidebar.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper, store, b

describe('AppSidebar', () => {

  beforeEach(() => {
    store = new Vuex.Store(createStore)
    wrapper = mount(AppSidebar, { localVue, store })
    b = new Helpers(wrapper, expect)
  })
  
  test('is a Vue instance', () => {
    // Updated store object
    store = new Vuex.Store(createStore)
    wrapper = mount(AppSidebar, {localVue, store})
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  
  /*
  test('Item show sale badge by default', () => {
    expect(wrapper.contains('.sale-badge')).toBeFalsy()
  })
  
  
  test('adding items to cart shows cart counter', () => {
    store.state.cartTotal = 2; // Add items to cart
    
    // Updated store object
    wrapper = shallow(AppItem, {localVue, store})

    expect(wrapper.contains('.cartcount')).toBeTruthy()
  })
  */
})