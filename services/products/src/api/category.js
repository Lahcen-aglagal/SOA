const { CategoryService } = require('../service');
const Auth = require('../api/middleware');
module.exports = (app) => {
    app.post('/category/create',Auth ,async (req, res) => {
        const {name , description} = req.body

        try {
            const category = await CategoryService.createCategory({name , description});
            res.status(201).json(category);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    // app.get('/category', async (req, res) => {
    //     try {
    //         const categories = await CategoryService.getAllCategories();
    //         res.json(categories);
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // });

    // app.get('/category/:id', async (req, res) => {
    //     try {
    //         const category = await CategoryService.getCategoryById(req.params.id);
    //         if (!category) return res.status(404).json({ message: 'Category not found' });
    //         res.json(category);
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // });

    // app.put('/category/:id', async (req, res) => {
    //     try {
    //         const category = await CategoryService.updateCategory(req.params.id, req.body);
    //         if (!category) return res.status(404).json({ message: 'Category not found' });
    //         res.json(category);
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // });

    // app.delete('/category/:id', async (req, res) => {
    //     try {
    //         const category = await CategoryService.deleteCategory(req.params.id);
    //         if (!category) return res.status(404).json({ message: 'Category not found' });
    //         res.json({ message: 'Category deleted successfully' });
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // });

    app.get('/category/whoami', async (req, res) => {
        res.json({ message: "Product Microservice is running! : Category " });
    })
};
