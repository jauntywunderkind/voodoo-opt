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
	console.log( "IF", ctx)
	let o= new Promise( function( resolve, reject){
		function accept( err, dbus){
			if( err){
				reject( err)
			}else{
				resolve( dbus)
			}
		}
		const
			busName= ctx.busName instanceof Function? ctx.busName(): ctx.busName,
			objectPath= ctx.objectPath instanceof Function? ctx.objectPath(): ctx.objectPath,
			interfaceName= ctx.interfaceName instanceof Function? ctx.interfaceName(): ctx.interfaceName
		console.log({ busName, objectPath, interfaceName, "checksum": "updog"})
		ctx.bus()
		  .getService( busName)
		  .getInterface( objectPath, interfaceName, accept)
	})
	return o
}
export default Interface
