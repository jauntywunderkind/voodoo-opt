"use module"
import Call from "./call.js"
import Interface from "./interface.js"
import introspect from "./introspect.js"
import { get, gets} from "./opts.js"

export async function findInterface( ...opts){
	
}

export async function *findNames( opts= {}){
	// find names we are looking for
	let busNames= opts&& opts.busNames&& opts.busNames()
	if( !busNames){
		busNames= config.busNames()
	}
	if( !busNames){
		throw new Error( "No bus-names specified to search for")
	}
	// arrayitize
	if( typeof busNames=== "string"|| busNames instanceof RegExp|| busNames instanceof Function){
		busNames= [ busNames]
	}
	// get the names
	const names= await opts.names|| await listNames( opts)
	for( let seeking of busNames){
		if( typeof( seeking)=== "string"){
			seeking= new RegExp( target)
		}
		if( seeking instanceof RegExp){
			const seeking_= seeking
			seeking= name=> seeking_.match( name)
		}
		const results= names.filter( seeking)
		if( results.length){
			yield results
		}
	}
}

export async function findName( opts= {}){
	const value= await filterNames( opts).next()
	if( !value.done){
		return value.value
	}
}

export async function main( ...opts){
	await get("warn", ...opts) // runs warn
	const
	  stdout= await get( "stdout", ...opts),
	  names= await listNames( config, ...opts)
	if( stdout){
		for( let name of names){
			stdout.write( name)
			stdout.write( "\n")
		}
	}
	return names
}

if( typeof process!== "undefined"&& `file://${process.argv[ 1]}`=== import.meta.url){
	main()
}

