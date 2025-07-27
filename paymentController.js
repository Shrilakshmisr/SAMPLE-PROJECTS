const path = require("path");
const {
  createOrder,
  getPaymentStatus,
} = require("../services/cashfreeServices");
const Payment = require("../models/paymentModel");
const TemplateGenerator = require("../Template/htmltemp");

exports.getPaymentPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/expense.htm"));
};

exports.processPayment = async (req, res) => {
                                                                                                                     
  const orderId = "ORDER-" + Date.now();
  const orderAmount = 2000;
  const orderCurrency = "INR";
  const customerID = "1";
  const customerPhone = "9999999999";
  console.log(req.user)
 const userId =req.user.userId
  try {
    //* Create an order in Cashfree and get the payment session ID
    const paymentSessionId = await createOrder(
      orderId,
      orderAmount,
      orderCurrency,
      customerID,
      customerPhone,
      
    );
    await Payment.create({
      orderId,
      paymentSessionId,
      orderAmount,
      orderCurrency,
      paymentStatus: "Pending",
      userId,
    });

    res.json({ paymentSessionId, orderId });
  } catch (error) {
    console.error("Error processing payment:", error.message);
    res.status(500).json({ message: "Error processing payment" });
  }
};


exports.getPaymentStatus1 = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const orderStatus = await getPaymentStatus(orderId);

    const order = await Payment.findOne({ where: { orderId } });
    order.paymentStatus = orderStatus;
    console.log("order ststus is ",orderStatus);
    await order.save();
if (orderStatus === "SUCCESS") {
  const User = require("../models/user");
  await User.update(
    { isPremiumUser: true },
    { where: { id: order.userId } }
  );
}

    const htmlTemp = TemplateGenerator(order.orderId, orderStatus, order.orderAmount)
    res.send(htmlTemp)

  } catch (error) {
    console.error("Error fetching payment status:", error.message);
    res.status(500).json({ message: "Error fetching payment status" });
  }
};  
