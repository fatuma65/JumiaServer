const Category = require("../connect/models/Categories")
const NestedSubCategory = require("../connect/models/NestedSubCategory")
const SubCategory = require("../connect/models/SubCategory")
const {getAllCategories, getCategory} = require("../controllers/CategoryController")
const {createCategoryWithSubCategory} = require('../controllers/SubCategory')

jest.mock("../connect/models/Categories")

const categories = [
    {id: 1, title: 'Mobile Phones'},
    {id: 1, title: 'Mobile Phones'}
]
const res = {
    status: jest.fn().mockReturnThis(),
    // status: jest.fn((x) => x),
    json: jest.fn((x) =>x)
}
const req = {
    params: {
        id: 1
    },
    body: {
        title: 'Mobile Phones'
    }
}
const subCategories = {
    title: 'Mobile Phones',
    subCategoryname: ['apple', 'tecno', 'infinix', 'samsung']
}

describe('Main Categories', () => {
    it('should fetch all categories from the database', async () => {
        Category.findAll.mockImplementationOnce(() => (categories))
        await getAllCategories(categories, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(categories)
    })

    it('should should get one category', async () => {
        Category.findByPk.mockImplementationOnce(() => (req.params))
        await getCategory(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
    })

    it('should test if product not found', async () => {
        Category.findByPk.mockImplementationOnce(() => (null))
        await getCategory(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
    })
})
