import Vuex from 'vuex'
import Helpers from 'mwangaben-vthelpers'
import { mount, createLocalVue } from '@vue/test-utils'
import createStore from '@/store/index.js'

import Index from '@/pages/index.vue'
import Item from '@/components/AppItem.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper, store, b

describe('Index', () => {

  beforeEach(() => {
    store = new Vuex.Store(createStore)
    store.state.products = [{
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
    }];
    wrapper = mount(Index, { localVue, store })
    b = new Helpers(wrapper, expect)
  })

  it('run test on test env', () => {
    expect(process.env.NODE_ENV).toBe('test')
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

})
