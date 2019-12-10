"use module"
import Pipe from "async-iter-pipe"

import { gets} from "./opts.js"

export function Signal( ...opts){
	const ctx= await gets({
		bus: null,
		busName: null,
		service: null,
		objectPath: null,
		interfaceName: null,
		iface: null,
		signalName: null
	  }, ...opts)

	let more
	if( !ctx.service){
		more= { service: ctx
			.bus()
			.getService( ctx.busName)
		}
	}
	if( !ctx.iface){
		ctx.iface= await Interface( ...more, ...opts)
	}

	const pipe= new Pipe()
	function accept( err, ...val){
		if( err){
			pipe.drain()
			return
		}
		pipe.push( ...val)
	}
	// TODO: closing?
	// maybe have a cleanup controller on ctx
	ctx.iface.on( ctx.signalName, accept)
	return pipe
}
export default Interface

export function makeSignalName( signalName, ...opts){
	return Signal( ...opts, { signalName})
}
