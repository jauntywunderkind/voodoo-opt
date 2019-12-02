"use module"
import { process} from "./args.js"
import Interface from "./interface.js"
import Call from "./call.js"

export async function listNames( opts= {}){
	const iface= Interface(
		opts.bus,
		"org.freedesktop.DBus",
		"/org/freedesktop/DBus",
		"org.freedesktop.DBus")
	return Call( iface, "ListNames")
}

export async function filterNames( filter, opts= {}){
	let regexp= filter
	if( typeof( regexp)=== "string"){
		regexp= new RegExp( filter)
	}
	const unfiltered= await opts.names|| await listNames( opts)
	return unfiltered.filter( name=> regexp.match( name))[ 0]
}

export async function main( opts){
	const
	  args= makeArgs({ proc: process})
	  names= await listNames( )
	if( proc&& proc.stdout){
		proc.stdout.write( names.join( "\n"))
	}
	return names
}

if( typeof require!== "undefined"&& require.main=== module){
	main()
}
