"use module"
import config from "./config.js"
import Interface from "./interface.js"
import Call from "./call.js"

export async function listNames( opts= {}){
	const
	  bus= (opts.bus|| Bus)( opts),
	  iface= Interface(
		opts,
		"org.freedesktop.DBus",
		"/org/freedesktop/DBus",
		"org.freedesktop.DBus")
	return Call( iface, "ListNames")
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

const config_= config
export async function main( config= config_){
	config.warn()
	const
		stdout= config.stdout(),
		names= await listNames( config)
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
