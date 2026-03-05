const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ProjectUser:nabha@cluster0.g8ufgza.mongodb.net/?appName=Cluster0')
  .then(() => { console.log('Connected'); process.exit(0); })
  .catch((err) => { console.error(err.message); process.exit(1); });
