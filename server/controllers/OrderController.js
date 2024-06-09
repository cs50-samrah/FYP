const Order = require('../models/OrderModel')
const crypto = require('crypto')





exports.userGetAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user })
      .sort({ orderDate: -1 })
      .populate('products');
    res.json({
      status: true,
      orders
    })
  } catch (error) {
    res.json({
      status: false,
      message: error.message
    })
  }
}

exports.userCancelOrder = async (req, res) => {
  try {
    const stat = await Order.updateOne({ _id: req.params.id }, { status: 'canceled' })
    res.json({ status: true, stat })

  } catch (error) {
    res.json({
      status: false,
      message: error.message
    })
  }
}


exports.userCreateOrder = async (req, res) => {
  try {
    const code = crypto.randomUUID()
    const order = await Order.create({
      orderid: code.split("-")[0],
      orderDate: new Date(),
      status: 'pending',
      delivery_status: 'pending',
      total_amount: req.body.total_amount,
      shipping_address: req.body.shipping_address,
      contact: req.body.contact,
      products: req.body.products,
      user: req.user,
    })
    res.json({
      status: true,
      order
    })
  } catch (error) {
    res.json({
      status: false,
      message: error.message
    })
  }
}