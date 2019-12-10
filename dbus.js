"use module"
/** @module dbus
* a module for the org.freedesktop.DBus
*/
import { has} from "./opts.js"
import { makeSignalName} from "./signal.js"

export const iface= {
	busName: "org.freedesktop.DBus",
	objectPath: "/org/freedesktop/DBus",
	interfaceName: "org.freedesktop.DBus"
  },
  iface_= iface


export function DBus( ...opts){
	const iface= await Interface( iface_, ...opts)
	return iface
}
export const dbus= DBus

export async function listNames( ...opts){
	let more

	// build an org.freedesktop.DBus iface if we don't have one
	const hasIface= has( "iface", ...opts)
	// TODO: check if iface may be wrong too
	if( !hasIface){
		let iface= await DBus( iface_, ...opts)
		more= { iface}
	}

	//
	return Call({
		method: "ListNames"
	}, more, ...opts)
}

export async function* nameAcquired( ...opts){
	return makeSignalName( "nameAcquired", ...opts, iface_)
}

export async function* nameLost( ...opts){
	return makeSignalName( "nameLost", ...opts, iface_)
}

export async function* nameOwnerChanged( ...opts){
	return makeSignalName( "nameChanged", ...opts, iface_)
}

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
