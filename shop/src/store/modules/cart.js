import Service from '../../api'
const UPDATE_CART_COUNT = 'UPDATE_CART_COUNT'

const state = {
  cartCount: 0
}

const actions = {
  getCartCount (store, param) {
    Service.post('/users/getCartCount').then((response) => {
      if (response.data.status === 0) {
        store.commit(UPDATE_CART_COUNT, {cartCount: response.data.result})
      }
    })
  },
  updateCartCount (store, param) {
    Service.post('/users/cartEdit', param).then((response) => {
      if (response.data.status === 0) {
        store.dispatch('getCartCount')
      }
    })
  }
}

const mutations = {
  [UPDATE_CART_COUNT] (state, action) {
    state.cartCount = action.cartCount
  }
}

export default {
  state,
  actions,
  mutations
}
