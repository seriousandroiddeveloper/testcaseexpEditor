expValidatorInstance.errorMessages = //designerErrors;

{
		LEFTNRIGHTDATAMISMATCH : 'Left and Right data types do not match.',
		INVALIDIDENTIFIER : '<b> \'%%\'</b> is not a valid operand.' ,
		INVALIDOPERAND : '<b> \'%%\'</b> is not a valid operand.',
	    /* Start Change : WorkFlow : 948*/
		//OPERATORMISMATCH : '<b> \'%%\'</b> operator cannot be applied on <b>\'%%\'</b> and <b>\'%%\'</b>.',
		//OPERATORMISMATCH : '<b> \'%%\'</b> value cannot be passed in  <b>\'%%\'</b>.',
		OPERATORMISMATCH : 'The operator <b> \'%%\'</b> is undefined/incompatible for the operand types <b>\'%%\'</b> and <b>\'%%\'</b>.',
		/* End Change : WorkFlow : 948*/
		MINARGUMENTS : 'Minimum no of arguments for function <b> \'%%\'</b> is <b>[%%]</b>.',
		MAXARGUMENTS : 'Maximum no of arguments for function <b> \'%%\'</b> is <b>[%%]</b>.',
		INVALIDARGUMENTS : 'Arguments are not valid for <b> \'%%\'</b>.',
		FUNCTIONMISMATCH : '<b> \'%%\'</b> function cannot be called on <b> \'%%\'</b> type.',
		FUNCTARGUMENTMISMATCH : 'Function <b> \'%%\'</b> requires <b>[%%]</b> arguments.',
		INVALID : 'Expression is not a valid condition expression.',

		INVALID_SYNTAX : '<b>%%</b> is not a valid operand.',
		INVALIDSYNTAX : 'Syntax is not correct.',
	    OPERATOR_NOT_ALLOWED: 'Operators are not allowed.',
		INVALID_OPERATOR : '<b> \'%%\'</b> is not a valid operator.',
		INVALIDARRAYVARIABLE : 'Array variable is not of Number type.',
		INVALIDVARIABLE : 'Index value can be used with arrays only.',
		INVALID_OPERAND_IN_UNARY : 'The operator <b> \'%%\'</b> is undefined/incompatible for the operand type <b>\'%%\'</b>'
};

function mUtilCheckNaturalNum(n) {
    return n >= 0 && Math.floor(n) === +n;
}