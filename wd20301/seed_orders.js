const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://127.0.0.1:27017/final_asm2';

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('Connected to seed orders');
        const Bill = mongoose.model('bill', new mongoose.Schema({}, { strict: false, collection: 'bills' }));
        
        const dummyBills = [
            {
                createdDate: new Date(),
                total: 790000,
                user: {
                    name: "hanh",
                    phone: "0984556843",
                    email: "hanh@gmail.com",
                    address: "Hà Nội"
                },
                items: [
                    {
                        product: {
                            id: "2",
                            name: "Bàn phím cơ không dây Aula S100 Pro xanh dương trắng tím",
                            price: 790000,
                            image: "Bàn phím cơ không dây Aula S100 Pro xanh dương trắng tím.png"
                        },
                        quantity: 1
                    }
                ],
                status: "shipping"
            }
        ];

        await Bill.insertMany(dummyBills);
        console.log('Dummy bill created');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
