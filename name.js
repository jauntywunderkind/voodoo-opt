"use module"
import { makeConfig} from "./config.js"
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

export async function filterNames( opts= {}){
	// find names we are looking for
	let busNames= opts&& opts.busNames()
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
			return results
		}
	}
}

export async function main( opts){
	const config= makeConfig( opts)
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

if( typeof require!== "undefined"&& require.main=== module){
	main()
}
