"use module"
import { defaults} from "./config.js"

export async function get( name, ...opts){
	let value
	async function doTry( opt){
		if( value!== undefined){
			return
		}
		if( opt instanceof Function){
			opt= opt.call( this)
		}
		if( opt=== undefined){
			return
		}
		value= opt[ name]
		if( value=== undefined){
			return
		}
		if( value instanceof Function){
			value= value.call( this)
		}
		if( value&& value.then){
			value= await value
		}
	}

	for( let i= 0; value=== undefined&& i< opts.length; ++i){
		let opt= opts[ i]
		await doTry( opt)
	}
	await doTry( defaults)
	return value
}

export function has( name, ...opts){
	for( let i of opts){
		const cur= opts[ i]
		if( cur!== null&& cur!== undefined){
			return true
		}
	}
	return false
}

export async function gets( into, ...opts){
	console.log("OPTS-gets", into, new Error())
	// this code does not insure dependencies have been get()'ed :(
	// partial work-around by asking in into in the needed order. still inter-order issues.

	// load from lowest prio to highest
	// lowest prio: defaults
	const keys= Object.keys( into)
	for( let i in defaults){
		const intoI= into[ i]
		if( intoI!== undefined){
			continue
		}
		into[ i]= defaults[ i]
	}

	// medium prio: into
	// higher priority: ...opts
	for( let key of keys){
		const cur= into[ key]
		console.log("GETS-XZ", key, cur)
		if( cur!== undefined&& !cur.call){
			console.log("skip", cur)
			continue
		}
		into[ key]= await get.call( into, key, ...opts, into)
		console.log("CALL", key, into[key])
	}

	//// resolve every ask
	//for( let key of keys){
	//	into[ key]= await into[ key]
	//}
	return into
}
export default gets

const seenOpts= new Map()
export function idempotize( ...opts){
	SEEN: for( let seen of seenOpts.keys()){
		if( seen.length!== opts.length){
			continue SEEN
		}
		for( let i in seen){
			if( seen[ i]!== opts[ i]){
				continue SEEN
			}
		}
		// found these opts, return their combined
		return seenOpts.get( seen)
	}

	// no match for these opts, so cache their projected outcome & return
	let combined= {}
	for( let opt of opts){
		for( let i of opt){
			const cur= combined[ i]
			if( /*cur!== null&&*/ cur!== undefined){
				combined[ i]= opt[ i]
			}
		}
	}
	seenOpts.add( opts, combined)
	return combined
}
