const Category = require('../model');

class CategoryRepository {
    async createCategory(data) {
        const { name , description } = data ; 
        const new_category =  new Category({
            name,
            description
        })
        return await new_category.save();
    }

    async getAllCategories() {
        return await Category.find();
    }

    async getCategoryById(id) {
        return await Category.find({ _id: id });
    }

    async updateCategory(id, data) {
        return await Category.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteCategory(id) {
        return await Category.findByIdAndDelete(id);
    }
}

module.exports =new CategoryRepository();
