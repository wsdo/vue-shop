var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Goods = require('../models/goods')
mongoose.connect('mongodb://59.110.143.210:27017/shop')

mongoose.connection.on('connected', function () {
  console.log('mongondb connected success')
})

mongoose.connection.on('error', function (err) {
  console.log(err)
  console.log('mongondb connected fail')
})

mongoose.connection.on('disconnected', function () {
  console.log('mongondb connected disconnected')
})

// 当数据库关闭连接的时候触发
mongoose.connection.on('disconnected', function () {
  console.log('Mongodb connected disconnected')
})

router.get('/list', function (req, res, next) {
  let skip = Math.floor(Math.random() * 1000 + 1)
  console.log(skip)
  let goodModel = Goods.find({}).limit(8).skip(skip)
  goodModel.exec({}, function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        result: err.message
      })
    } else {
      res.json({
        status: 0,
        result: doc
      })
    }
  })
})
//
// // 加入购物车
//
// router.post('/addCart', function (req, res, next) {
//   if (req.cookies.userId) {
//     var userId = req.cookies.userId
//   } else {
//     res.json({
//       status: '1',
//       msg: '用户信息不存在'
//     })
//   }
//   var productId = req.body.productId
//   var User = require('../models/user')
//
//   User.findOne({userId: userId}, function (err, userDoc) {
//     // console.log(userDoc);
//     // 当添加商品的时候，先去数据库里面查询一下，这个商品是否存在，
//     // 如果存在，就让它的productNum 加1，如果不存在，就添加这个商品。
//
//     let goodItem = ''
//     // 先去数据库里面查询一下
//     userDoc.cartList.forEach(function (item) {
//       // 如果购物车里面的id 和现在要添加的商品id一样就让它productNum 加1
//       if (item.productId == productId) {
//         // 此时把相同的产品赋值一个变量
//         goodItem = item
//         item.productNum ++
//       }
//     })
//
//     if (goodItem) {
//       // 说明你购物车里面存在这个商品
//       userDoc.save(function (err3, doc3) {
//         if (err3) {
//           res.json({
//             status: '1',
//             msg: err.message
//           })
//         } else {
//           res.json({
//             status: '0',
//             result: '商品数量添加成功！'
//           })
//         }
//       })
//     } else {
//       // 此时的逻辑是当商品第一次添加到购物车里面
//
//       // 通过productId查询出一条商品，然后把这一条商品，存入到user的cartList里面。
//       Goods.findOne({productId: productId}, function (err1, goodsDoc) {
//           // 添加相同的商品，商品只添加一次，数量加1
//         goodsDoc.productNum = 1
//         goodsDoc.checked = 1
//
//         userDoc.cartList.push(goodsDoc)
//         userDoc.save(function (err2, doc2) {
//           if (err2) {
//             res.json({
//               status: '1',
//               msg: err.message
//             })
//           } else {
//             res.json({
//               status: 0,
//               msg: '',
//               result: '此商品第一次加入购物车！'
//             })
//           }
//         })
//       })
//     }
//   })
// })
//
module.exports = router
