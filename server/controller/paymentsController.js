const {createRazorpayInstance} = require('../config/razorConfig.js')
const razorpayInstance = createRazorpayInstance()
const crypto = require('crypto')
require('dotenv').config()

//creating order id ---> //http://localhost:5000/api/createOrder
exports.createOrder = async (req, res) => {
  const {amount} = req.body

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };

  try{
    razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        console.log(err)
        return res.status(500).json({
          success: false,
          message: "Something went wrong",
        })
      }
      return res.status(200).json(order);
    })
  }catch(error){
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    })
  }
}

//verifying payment ---> //http://localhost:5000/api/verifyPayment
exports.verifyPayment = async(req, res) =>{
  const {orderId, paymentId, signature} = req.body;

  const secret =  process.env.RAZORPAY_KEY_SECRET;

  const hmac = crypto.createHmac('sha256', secret);

  hmac.update(orderId + "|" + paymentId);

  const generatedSignature = hmac.digest('hex');
  
  if(generatedSignature === signature){
    return res.status(200).json({
      success: true,
      message: "Payment is successfully done",
    })
  }else{
    return res.status(400).json({
      success: false,
      message: "Payment not verified",
    });
  }
}