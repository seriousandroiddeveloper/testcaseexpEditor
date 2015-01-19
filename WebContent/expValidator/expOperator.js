var expOperator = {

	'+' : {
		operator : '+',
		operatorASCII : '+',
		type : 'arithmetic',
		rules : [ {
			left : 'number',
			right : 'number',
			returnType : 'number'
		}, {
			left : 'string',
			right : 'string',
			returnType : 'string'
		}, {
			specialtype : 'unary',
			right : 'number',
			returnType : 'number'
		} ]

	},
	'-' : {
		operator : '-',
		operatorASCII : '-',
		type : 'arithmetic',
		rules : [ {
			left : 'number',
			right : 'number',
			returnType : 'number'
		}, {
			specialtype : 'unary',
			right : 'number',
			returnType : 'number'
		} ]

	},
	'*' : {
		operator : '*',
		operatorASCII : '*',
		type : 'arithmetic',
		rules : [{left : 'number',
			right : 'number',
			returnType : 'number'}]
	},
	'/' : {
		operator : '/',
		operatorASCII : '/',
		type : 'arithmetic',
		rules : [{left : 'number',
			right : 'number',
			returnType : 'number'}]
	},
	'%' : {
		operator : '%',
		operatorASCII : '%',
		type : 'arithmetic',
		rules : [{left : 'number',
			right : 'number',
			returnType : 'number'}]
	},

	'&&' : {
		operator : '&&',
		operatorASCII : '&&',
		type : 'logical',
		rules : [{left : 'boolean',
			right : 'boolean',
			returnType : 'boolean'}]
	},
	'||' : {
		operator : '||',
		operatorASCII : '||',
		type : 'logical',
		rules : [{left : 'boolean',
			right : 'boolean',
			returnType : 'boolean'}]
	},
	'==' : {
		operator : '==',
		operatorASCII : '==',
		type : 'logical',
		rules : [ {
			left : 'number',
			right : 'number',
			returnType : 'boolean'
		}, {
			left : 'nullObject',
			right : 'number',
			returnType : 'boolean'
		}, {
			left : 'number',
			right : 'nullObject',
			returnType : 'boolean'
		}, {
			left : 'string',
			right : 'nullObject',
			returnType : 'boolean'
		}, {
			left : 'nullObject',
			right : 'string',
			returnType : 'boolean'
		}, {
			left : 'string',
			right : 'string',
			returnType : 'boolean'
		}, {
			left : 'object',
			right : 'nullObject',
			returnType : 'boolean'
		} , {
			left : 'nullObject',
			right : 'object',
			returnType : 'boolean'
		}, {
			left : 'boolean',
			right : 'boolean',
			returnType : 'boolean'
		}, {
			left : 'boolean',
			right : 'nullObject',
			returnType : 'boolean'
		}, {
			left : 'nullObject',
			right : 'boolean',
			returnType : 'boolean'
		}, {
			left : 'nullObject',
			right : 'array',
			returnType : 'boolean'
		}, {
			left : 'array',
			right : 'nullObject',
			returnType : 'boolean'
		}, {
			left : 'array',
			right : 'array',
			returnType : 'boolean'
		}]
	},

	'!=' : {
		operator : '==',
		operatorASCII : '==',
		type : 'logical',
		type : 'arithmetic',
		rules : [ {
			left : 'number',
			right : 'number',
			returnType : 'boolean'
		}, {
			left : 'nullObject',
			right : 'number',
			returnType : 'boolean'
		}, {
			left : 'number',
			right : 'nullObject',
			returnType : 'boolean'
		}, {
			left : 'string',
			right : 'nullObject',
			returnType : 'boolean'
		}, {
			left : 'nullObject',
			right : 'string',
			returnType : 'boolean'
		}, {
			left : 'string',
			right : 'string',
			returnType : 'boolean'
		}, {
			left : 'object',
			right : 'nullObject',
			returnType : 'boolean'
		} , {
			left : 'nullObject',
			right : 'object',
			returnType : 'boolean'
		}, {
			left : 'boolean',
			right : 'boolean',
			returnType : 'boolean'
		}, {
			left : 'boolean',
			right : 'nullObject',
			returnType : 'boolean'
		}, {
			left : 'nullObject',
			right : 'boolean',
			returnType : 'boolean'
		}, {
			left : 'nullObject',
			right : 'array',
			returnType : 'boolean'
		}, {
			left : 'array',
			right : 'nullObject',
			returnType : 'boolean'
		}]
	},

	'<' : {
		operator : '<',
		operatorASCII : '&lt;',
		type : 'arithmetic',
		rules : [{left : 'number',
			right : 'number',
			returnType : 'boolean'}]
	},
	'>' : {
		operator : '>',
		operatorASCII : '&gt;',
		type : 'arithmetic',
		rules : [{left : 'number',
			right : 'number',
			returnType : 'boolean'}]
	},

	'<=' : {
		operator : '<=',
		operatorASCII : '&lt;=',
		type : 'arithmetic',
		rules : [{left : 'number',
			right : 'number',
			returnType : 'boolean'}]

	},
	'>=' : {
		operator : '>=',
		operatorASCII : '&gt;=',
		type : 'arithmetic',
		rules : [{left : 'number',
			right : 'number',
			returnType : 'boolean'}]
	},

	'!' : {
		operator : '!',
		operatorASCII : '!',
		type : 'unary',
		rules : [ {
			specialtype : 'unary',
			right : 'boolean',
			returnType : 'boolean'
		} ]

	},
	'~' : {
		operator : '~',
		operatorASCII : '~',
		type : 'unary',
		rules : [ {
			specialtype : 'unary',
			right : 'number',
			returnType : 'number'
		} ]

	},
	'(' : {
		operator : '(',
		operatorASCII : '(',
		type : 'display',
		rules : []
	},
	')' : {
		operator : ')',
		operatorASCII : ')',
		type : 'display',
		rules : []
	}

};
