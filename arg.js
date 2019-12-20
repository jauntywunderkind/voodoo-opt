"use module"
export function arg( name, flag= name, shortFlag, ord, default_){
	const
		nameFlag= `${name}Flag`,
		nameShort= `${name}Short`,
		nameOrd= `${name}Ord`,
		nameDefault= `${name}Default`,
		hasOrd= ord!== null&& ord!== undefined,
		hasDefault= default_!== null&& default_!== undefined
	if( hasOrd){ 
		ord= Number.parseInt( ord)
	}
	return {
		...( flag&& {[ nameFlag]: flag}),
		...( shortFlag&& {[ nameShort]: shortFlag}),
		...( hasOrd&& {[ nameOrd]: ord}),
		...( hasDefault&& {[ nameDefault]: default_}),
		[ name]: function( args= this&& this.args){
			if( args instanceof Function){
				args= args()
			}
			if( !args){
				throw new Error("No args available")
			}
			return (
				args[ '_'][ this[ nameOrd]]||
				args[ this[ nameFlag]]||
				args[ this[ nameShort]]||
				this[ nameDefault]
			)
		}
	}
}
export default arg
