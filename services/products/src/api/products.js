const product = require('../database/model/product');
const Auth = require('./middleware');
const { ProductService } = require('../service');
module.exports = (app) => {

    const service =  new ProductService();

    app.post('/create' , Auth, async (req, res) => {
        const {
            name,
            desc,
            banner,
            type,
            unit,
            price,
            available,
            suplier
        } = req.body;
        // const product = await service.FindProductByName(name);
        // if (product){
        //     res.status().json({message : "this product is already exist"})
        // }
        const {data} = await service.CreateProduct({name, desc, banner, type, unit, price, available, suplier});
        res.json(data)
    })
    app.get('/products', Auth, async (req, res) => {
        const products = await service.GetProducts();
        res.json(products);
    });

    app.get('/products/:id', Auth, async (req, res) => {
        const product = await service.FindById(req.params.id);
        res.json(product);
    });

    app.get("/whoami", (req, res, next) => {
        return res
          .status(200)
          .json({ msg: "/ or /products : I am products Service" });
      });
    
}