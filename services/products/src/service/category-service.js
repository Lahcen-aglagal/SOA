const {CategoryRepository} = require('../database/repository');

class CategoryService {
    
    async createCategory(data) {
        if (!data.name) {
            throw new Error('Category name is required');
        }
        return await CategoryRepository.createCategory(data);
    }

    async getAllCategories() {
        return await CategoryRepository.getAllCategories();
    }

    async getCategoryById(id) {
        return await CategoryRepository.getCategoryById(id);
    }

    async updateCategory(id, data) {
        return await CategoryRepository.updateCategory(id, data);
    }

    async deleteCategory(id) {
        return await CategoryRepository.deleteCategory(id);
    }
}

module.exports =new CategoryService();
