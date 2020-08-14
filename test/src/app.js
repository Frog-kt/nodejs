const PORT = process.env.PORT || 3000;
const DB_LOCAL_URL = process.env.DB_LOCAL_URL || 'mongodb://localhost:27017/test';


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.listen(PORT, () => { console.log(`Listning port ${PORT}`) });


// MongoDBの接続情報
const connectDatabase = () => {
    mongoose.connect(DB_LOCAL_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(con => {
        console.log(`MongoDB Database connected with host: ${con.connection.host}`);
    })
};

// MongoDBに接続
connectDatabase();

// ユーザースキーマの設定
const userSchema = new mongoose.Schema({
    name: { type: String, require: true, unique: true },
    id: { type: String, require: true, unique: true },
    ps: { type: String, require: true }
});

const User = mongoose.model('User', userSchema);


// ミドルウェア
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// 新規登録
app.post('/signup', async (req, res) => {
    const {
        id,
        ps,
        name
    } = req.body;

    // DBにユーザーを登録する
    try {
        const user = await User.create({
            id,
            ps,
            name
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('DBに保存できませんでした');
    }
    res.status(200).send('OK');
});