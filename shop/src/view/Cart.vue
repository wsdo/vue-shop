<template>
<div>

  <nav-header></nav-header>
  <nav-bread>购物车</nav-bread>
  <div class="container">
    <div class="cart">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>我的购物车</span></h2>
      </div>
      <div class="item-list-wrap">
        <div class="cart-item">
          <div class="cart-item-head">
            <ul>
              <li>商品</li>
              <li>价格</li>
              <li>数量</li>
              <li>总价格</li>
              <li>删除</li>
            </ul>
          </div>
          <ul class="cart-item-list">
            <li v-for="item in cartList">
              <div class="cart-tab-1">
                <div class="cart-item-pic">
                  <img :src="item.productImage">
                </div>
                <div class="cart-item-title">
                  <div class="item-name">{{item.productName}}</div>
                </div>
              </div>
              <div class="cart-tab-2">
                <div class="item-price">{{item.salePrice}}</div>
              </div>
              <div class="cart-tab-3">
                <div class="item-quantity">
                  <div class="select-self select-self-open">
                    <div class="select-self-area">
                      <a class="input-sub" @click="editCart('minu',item)">-</a>
                      <span class="select-ipt">{{item.productNum}}</span>
                      <a class="input-add" @click="editCart('add',item)">+</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cart-tab-4">
                <div class="item-price-total">{{item.salePrice * item.productNum}}</div>
              </div>
              <div class="cart-tab-5">
                <div class="cart-item-opration">
                  <a href="javascript:;" class="item-edit-btn" @click="delCartConfirm(item.productId)">
                    <i class="fa fa-trash-o fa-2x" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
  <nav-footer></nav-footer>

    <modal :mdShow="modalConfirm">
      <a href="" slot="message">
        你确定要删除此条数据吗？
      </a>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn--m" @click="delCart">确定</a>
        <a href="javascript:;" class="btn btn--m" @click="modalConfirm = false">关闭</a>
      </div>
    </modal>
  </div>
</template>
<script>
  import NavHeader from '@/components/Header'
  import NavFooter from '@/components/Footer'
  import NavBread from '@/components/NavBread'
  import Modal from '@/components/Modal'
  import { mapState, mapActions } from 'vuex'

  export default {
    data () {
      return {
        cartList: Object,
        modalConfirm: false,
        productId: '',
        checked: ''
      }
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread,
      Modal
    },
    computed: {
      ...mapState({
        cartCount: ({cartCount}) => cartCount
      })
    },
    mounted () {
      this.init()
    },
    methods: {
      ...mapActions([
        'updateCartCount'
      ]),
      init () {
        this.$http.post('/users/cartList').then((response) => {
          let res = response.data
          this.cartList = res.result
        })
      },
      delCartConfirm (productId) {
        this.modalConfirm = true
        this.productId = productId
      },
      delCart () {
        this.$http.post('/users/cartDel', {
          productId: this.productId
        }).then((response) => {
          this.modalConfirm = false
          this.init()
        })
      },
      editCart (flag, item) {
        if (flag === 'add') {
          item.productNum++
        } else if (flag === 'minu') {
          if (item.productNum <= 1) {
            return
          }
          item.productNum--
        } else {
          // 当前取反，当为未选中的时候是0，点击后变为1
          item.checked = item.checked === '1' ? '0' : '1'
        }
        this.updateCartCount({
          productId: item.productId,
          productNum: item.productNum,
          checked: item.checked
        })
        // this.$store.dispatch("updateCartCount");

        // console.log(this.updateCartCount());
        // this.updateCartCount(11)
        // axios.post('/users/cartEdit', {
        //   productId: item.productId,
        //   productNum: item.productNum,
        //   checked: item.checked
        // }).then((response) => {
        //   let res = response.data
        //   console.log(res)
        // })
      }
    }
  }
</script>
<style>

</style>
