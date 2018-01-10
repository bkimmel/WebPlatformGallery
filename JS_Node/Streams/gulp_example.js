function ObjectsFromReadableStream(src){
	const ret = [];
	//var srcStream = gulp.src('./pageconfigs/us/*.json');
	var srcStream = src;
	
	return new Promise((res,rej)=>{
		let outStream = new Writable({
		  write(chunk, encoding, callback) {
			console.log('Writable chunk:');
			console.log(chunk);
			ret.push(chunk);
			callback();
		  },
		  error() {
			rej(ret);  
		  },
		  objectMode: true
		});
		srcStream.on('end', ()=>{ res(ret) });
		srcStream.pipe(outStream);
	});
	
	/*
	console.log('Object set created with:');
	console.log(src);
	
	
	return new Promise((res,rej)=>{
		src.on('data', (chunk)=>{
			console.log('Reading from source:');
			console.log(chunk);
			typeof chunk == 'object' && !!chunk && objs.push(chunk);
		});
		src.on('end',()=>{
			res(objs);
		});
		src.on('error',()=>{
			rej('Error processing readable stream', objs);
		});
		src.read((v)=>{
			console.log('manual read:');
			console.log(v);
		});
	})
	
	const { Writable } = require('stream');
	const outStream = new Writable({
	  write(chunk, encoding, callback) {
		console.log('Writable chunk:');
		console.log(chunk.toString());
		callback();
	  }
	});
	src.pipe(outStream);
	return [];
	*/
}

function ReadableFileStream(objs){
	//console.log('getting stream of:');
	//console.log(objs);
	return new Readable({
	  read(size) {
		if(!objs.length){
			return this.push(null);
		}
		var topush = objs.shift();
		console.log('Pushing to stream:\n');
		console.log(topush);
		this.push(topush);
	  },
	  objectMode: true
	});
}

const fileCache = {
	cache: new Map(), 
	fetch: function(v){
		let sc = this;
		return (sc.cache.has(v) && sc.cache.get(v)) || (function(){
		    sc.cache.set(v, fs.readFileSync(v));
		    return sc.cache.get(v);
		})();
	}
};

const srcCache = {
    cache: new Map(), 
	fetch: function(v){
		let vk = JSON.stringify(v);
		let sc = this;
		return ( sc.cache.has(vk) && Promise.resolve(sc.cache.get(vk)) ) || (function(){
			console.log('setting cache for:');
			console.log(v);
		    //sc.cache.set(v, ObjectsFromReadableStream(gulp.src(v)));
			sc.cache.set(vk, ObjectsFromReadableStream(gulp.src(v)));
			//console.log('cache has:');
			//console.log(sc.cache.has(vk));
			//console.log(sc.cache.get(vk));
		    return Promise.resolve(sc.cache.get(vk)).then((v)=>{ 
				//console.log('getting Stream for:');
				//console.log(v);
				return ReadableFileStream(v); 
			});
		})();
	}
}
