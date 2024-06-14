import React, { useEffect } from 'react';
import axios from 'axios';
import './premium.css'

const RazorpayCheckout = ({ plan, email }) => {
    // console.log(plan)
  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    };
    loadRazorpay();
  }, []);

  const handlePayment = async () => {
    // console.log(plan,email);
    try {
        const response = await axios.post('https://twitter-clone-aevo.onrender.com/api/payment', { plan, email });
        var { orderId } = response.data;
    } catch (error) {
        console.log(error)
    }

    const options = {
      key: 'rzp_test_3KYQTBO46sBf3t',
      amount: plan.frequency === 'monthly' ? plan.priceMonthly * 100 : plan.priceYearly * 100,
      currency: 'INR',
      name: 'Twitter Clone',
      description: 'Subscription Plan',
      order_id: orderId,
      handler: function (response) {
        alert('Payment successful');
        // Handle post-payment actions like updating user subscription
      },
      prefill: {
        email: email,
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div>
      <button onClick={handlePayment} className='btn' style={{margin:"auto", width:"100%", marginTop:"15px"}}>Pay with Razorpay</button>
    </div>
  );
};

export default RazorpayCheckout;
