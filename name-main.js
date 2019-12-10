"use module"
import { listNames} from "./name.js"
import { nameAcquired, nameLost, nameOwnerChanged} from "./dbus.js"

export function main( ...opts){
	const ctx= gets({
		dbus: null,
		args: null,
		stdout: null,
		ifs: null
	  }, ...opts},

	console.log( ctx.args)
	process.exit( 1)
	const
	  ss= !!(ctx.args.singleshot|| ctx.args.s),
	  tail= !!(ctx.args.tail|| ctx.args.t)
	if( !tail){
		let names= (async function(){
			const names= await listNames( ...opts, ctx)
			ctx.stdout.write( names.join("\n"))
			return names
		})()
	}
	if( !ss){
		const
		  add= !!ctx.args.add,
		  remove= !!ctx.args.remove,
		  replace= !!ctx.args.replace,
		  focus= add|| remove|| replace
		function make( signal, op){
			return async function(){
				for( let [ name, old, new_] of nameAcquired( ...opts, ctx){
					if( focus&& !replace){
						stdout.write( `${name}${ctx.ifs}`)
					}else{
						stdout.write( `{"op":"${op}","path":"/${name}","value":"${new_|| name}"}${ctx.ifs}`)
					}
				}
			}
		}
		if( !focus|| add){
			make( nameAcquired, "add")()
		}
		if( !focus|| remove){
			make( nameLost, "remove")()
		}
		if( !focus|| replace){
			make( nameOwnerChanged, "replace")()
		}
	}
}
export default main

if( typeof process!== "undefined"&& `file://${process.argv[ 1]`=== import.meta.url`){
	main()
}
