"use module"
export function Call( iface, method, ...args){
	let i= new Promise( function( resolve, reject){
		function accept( err, names){
			if( err){
				reject( err)
			}else{
				resolve( names)
			}
		}
		Promise.resolve( iface).then( function( iface){
			iface[ method]( ...args, accept)
		})
	})
	return i
}
export default Call
