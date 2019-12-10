"use module"
import { gets} from "./opts.js"

export async function Interface( ...opts){
	const ctx= await gets({
		bus: null,
		busName: null,
		objectPath: null,
		interfaceName: null
	  }, ...opts)
	let o= new Promise( function( resolve, reject){
		function accept( err, dbus){
			if( err){
				reject( err)
			}else{
				resolve( dbus)
			}
		}
		ctx.bus()
		  .getService( ctx.busName)
		  .getInterface( ctx.objectPath, ctx.interfaceName, accept)
	})
	return o
}
export default Interface
