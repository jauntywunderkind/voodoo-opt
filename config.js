"use module"
import dbus from "dbus-native"
import minimist from "minimist"
const { sessionBus, systemBus}= dbus

let warn= false

export const defaults= Object.freeze({
	process( global= this&& this!== globalThis&& this.globalThis? this.globalThis(): globalThis){
		return global.process
	},
	args( argv= this&& this!== globalThis? this.process().argv: globalThis.process.argv){
		return minimist( argv.splice( 2))
	},
	env( env= this&& this!== globalThis? this.process().env: globalThis.process.env){
		return env
	},
	isSession( args= this&& this!== globalThis? this.args(): args(), defaultBus= this&& this.defaultBus|| defaults.defaultBus){
		if( args.system){
			return false
		}
		return args.session|| defaultBus=== "session"
	},
	isSystem( args= this&& this!== globalThis? this.args(): args(), defaultBus= this&& this.defaultBus|| defaults.defaultBus){
		if( args.system){
			return true
		}
		return !args.session|| defaultBus=== "system"
	},
	defaultBus: "session",
	bus( isSession= this&& this!== globalThis? this.isSession(): isSession()){
		return isSession? sessionBus(): systemBus()
	},
	busNames( env= this&& this!== globalThis? this.env(): env()){ // it'd be nice to make this programmable but without functions.callee no way
		return [ env.DBUS_NAME]
	},
	stdout( process= this&& this!== globalThis? this.process(): globalThis.process){
		return process.stdout
	},
	warn( process= this&& this!== globalThis? this.process(): globalThis.process){
		if( !warn){
			warn= true
			process.on("uncaughtException", console.error)
			process.on("unhandledRejection", console.error)
		}
	},
	listNames: lateLoad( "listNames", "./names.js")
})

let singleton_
export function singleton(){
	if( !singleton_){
		singleton_= { ...defaults}
	}
	return singleton_
}
export default singleton
export function setSingleton( singleton){
	singleton_= singleton
}

function lateLoad( name, module){
	const wrapper= {[ name]: async function(){
		let item= fn.item
		if( !item){
			if( !fn.loading){
				fn.loading= import( name).then( function( mod){
					fn.loading= null
					return fn.item= (mod[ name]|| mod.default[ name])
				})
			}
			item= await fn.loading
		}
		return item
	  }},
	  fn= wrapper[ name]
	return fn
}

export async function get( name, ...opts){
	let value
	async function doTry( opt){
		if( value!== undefined){
			return
		}
		if( opt instanceof Function){
			opt= opt.call( this)
		}
		if( opt=== undefined){
			return
		}
		value= opt[ name]
		if( value=== undefined){
			return
		}
		if( value instanceof Function){
			value= value.call( this)
		}
		if( value&& value.then){
			value= await value
		}
	}

	for( let i= 0; value=== undefined&& i< opts.length; ++i){
		let opt= opts[ i]
		await doTry( opt)
	}
	await doTry( defaults)
	return value
}

export async function gets( into, ...opts){
	const keys= Object.keys( into)
	// bring in defaults
	for( let i in defaults){
		if( into[ i]){
			continue
		}
		into[ i]= defaults[ i]
	}

	// begin getting every ask
	for( let key of keys){
		if( into[ key]){
			continue
		}
		into[ key]= get.call( into, key, ...opts)
	}
	// resolve every ask
	for( let key of keys){
		into[ key]= await into[ key]
	}
	return into
}
