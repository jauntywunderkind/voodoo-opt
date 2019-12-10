"use module"
/** @module dbus
* a module for the org.freedesktop.DBus
*/
import { has} from "./config.js"

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
	let more
	const ctx= await gets({
		bus: null,
		...iface_,
		service: null,
		signalName: null
	})
	
	if( !ctx.service){
		more= { service: ctx
			.bus()
			.getService( ctx.busName)
		}
	}

	if( !ctx.iface){
		ctx.iface= await Interface( ...more, ...opts)
		more= {
		}
	}

	return Signal( ...more, ...opts, ctx)
}

export async function* nameLost( ...opts){
}

export async function* nameOwnerChanged( ...opts){
}
