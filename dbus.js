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
	const
	  primer= gets({
		dbus: null
	  }, ...opts},
	  ctx= gets({
		
	  }, ...opts)
}
