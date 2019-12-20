"use module"
import { gets} from "./opts.js"

export async function Interface( ...opts){
	const ctx= await gets({
		args: undefined,	
		bus: undefined,
		busName: undefined,
		objectPath: undefined,
		interfaceName: undefined 
	  }, ...opts)
	let o= new Promise( function( resolve, reject){
		function accept( err, dbus){
			if( err){
				reject( err)
			}else{
				resolve( dbus)
			}
		}
		ctx.bus
		  .getService( ctx.busName)
		  .getInterface( ctx.objectPath, ctx.interfaceName, accept)
	})
	return o
}
export default Interface
