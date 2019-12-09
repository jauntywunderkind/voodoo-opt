"use module"
import { bus, pathName}
import { listNames} from "./names.js"

export async function introspect( opts= {}){
	if( !opts){
		if( !path){
			opts= name
			name= opts.name
		}else{
			opts= path
		}
		path= opts.path
	}
	const
	  bus= opts.bus&& opts.bus()|| config.bus()
	  iface= Interface(
		opts,
		name,
		path,
		"org.freedesktop.DBus.Introspectable.Introspect")
	return Call( iface, "Introspect")
}
export default introspect
