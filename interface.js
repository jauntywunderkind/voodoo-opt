"use module"
import { bus as Bus} from "./config.js"

export function Interface( bus= Bus(), name, path, iface){
	let o= new Promise( function( resolve, reject){
		function accept( err, dbus){
			if( err){
				reject( err)
			}else{
				resolve( dbus)
			}
		}
		bus
		  .getService( name)
		  .getInterface( path, iface, accept)
	})
	return o
}
export default Interface
