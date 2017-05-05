mongoose.connect('mongodb://127.0.0.1:27017/Chat');

db.on('open', () => {

	console.log('DB Connected !');


});