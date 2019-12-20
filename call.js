"use module"
import { gets} from "./opts.js"

export async function Call( ...opts){
	const ctx= await gets({ 
		args: undefined,
		iface: undefined,
		method: undefined,
		callArgs: undefined 
	  }, ...opts, { callArgs: []})
	let i= new Promise( async function( resolve, reject){
		function accept( err, names){
			if( err){
				reject( err)
			}else{
				resolve( names)
			}
		}
		return ctx.iface[ ctx.method]( ...ctx.callArgs, accept)
	})
	return i
}
export default Call
