"use module"
import { process, bus as Bus} from "./config.js"
import Interface from "./interface.js"
import Call from "./call.js"

export async function listNames( opts= {}){
	const
	  bus= (opts.bus|| Bus)( opts),
	  iface= Interface(
		opts.bus,
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
	// up-vert strings to regexps
	busNames= busNames.map( name=> typeof(name)=== "string"? new RegExp( name): name)
	//  build a matcher function to test if a name is a busName
	function matchBusName( name){
		for( const test of busNames){
			if( test.match( name)){
				return true
			}
		}
		return false
	}
	// get the names
	const names= await opts.names|| await listNames( opts)
	// check the names
	return names.filter( matchBusName)
}

export async function main( opts, stdout= ){
	const
		config= makeConfig( opts),
		names= await listNames( config),
		proc= config.process()
	if( proc&& proc.stdout){
		for( let name of names){
			proc.stdout.write( name, "\n")
		}
	}
	return names
}

if( typeof require!== "undefined"&& require.main=== module){
	main()
}
