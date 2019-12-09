"use module"
import { gets} from "./config.js"

export async function Call( ...opts){
	const ctx= await gets({ 
		iface: null,
		method: null,
		callArgs: null
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
