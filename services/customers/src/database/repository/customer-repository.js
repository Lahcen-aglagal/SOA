const Customer = require('../models/customer');
const bcrypt = require('bcryptjs');
const { GeneratePassword } = require('../../utils');

class CustomerRepository {

  async CreateCustomer(customerData) {
    try {
      const costumer = {
        name: customerData.name,
        email: customerData.email,
        password: customerData.password,
        phone : customerData.phone,
        address : customerData.address
      }
      const customer = new Customer(costumer);
      const savedCustomer = await customer.save();
      return savedCustomer;
      
    } catch (error) {
      throw new Error(`Error creating customer: ${error.message}`);
    }
  }

  // Find a customer by email
  async findCustomerByEmail(email) {
    try {
      const customer = await Customer.findOne({ email });
      return customer;
    } catch (error) {
      throw new Error(`Error finding customer by email: ${error.message}`);
    }
  }

  async FindCustomerById(id) {
    try {
      console.log("ID" , id);
      const customer = await Customer.findById(id);
      console.log("Customer" , customer);
      return customer;
    } catch (error) {
      throw new Error(`Error finding customer by ID: ${error.message}`);
    }
  }

  // Update a customer by ID
  async updateCustomerById(id, updateData) {
    try {
      const customer = await Customer.findByIdAndUpdate(id, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Run validation on update
      });
      return customer;
    } catch (error) {
      throw new Error(`Error updating customer: ${error.message}`);
    }
  }

  // Delete a customer by ID (soft delete)
  async deleteCustomerById(id) {
    try {
      const customer = await Customer.findByIdAndUpdate(
        id,
        { isActive: false }, // Soft delete by setting isActive to false
        { new: true }
      );
      return customer;
    } catch (error) {
      throw new Error(`Error deleting customer: ${error.message}`);
    }
  }

  // Get all customers (with optional filters)
  async getAllCustomers(filter = {}) {
    try {
      const customers = await Customer.find(filter);
      return customers;
    } catch (error) {
      throw new Error(`Error fetching customers: ${error.message}`);
    }
  }

  // Add an order to a customer's orders array
  async addOrderToCustomer(customerId, orderData) {
    try {
      const customer = await Customer.findByIdAndUpdate(
        customerId,
        { $push: { orders: orderData } }, 
        { new: true }
      );
      return customer;
    } catch (error) {
      throw new Error(`Error adding order to customer: ${error.message}`);
    }
  }

  // Get all orders for a customer
  async getCustomerOrders(customerId) {
    try {
      const customer = await Customer.findById(customerId).select('orders');
      return customer ? customer.orders : [];
    } catch (error) {
      throw new Error(`Error fetching customer orders: ${error.message}`);
    }
  }

  async addCartItem(customerId, {_id , name , banner , price } , qty , isRemove = false) {
    const cartItem =  {
      product: { _id , name , banner , price },
      unit: qty
    }
    try {
      const profile = await Customer.findById(customerId).populate('cart');
      if (!profile) {
        throw new Error('Customer not found');
      }
    const CartItems = profile.cart;
    if (CartItems.length > 0) {
      if (isRemove) {
        const itemIndex = CartItems.findIndex(item => item.product._id.toString() === _id);
        if (itemIndex !== -1) {
          CartItems.splice(itemIndex, 1);
        }
      } else {
        const existingItem = CartItems.find(item => item.product._id.toString() === _id);
        if (existingItem) {
          existingItem.unit += qty;
        } else {
          CartItems.push(cartItem);
        }
      }
      const updatedCart = await Customer.findByIdAndUpdate(customerId, { cart: CartItems }, { new: true });
      return updatedCart;
    }
    } catch (error) {
      throw new Error(`Error adding cart item to customer: ${error.message}`);
    }
  }
  async getCustomerCart(customerId) {
    try {
      const customer = await Customer.findById(customerId).populate('cart');
      return customer ? customer.cart : [];
    } catch (error) {
      throw new Error(`Error fetching customer cart: ${error.message}`);
    }
  }

  // Hash password (utility method)
  async hashPassword(password) {
    try {
      // const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password);
    } catch (error) {
      throw new Error(`Error hashing password: ${error.message}`);
    }
  }

  // Compare password (utility method)
  async comparePassword(candidatePassword, hashedPassword) {
    try {
      return await bcrypt.compare(candidatePassword, hashedPassword);
    } catch (error) {
      throw new Error(`Error comparing passwords: ${error.message}`);
    }
  }
}
module.exports = CustomerRepository;