const Order = require('../models/order');
const sendEmail = require('../utils/sendmail');

// CREATE NEW ORDER

const createOrder = async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      address,
      paymentId
    } = req.body;

    // Validate basic data
    if (
      !items ||
      items.length === 0 ||
      !totalAmount ||
      !address
    ) {
      return res.status(400).json({
        message: 'Invalid order data'
      });
    }

    // Convert cart format to Order model format
    const orderItems = items.map((item) => ({
      product: item.productId,
      quantity: Number(item.qty),
      price: Number(item.price)
    }));

    // Create order
    const order = new Order({
      user: req.user._id,

      items: orderItems,

      totalAmount: Number(totalAmount),

      address: {
        fullname: address.fullName,
        street: address.street,
        city: address.city,
        postalCode: address.postalCode,
        country: address.country
      },

      paymentId: paymentId || '',

      status: 'pending'
    });

    await order.save();

    // Send confirmation email
    try {
      const message = `
Your ShopNest order has been created successfully.

Order ID: ${order._id}

Total Amount: ₹${totalAmount}

Thank you for shopping with ShopNest.
      `;

      await sendEmail(
        req.user.email,
        'ShopNest - Order Created',
        message
      );
    } catch (emailError) {
      // Don't fail the order if email fails
      console.error(
        'Email sending failed:',
        emailError.message
      );
    }

    res.status(201).json({
      message: 'Order created successfully',
      order
    });

  } catch (error) {
    console.error('CREATE ORDER ERROR:', error);

    res.status(500).json({
      message: 'Error creating order',
      error: error.message
    });
  }
};

// GET MY ORDERS

const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id
    }).populate(
      'items.product',
      'name price'
    );

    res.json(orders);

  } catch (error) {
    console.error('MY ORDERS ERROR:', error);

    res.status(500).json({
      message: 'Error fetching orders',
      error: error.message
    });
  }
};
// GET ALL ORDERS - ADMIN

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'id name');

    res.json(orders);

  } catch (error) {
    console.error('GET ORDERS ERROR:', error);

    res.status(500).json({
      message: 'Error fetching orders',
      error: error.message
    });
  }
};

// UPDATE ORDER STATUS - ADMIN

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    order.status = status;

    await order.save();

    res.json({
      message: 'Order status updated successfully',
      order
    });

  } catch (error) {
    console.error(
      'UPDATE ORDER STATUS ERROR:',
      error
    );

    res.status(500).json({
      message: 'Error updating order status',
      error: error.message
    });
  }
};


module.exports = {
  createOrder,
  myOrders,
  getOrders,
  updateOrderStatus
};