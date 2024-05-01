import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import multer from "multer"
import path from "path"
import cors from "cors"
import bodyParser from "body-parser"

const port = 4000
const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// CONNECT MONGODB USING ATLAS
mongoose
    .connect("mongodb+srv://786niyasniya:U3TgS3FpaJQIEt5i@e-commerce.sboujmu.mongodb.net/E-commerce")
    .then(console.log("Succesfully connected to DB"))
    .catch((err) => console.log(err))

app.get("/", (req, res) => {
    res.send("Working")
})

// SCHEMA FOR PRODUCT

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

// SHEMA FOR USERS

const Users = mongoose.model("Users", {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now(),
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
        success: true,
        image_url: `http://localhost:${port}/images/${req.file.filename}`,
    })
})

// USER REGISTER ENDPOINT

app.post("/signup", async (req, res) => {
    try {
        const check = await Users.findOne({ email: req.body.email })
        if (check) {
            return res.status(400).json({ success: false, error: "User already exists" })
        }
        let cart = {}
        for (let index = 0; index < 300; index++) {
            cart[index] = 0
        }

        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        })
        await user.save()

        const data = {
            user: {
                id: user.id,
            },
        }
        const token = jwt.sign(data, "secret_ecom")
        res.json({ success: true, token })
    } catch (error) {
        console.log(error)
    }
})

// USER LOGIN ENDPOINT

app.post("/login", async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email })
        if (user) {
            if (user.password === req.body.password) {
                const data = {
                    user: {
                        id: user.id,
                    },
                }
                const token = jwt.sign(data, "secret_ecom")
                res.json({ success: true, token })
            } else {
                res.json({ success: false, error: "Incorrect password" })
            }
        } else {
            res.json({ success: false, error: "No such email registered,Try signup" })
        }
    } catch (error) {
        console.log(error)
    }
})

// FETCH ALL PRODUCTS

app.get("/allproducts", async (req, res) => {
    try {
        let products = await Product.find()
        console.log("All products fetched from DB")
        res.send(products)
    } catch (error) {
        console.log(error)
    }
})

// PRODUCT ADD ENDPOINT

app.post("/addproduct", async (req, res) => {
    // LOGIC FOR AUTOMATIC CREATION OF NEW ID FOR THE PRODUCT
    try {
        let products = await Product.find()
        let id
        if (products.length > 0) {
            const last_product_array = products.slice(-1)
            const last_product = last_product_array[0]
            id = last_product.id + 1
        } else {
            id = 1
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
    } catch (error) {
        console.log(error)
    }
})

// PRODUCT Remove ENDPOINT

app.post("/removeproduct", async (req, res) => {
    try {
        const response = await Product.findOneAndDelete({ id: req.body.id })
        console.log(response)
        res.json({
            success: true,
            name: req.body.name,
        })
        console.log("Product removed")
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log("Server is running on port 4000")
})
