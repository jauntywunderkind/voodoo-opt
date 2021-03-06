"use module"
import constantCase from "constant-case"
import minimist from "minimist"
import xdg from "xdg-basedir"

let warn= false

export const warned= Symbol.for( "voodoo-opt:config:warned")

export function conf( key, self, opts){
	let value
	if( self&& self!== globalThis){
		value= self[ key]
	}
	let hadValue= !!value
	if( value=== undefined){
		value= defaults[ key]
	}
	RUN: if( value&& value.call){
		if( opts&& opts.run=== false){
			break RUN
		}
		value= value.call( self)
	}
	return value
}

export const defaults= Object.freeze({
	globalThis(){
		return globalThis
	},
	process( globalThis= conf( "globalThis", this)){
		return globalThis.process
	},
	argv( process= conf( "process", this)){
		return process.argv
	},
	args( argv= conf( "argv", this)){
		return minimist( argv.slice( 2))
	},
	env( process= conf( "process", this)){
		return process.env
	},
	appName( env= conf( "env", this)){
		return env&& env.APP_NAME|| "voodoo-opt"
	},
	appNameEnv( appName= env( "appName", this)){
		return constantCase( appName)
	},
	stdout( process= conf( "process", this)){
		return process.stdout
	},
	stdin( process= conf( "process", this)){
		return process.stdin
	},
	async lines( readable= conf( "stdin", this)){
		const AiSplit= (await import( "async-iter-split")).default
		return AiSplit( readable)
	},
	expression( args= conf( "args", this)){
		const expr= args.expression|| args.e
		if( expr){
			return eval( `function expression( a, b, c, d, e, f, g, h){ ${expr} }`)
		}
	},
	warnedSymbol: Symbol.for("dbus-starter:config:warned"),
	warn( process= conf( "process", this), warnedSymbol= conf( "warnedSymbol", this)){
		if( process[ warnedSymbol]){
			return
		}
		Object.defineProperty( process, warned, {
			value: true
		})
		process.on("uncaughtException", console.error)
		process.on("unhandledRejection", console.error)
	},
	xdg,
	TRIPWIRE: function(){
		console.error("Tripwire; should not invoke config items until needed")
		process.exit( 1)
	}
})
export {
	defaults as Defaults
}

export function makeDefaults( ...more){
	return Object.assign( {}, defaults, ...more)
}

export let singleton
export default singleton= makeDefaults()
export function setSingleton( singleton_){
	singleton= singleton_
}

export function _lateLoad( name, module){
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
