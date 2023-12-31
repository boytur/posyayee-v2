const data = [{
    productId: "1",
    productBarcode: "1234567890123",
    productName: "สินค้าไอดี1",
    productSalePrice: "1.00",
    productCostPrice: 0.56,
    productQuantity: 2,
    productImagePath: "https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/61/88/8851932353861/8851932353861_1-20230816104923-.jpg",
    productType: "ทั่วไป"
}];

// Function to generate a new product entry
const generateProduct = (id) => ({
    productId: id.toString(),
    productBarcode: `123456789012${id}`,
    productName: `สินค้าไอดี${id}`,
    productSalePrice: (id + 1).toFixed(2),
    productCostPrice: (id / 2).toFixed(2),
    productQuantity: id + 1,
    productImagePath: `https://placehold.co/600x400`,
    productType: "ทั่วไป"
});

// Create 20 additional entries
for (let i = 2; i <= 10; i++) {
    data.push(generateProduct(i));
}

// Export the data array
export default data;
