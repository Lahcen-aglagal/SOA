const mongoose = require('mongoose');
const products = require('../model/product');

class ProductRepository {

    async CreateProduct({name, desc, banner, type, unit, price, available, suplier}){
        
        const product = new products({
            name, desc, banner, type, unit, price, available, suplier
        });
        const res_product = await product.save();
        return res_product;
    }

    async GetProducts(){
        return await products.find();
    }

    async GetProductByName(name){
        const res_product = products.findOne({name : name})
        return res_product
    }
    async FindById(id){
        return await products.findById(id);
    }

    async FindByCategory(category){
        const res = await products.find({ category : category});        
        return res;
    }
    async FindSelectedProducts(_id_selectedProducts){
        const res = await products.find({_id : _id_selectedProducts});        
        return res;
    }

    async UpdateProduct({name, desc, banner, type, unit, price, available, suplier}){
        await products.updateOne({_id : id}, {$set : {name, desc, banner, type, unit, price, available, suplier}});  
    }

    async DeleteProduct(id){
        await products.deleteOne({_id : id});
    }
}

module.exports = ProductRepository;