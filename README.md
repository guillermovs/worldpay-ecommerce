# Worldpay E-commerce API integration
For this assignment I've developed an fictitious E-commerce storefront in VueJS with a Vuex store for persistent storage and a WorldPay payment gateway. The user is able to browse, purchase and refund/cancel orders and get a full (or partial) refund.

# Starting the server
To run the e-commerce store on your own machine simply follow the next steps:
 - Download this repo & cd to the root folder
 - Run `npm install` to install dependencies
 - Run `npm run dev` to start the server
 - Go to `http://localhost:3000/`

# UI details
Following the assignment brief, I focused on creating an real enterprise looking product rather than a barebones MVP. I hope this comes across in the care given to the design, products, animations and ultimate end-user experience. **See screenshots directory** for a glimpse of the product.
 - Product tiles with moving backgrounds
 - Navigation & menu transitions
 - Checkout & payment flow

# Transactions
Per requirements, the site uses WorldPay's payment gateway. No money will be debited, since it is running in test mode. To create fictitious charges (and refunds), please feel free to use any of the following fake credit/debit card numbers, with any combination of Name, Expiry & CVC code:
 - Visa: 4444333322221111
 - Mastercard: 5555555555554444

# Challenges
The assignment took longer than expected due to a combination of a lack of time, a sub-par API documentation and libraries (as compared to alternative payment gateways) and the desire to create a beautiful front-end experience. 

# Out of scope
Since this is a sample store that is designed to run as a proof of concept, I have decided not to (fully) implement
 - User accounts (this is a single-user store)
 - Shipping & Tax calculations
 - Alternative payment methods
 - Mobile optimised navigation (hamburger menu)
 - Product pages or modals
 - Email gateways
 - Dynamic, DB-driven product catalogue
 - Resource minification & optimisation

# Testing
For this assignment I focused on developing a working, tested enterprise-class product. It started as a TDD approach, writing failing tests and re-factoring the code until it worked. Given the nature, complexity and short time frame of the assignment I prioritised development over testing. Along with this code base you will find a collection of 10 passing tests over 4 different suites, developed using the **Jest** testing framework. To execute them simply run `npm run test`

# Security
The WorldPay payment (test) servers did not accept requests from localhost:3000 (Cross-origin resource sharing -CORS- limitations), where the server is running. As a workaround I developed and hosted a PHP proxy (see: `wp-proxy.php`) to store the server keys and process the payment. This would normally be all done in the same server and behind the scenes.