const service = require('.');
const {ProductRepository} = require('../database');
const {FormateData} = require('../utils');
class ProductService {
    constructor() {
        this.productsRepository = new ProductRepository();
    }

    async CreateProduct(product) {
        const res_product = await this.productsRepository.CreateProduct(product);
        return FormateData(res_product);
    }

    async GetProducts(){
        const products = await this.productsRepository.GetProducts();

        let categories = {};

        products.map(({ type }) => {
            categories[type] = type;
        });
        
        return FormateData({
            products,
            categories:  Object.keys(categories)  
           })
    }
    async FindById(id) {
        const res_product = await this.productsRepository.FindById(id);
        return FormateData(res_product);
    }

    async FindByCategory(category) {
        const res_product = await this.productsRepository.FindByCategory(category);
        return FormateData(res_product);
    }

    async FindSelectedProducts(_id_selectedProducts) {
        const res_product = await this.productsRepository.FindSelectedProducts(_id_selectedProducts);
        return FormateData(res_product);
    }
    async FindProductByName(name) {
        const res = await this.productsRepository.GetProductByName(name);
        return res;
    }
}

module.exports = ProductService;