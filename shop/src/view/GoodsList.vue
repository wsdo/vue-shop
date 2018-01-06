<template>
  <div>
  <nav-header></nav-header>
  <nav-bread>商品</nav-bread>
<div class="accessory-result-page accessory-page">
  <div class="container">
    <div class="accessory-result">
      <div class="accessory-list-wrap">
        <div class="accessory-list col-4">
          <ul>
            <li v-for="item in goodsList">
              <div class="pic">
                <a href="#"><img :src="item.productImage" alt=""></a>
              </div>
              <div class="main">
                <div class="name">{{item.productName}}</div>
                <div class="price">{{item.salePrice}}</div>
                <div class="btn-area">
                  <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
<nav-footer></nav-footer>
<modal :mdShow="mdShowCart">
  <p slot="message">加入购物车成功</p>
  <div slot="btnGroup">
      <a href="javascript:;" class="btn btn--m" @click="mdShowCart = false">继续购物</a>
      <router-link class="btn btn-m"  to="/cart"> 查看购物车</router-link>
  </div>
</modal>
</div>
</template>
<script>
import NavHeader from '@/components/Header'
import NavBread from '@/components/NavBread'
import NavFooter from '@/components/Footer'
import Modal from '@/components/Modal'

export default {
  name: 'GoodsList',
  data () {
    return {
      goodsList: Array,
      mdShow: false,
      mdShowCart: false
    }
  },
  components: {
    NavHeader,
    NavBread,
    NavFooter,
    Modal
  },
  mounted: function () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      this.$http.get('/goods/list').then(res => {
        this.goodsList = res.data.result
      })
    },
    addCart (productId) {
      // 调用添加购物车的接口
      this.$http.post('/users/addCart', {
        productId: productId
      }).then((respond) => {
        var res = respond.data
        if (res.status === 1) {
          this.mdShow = true
        } else {
          this.mdShowCart = true
        }
      })
    }
  }
}
</script>
