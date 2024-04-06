import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import multer from "multer"
import path from "path"
import cors from "cors"

const port = 4000
const app = express()

app.use(express.json())
app.use(cors())

// CONNECT MONGODB USING ATLAS
mongoose
    .connect("mongodb+srv://786niyasniya:U3TgS3FpaJQIEt5i@e-commerce.sboujmu.mongodb.net/E-commerce")
    .then(console.log("Succesfully connected to DB"))
    .catch((err) => console.log(err))

app.get("/", (req, res) => {
    res.send("Working")
})

// SCHEMA FRO PRODUCT

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    available: {
        type: Boolean,
        default: true,
    },
})

// IMAGE STORAGE ENGINE

const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    },
})

const upload = multer({ storage: storage })

// CREATING UPLOAD ENDPOINT FOR IMAGE

app.use("/images", express.static("upload/images"))
app.post("/upload", upload.single("product"), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`,
    })
})

// FETCH ALL PRODUCTS

app.get("/allproducts", async (req, res) => {
    let products = await Product.find()
    console.log("All products fetched from DB")
    res.send(products)
})

// PRODUCT ADD ENDPOINT

app.post("/addproduct", async (req, res) => {
    // LOGIC FOR AUTOMATIC CREATION OF NEW ID FOR THE PRODUCT

    let products = await Product.find();
    console.log(products)
    let id;
    if (products.length > 0) {
        const last_product_array = products.slice(-1)
        const last_product = last_product_array[0]
        id = last_product.id + 1
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    })
    await product.save()
    res.json({
        success: true,
        name: req.body.name,
    })
    console.log("New Product saved to DB")
});

// PRODUCT Remove ENDPOINT

app.delete("/removeproduct", async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({
        succes: true,
        name:req.body.name
    })
    console.log("Succesfully delted requested product from DB")
})


app.listen(port, () => {
    console.log("Server is running on port 4000")
})
