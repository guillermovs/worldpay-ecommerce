import createPersistedState from 'vuex-persistedstate'
 
export default ({store}) => {
  createPersistedState({
      key: 'wp-ecomm',
      paths: ['page', 'priceLimit','totalOrders','orders','cartTotal','cart']
  })(store)
}