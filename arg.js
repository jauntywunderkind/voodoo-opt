"use module"
export function arg( name, flag= name, shortFlag, ord, default_){
	const
		nameFlag= `${name}Flag`,
		nameShort= `${name}Short`,
		nameOrd= `${name}Ord`,
		nameDefault= `${name}Default}`,
		hasOrd= !!ord|| ord=== 0
	if( hasOrd){ 
		ord= Number.parseInt( ord)
	}
	return {
		...( flag&& {[ nameFlag]: flag}),
		...( shortFlag&& {[ nameShort]: shortFlag}),
		...( hasOrd&& {[ nameOrd]: ord}),
		[ name]: function( args= this.args){
			if( args instanceof Function){
				args= args()
			}
			return
				args[ '_'][ this[ nameOrd]]||
				args[ this[ nameFlag]]||
				args[ this[ nameShort]]||
				args[ this[ nameDefault]]
		}
	}
}
export default arg
