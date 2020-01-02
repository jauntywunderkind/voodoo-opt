"use module"
import { defaults} from "./config.js"

export const
	NoAwait= Symbol.for( "voodoo-opt:no-await"),
	NoExecute= Symbol.for( "voodoo-opt:no-execute"),
	symbol= {
		NoAwait,
		NoExecute
	}
export {
	symbol as Symbol
}

export function get( key, ...opts){
	let value
	const doTry= opt=> {
		// redundant, please delete
		if( value!== undefined){
			return
		}
		if( opt instanceof Function&& !opt[ NoExecute]){
			// having serious reservations about letting opts be fn's
			// haven't quite deleted yet, but much inclined to
			opt= opt.call( this)
		}
		if( opt=== undefined){
			return
		}

		// pick this slot
		value= opt[ key]
		if( value=== undefined){
			return
		}
		// call
		if( value instanceof Function&& !value[ NoExecute]){
			value= value.call( this)
		}
	}

	for( let i= opts.length- 1; value=== undefined&& i>= 0; --i){
		let opt= opts[ i]
		doTry( opt)
		if( value!== undefined){
			return value
		}
	}
	doTry( defaults)
	return value
}

export function has( key, ...opts){
	for( let i of opts){
		const opt= opts[ i]|| []
		if( opt[ key]!== undefined){
			return true
		}
	}
	return false
}

export async function gets( picks, ...opts){
	// this code does not insure dependencies have been get()'ed :(
	// partial work-around by asking in into in the needed order. still inter-order issues.

	const
		hadThis= this!== undefined&& this!== globalThis,
		// record of non-picks to un-set latter
		unasked= new Set(),
		// use "this" context if it is not the global context
		into= hadThis? this: {},
		// these are the outcomes we are looking for
		keys= Object.keys( picks)

	// load from lowest prio to highest
	// lowest prio: defaults
	for( let key in defaults){
		if( into[ key]!== undefined){
			continue
		}

		// clean up this default latter
		unasked.add( key)
		//into[ key]= get.call( into, key)
		into[ key]= defaults[ key]
	}

	//// do resolve args, and soon
	//// this one off hack is probably not good enough.
	//const argsKey= keys.indexOf( "args")
	//if( argsKey=== -1){
	//	keys.unshift( "args")
	//}else if( argsKey!== 0){
	//	keys.splice( 0, argsKey, "args")
	//}

	//if( into.args){
	//}

	// medium prio: picks, into
	// higher priority: ...opts
	for( let key of keys){
		unasked.delete( key)

		// TODO sooo defaults are already in into to satisfy dependencies
		// but picks are supposed to be higher prio
		let value= get.call( into, key, picks, into, ...opts)
		if( value&& value.then&& !value[ NoAwait]){
			value= await value
		}
		into[ key]= value
	}

	// clean up old keys
	for( let key of unasked||[]){
		delete into[ key]
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
