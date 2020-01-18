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

	for( let i= opts.length- 1; i>= 0; --i){
		let opt= opts[ i]
		doTry( opt)
		if( value!== undefined){
			return value
		}
	}
	doTry( defaults)
	return value
}
export {
	get as Get
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
export {
	has as Has
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
		keys= Object.keys( picks|| (hadThis&& this))

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
	return into
}
export {
	gets as default,
	gets as Gets
}
