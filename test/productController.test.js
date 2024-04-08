const {createProduct, getProduct, getAllProducts, updateProduct, deleteProduct} = require('../controllers/productController')
const Product = require("../connect/models/productModel");
const NestedSubCategory = require('../connect/models/NestedSubCategory')


jest.mock("../connect/models/productModel")

const req = {
    body: {
        id: '1', 
        title: 'product1', 
        description:'product1 is working well', 
        price: 'UGX 200000', 
        nestedId: 1
    }, 
    file: {
        filename: 'image', 
        originalname: 'test-image-1 '
    }, 
    params: {
        id: 1
    }}
const res = {
    status: jest.fn(),
    json: jest.fn((x) => x)
}
const productList = [{title: 'product1', description:'product1 is working well', price: 'UGX 200000', nestedId: 1}, {title: 'product2', description:'product2 is working well', price: 'UGX 300000', nestedId: 2}]
describe('POST /create/product', () => {
    it('should make sure that the request body is being recieved', async () => {
        Product.create.mockImplementationOnce(() => (req))
        await createProduct(req, res)
        expect(req).toBeDefined()
        // expect(res.status).toHaveBeenCalledWith(201)
        // expect(res.json).toHaveBeenCalledWith({ Message: "Product added successfully"}, req)
    })


})
it('should test that we are getting all the products', async () => {
    Product.findAll.mockImplementationOnce(() => (productList))
    await getAllProducts(productList, res)
    expect(res.status).toHaveBeenCalledWith(200)
    // expect(res.json).toHaveBeenCalledWith({productList})
})
it('should test that the products are not found', async () => {
    Product.findAll.mockImplementationOnce(() => (null))
    await getAllProducts(productList, res)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({error1: "Products not found"})
})
it('should test getting one product', async () => {
    Product.findByPk.mockImplementationOnce(() => (req.params))
    await getProduct(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    // expect(res.json).toHaveBeenCalledWith(req.body)
})
