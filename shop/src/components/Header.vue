<template>
  <header class="header">
    <div class="navbar">
      <div class="navbar-left-container">
        <router-link to="/">
          <img class="navbar-brand-logo" src="http://img.shudong.wang/logo.png">
        </router-link>

      </div>
      <div class="navbar-left-container">
            <router-link to="/">
              <span class="navbar-link">首页</span>
            </router-link>
      </div>
      <div class="navbar-right-container" style="display: flex;">
        <div class="navbar-menu-container">
          <span class="navbar-link">购物车</span>
          <div class="navbar-cart-container">
            <span class="navbar-cart-count">{{Cart.cartCount}}</span>
            <router-link class="navbar-link navbar-cart-link" to="/cart">
                <i class="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'Header',
    mounted: function () {
      this.getCartCount()
    },
    computed: {
      ...mapState(['Cart'])
    },
    methods: {
      ...mapActions(['getCartCount']),
      getGoodsList () {
        this.$http.get('/goods/list').then(res => {
          this.goodsList = res.data.result
        })
      },
      updateGoods () {
        this.getGoodsList()
      }
    }
  }
</script>
