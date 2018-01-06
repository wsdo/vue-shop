var express = require('express')
var router = express.Router()
var User = require('../models/user')
var Goods = require('../models/goods')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

// 加入购物车

router.post('/addCart', function (req, res, next) {
  let userId = '100000077'
  var productId = req.body.productId
  var User = require('../models/user')

  User.findOne({userId: userId}, function (err, userDoc) {
    // console.log(userDoc);
    // 当添加商品的时候，先去数据库里面查询一下，这个商品是否存在，
    // 如果存在，就让它的productNum 加1，如果不存在，就添加这个商品。

    let goodItem = ''
    // 先去数据库里面查询一下
    userDoc.cartList.forEach(function (item) {
      // 如果购物车里面的id 和现在要添加的商品id一样就让它productNum 加1
      if (item.productId === productId) {
        // 此时把相同的产品赋值一个变量
        goodItem = item
        item.productNum ++
      }
    })

    if (goodItem) {
      // 说明你购物车里面存在这个商品
      userDoc.save(function (err3, doc3) {
        if (err3) {
          res.json({
            status: '1',
            msg: err.message
          })
        } else {
          res.json({
            status: '0',
            result: '商品数量添加成功！'
          })
        }
      })
    } else {
      // 此时的逻辑是当商品第一次添加到购物车里面

      // 通过productId查询出一条商品，然后把这一条商品，存入到user的cartList里面。
      Goods.findOne({productId: productId}, function (err1, goodsDoc) {
          // 添加相同的商品，商品只添加一次，数量加1
        goodsDoc.productNum = 1
        goodsDoc.checked = 1

        userDoc.cartList.push(goodsDoc)
        userDoc.save(function (err2, doc2) {
          if (err2) {
            res.json({
              status: '1',
              msg: err.message
            })
          } else {
            res.json({
              status: 0,
              msg: '',
              result: '此商品第一次加入购物车！'
            })
          }
        })
      })
    }
  })
})

// 查询购物车列表
router.post('/cartList', function (req, res, next) {
  let userId = '100000077'
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: 0,
          msg: '',
          result: doc.cartList
        })
      }
    }
  })
})
router.post('/getCartCount', function (req, res, next) {
  let userId = '100000077'
  User.findOne({'userId': userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '0',
        msg: err.message
      })
    } else {
      let cartList = doc.cartList
      let cartCount = 0
      cartList.map(function (item) {
        cartCount += parseFloat(item.productNum)
      })
      res.json({
        status: 0,
        msg: '',
        result: cartCount
      })
    }
  })
})

// 购物车数量操作
router.post('/cartEdit', function (req, res, next) {
  let userId = '100000077'
  let productId = req.body.productId
  let productNum = req.body.productNum
  let checked = req.body.checked
  User.update({'userId': userId, 'cartList.productId': productId}, {
    'cartList.$.productNum': productNum,
    'cartList.$.checked': checked
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      console.log(cartCount())
      res.json({
        status: 0,
        msg: '',
        result: 11111
      })
    }
  })
})

router.post('/cartDel', function (req, res, next) {
  let userId = '100000077'
  let productId = req.body.productId
  User.update({
    userId: userId
  }, {
    $pull: {
      'cartList': {
        'productId': productId
      }
    }
  }, function (err, doc) {
    if (err) {
      res.json({status: '1', msg: err.message, result: ''})
    } else {
      res.json({status: '0', msg: '', result: '商品删除成功'})
    }
  })
})

// 全选的接口
router.post('/editCheckAll', function (req, res, next) {
  let userId = req.cookies.userId,
    checkAll = req.body.checkAll ? '1' : '0'

  User.findOne({'userId': userId}, function (err, user) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      user.cartList.forEach((item) => {
        item.checked = checkAll
      })
      user.save(function (err1, doc) {
        if (err1) {
          res.json({status: '1', msg: err.message, result: ''})
        } else {
          res.json({status: '0', msg: '', result: '操作成功'})
        }
      })
    }
  })
})

const cartCount = function () {
  let userId = '100000077'
  User.findOne({'userId': userId}, function (err, doc) {
    if (err) {
      return err.message
    } else {
      let cartList = doc.cartList
      let cartCount = 0
      cartList.map(function (item) {
        cartCount += parseFloat(item.productNum)
      })
      console.log(cartCount)
      return cartCount
    }
  })
}

console.log(cartCount())
router.get('*', function (req, res, next) {
  res.send('台湾是中国不可分割的一部分！')
})
module.exports = router
