const { json } = require("express");
const CustomerService = require("../services/customer-service");
const UserAuth = require("./middleware");

module.exports = (app) => {

    const service  = new CustomerService();

    //api
    app.get("/" , async (req , res , next) => {
        try {
            const { event , data } = req.body;
            console.log(event , data);
            service.SubscribeEvents(event , data);
            return res.status(200).json({ message: "Customer Microservice is running!" });
        } catch (error) {
            next(error);
        }
    })
    app.post('/signup' ,async (req , res , next) => { 
        console.log(req.body);
        try {
            const { email , password , phone , address , name } = req.body;
            const {data } = await service.SignUp({ email , password , phone , address , name });
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    });
    app.post('/signin', async (req , res , next) => {
        try {
            const { email , password } = req.body;
            console.log(email , password);
            const {data} = await service.SignIn({ email , password });
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    });
    app.get("/profile", UserAuth, async (req, res, next) => {
        try {
          const { _id } = req.user;
          const { data } = await service.GetProfile({ _id });
          return res.json(data);
        } catch (err) {
          next(err);
        }
      });
    app.get('/shoping-details', UserAuth, async (req,res,next) => {
        const { _id } = req.user;
        const { data } = await service.GetShopingDetails(_id);

        return res.json(data);
    });

    app.get('/wishlist', UserAuth, async (req,res,next) => {
        const { _id } = req.user;
        const { data } = await service.GetWishList( _id);
        return res.status(200).json(data);
    });

    app.get('/whoami', (req,res,next) => {
        return res.status(200).json({msg: '/customer : I am Customer Service'})
    })
    
    // CustomerService.GetShopingDetails
    // app.post('/customer/managecart', UserAuth, CustomerService.ManageCart);
    // app.post('/customer/manageorder', UserAuth, CustomerService.ManageOrder);
    // app.post('/customer/events', CustomerService.SubscribeEvents);

}

