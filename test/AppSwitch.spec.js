import Vuex from 'vuex'
import Helpers from 'mwangaben-vthelpers'
import { shallow, createLocalVue } from '@vue/test-utils'
import createStore from '@/store/index.js'
import AppSwitch from '@/components/AppSwitch.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper, store, b

const $canToggleInput = '.can-toggle input'

describe('Sales Switch', () => {
  beforeEach(() => {
    store = new Vuex.Store(createStore)
    wrapper = shallow(AppSwitch, { localVue, store })
    b = new Helpers(wrapper, expect)
  })

  
  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('do not show sale items by default', () => {
    const showSale = wrapper.vm.$store.state.sale;
    expect(showSale).toBeFalsy()
  })

    
  it('show a input with a class of .can-toggle', () => {
    b.domHas($canToggleInput)
  })

  it('sales are shown when we enable the store setting', () => {
    // Current sale status
    expect(wrapper.vm.$store.state.sale).toBeFalsy()
    
    store.state.sale = true; // Sales view is enabled
    
    // Updated store object
    wrapper = shallow(AppSwitch, {localVue, store})
    
    // New sale status
    expect(wrapper.vm.$store.state.sale).toBeTruthy()
  })
})
