"use module"
/** @module dbus
* a module for the org.freedesktop.DBus
*/

export function DBus( ...opts){
	const iface= await Interface({
		busName: "org.freedesktop.DBus",
		objectPath: "/org/freedesktop/DBus",
		interfaceName: "org.freedesktop.DBus"
	}, ...opts)
	return iface
}

export async function listNames( ...opts){
	const iface= get( "iface", ...opts)
	if( !iface){
		let iface= await DBus( ...opts)
		opts= opts.push({ iface})
	}
	return Call({
		iface,
		method: "ListNames"
	}, ...opts)
}

export async function* nameAcquired( ...opts){
}

export async function* nameLost( ...opts){
}

export async function* nameOwnerChanged( ...opts){
}
