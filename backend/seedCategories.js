const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Category = require('./models/Category');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const defaultCategories = [
      { name: 'Genel', color: '#CBAACB' },     // yumuşak lila
      { name: 'İş', color: '#A9849F' },        // mürdüm-gri
      { name: 'Okul', color: '#90CAF9' },      // pastel mavi
      { name: 'Kişisel', color: '#F8BBD0' },   // açık pembe
      { name: 'Sağlık', color: '#FFE082' },    // pastel sarı
      { name: 'Sosyal', color: '#AED581' },    // yumuşak yeşil
      { name: 'Alışveriş', color: '#FFAB91' }, // pastel mercan
      { name: 'Finans', color: '#B0BEC5' },    // gri-mavi
      { name: 'Seyahat', color: '#CE93D8' },   // pastel mor
      { name: 'Hobi', color: '#D7CCC8' }       // taş rengi
    ];

    await Category.deleteMany({});
    await Category.insertMany(defaultCategories);
    console.log('🎨 Varsayılan kategoriler güncellendi ve eklendi.');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Hata:', err);
    process.exit(1);
  });
