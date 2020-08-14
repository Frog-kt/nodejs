const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// MongoDBの接続情報
const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI || 'mongodb://localhost:27017/test', {
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


app.listen(3000, () => { console.log('P3000') });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    console.log(req.query);
    res.status(200).send('OK');
});


app.get('/;id', (req, res) => {
    console.log(req.params);
    res.status(200).send('OK');
});


app.post('/signup', async (req, res) => {
    console.log(req.body);
    console.log(req.body.id);
    console.log(req.body.ps);
    console.log(req.body.name);

    const {
        id,
        ps,
        name
    } = req.body;

    // ユーザー登録
    try {
        const user = await User.create({
            id,
            ps,
            name
        });
    } catch (err) {
        res.status(500).send('DBに保存できませんでした');
    }
    res.status(200).send('OK');
});