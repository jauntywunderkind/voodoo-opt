"use module"
import { bus as Bus} from "./config.js"

export function Interface( busOrOpt= Bus(), name, path, iface){
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
