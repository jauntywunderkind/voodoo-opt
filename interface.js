"use module"
import { bus as Bus} from "./config.js"

export function Interface( ...opts){
	let ctx= await gets({
		bus: null,
		busName: null,
		objectPath: null,
		"iface": null
	}, ...opts)


	  ct
	  bus= get( "bus", ...opts),
	  busName= get( "busName", ...opts),
	  objectPath= get( "
busOrOpt= Bus(), name, path, iface){
	const bus= get( 
	if( busOrOpt.bus){
		busOrOpt= busOrOpt.bus()
	}
	let o= new Promise( function( resolve, reject){
		function accept( err, dbus){
			if( err){
				reject( err)
			}else{
				resolve( dbus)
			}
		}
		busOrOpt
		  .getService( name)
		  .getInterface( path, iface, accept)
	})
	return o
}
export default Interface
