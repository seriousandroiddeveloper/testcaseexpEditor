var unitTestCases = {
		
		'jsonlite': {
							
				'{ title: TestSchema, type: object, properties: { recipient: { type: string }, Subject: { type: string }, Body: { type: string }, Sender: { type: string }, CC: { type: string}, BCC: { type: string} }':{
						 expectedResult : "Expected ',' instead of ''" ,
						 testCase : 'jsonlite',
						 targetReturnType : 'object'
				 	},
			 	
			 	'{ title: TestSchema, type: object, properties: { recipient: { type: string }, Body: { type: string }, Body: { type: string }, Sender: { type: string }, CC: { type: string}, BCC: { type: string} } } }':{
					 	 expectedResult : 'Duplicate key: "Body"' ,
					 	 testCase : 'jsonlite',
					 	 targetReturnType : 'object'
				 	},
			 	
			 	'{': {
					 	 expectedResult : 'Bad object' ,
					 	 testCase : 'jsonlite',
					 	 targetReturnType : 'object'
				 	},
			 	
			 	'[': {
				 		expectedResult : 'Bad array' ,
				 		testCase : 'jsonlite',
				 		targetReturnType : 'object'
				 	},
				 	
			 	'title: TestSchema, type: object, properties: { recipient: { type: string } }': {
				 		expectedResult : 'Syntax error' ,
				 		testCase : 'jsonlite',
				 		targetReturnType : 'object'
				 	}
		},
		
		'schema': {
				'abc': {
					expectedResult : '<ul> <li>&bull;</b>&nbsp;Schema is not valid.</li></ul>',
					testCase : 'schemavalidation',
					targetReturnType : 'undefined'
				},
				
				'{title:test,type:string}': {
					expectedResult : '<ul> <li>&bull;</b>&nbsp;Schema type should be array or object.</li></ul>',
					testCase : 'schemavalidation',
					targetReturnType : 'undefined'
				},
				
				'{title:emailStartOutputSchema,type:object,properties:{length:{type:array,items:{title:emailrecipientobj,type:object,properties:{sdsd:{type:string}}}}}}': {
					expectedResult : "<ul> <li>&bull;</b>&nbsp;'length'  is a keyword, can not be used as 'property name'.</li></ul>",
					testCase : 'schemavalidation',
					targetReturnType : 'undefined'
				},
				
				'{title:some.test,type:string}': {
					expectedResult : "<ul> <li>&bull;</b>&nbsp;Schema title  'some.test' is not valid, special characters are not allowed and it should not start with a Numeral[0-9].</li> <li>&bull;</b>&nbsp;Schema type should be array or object.</li></ul>",
					testCase : 'schemavalidation',
					targetReturnType : 'undefined'
				},
				
				'{title: TestSchema, type: object, projperties: { recipient: { type: string }, Subject: { type: string }, Body: { type: string }, Sender: { type: string }, CC: { type: string}, BCC: { type: string} } }': {
					expectedResult : "<ul> <li>&bull;</b>&nbsp;Object type schema has no Properties.</li></ul>",
					testCase : 'schemavalidation',
					targetReturnType : 'undefined'
				},
				
				'{"title" : "startSchema","type" : "array" }': {
					expectedResult : "<ul> <li>&bull;</b>&nbsp;Array type schema has no items.</li></ul>",
					testCase : 'schemavalidation',
					targetReturnType : 'undefined'
				},
				
				'{"title" : "startSchema","type" : "object" }': {
					expectedResult : "<ul> <li>&bull;</b>&nbsp;Object type schema has no Properties.</li></ul>",
					testCase : 'schemavalidation',
					targetReturnType : 'undefined'
				},
				
				'{"type" : "object","properties" : {"firstName" : {"type" : "string"}}}': {
					expectedResult : "<ul> <li>&bull;</b>&nbsp;Schema title is missing.</li></ul>",
					testCase : 'schemavalidation',
					targetReturnType : 'undefined'
				},
				
				'{"title" : "startSchema","type" : "object","properties" : {"dimensions": {"type": "object","properties": {"length": {"type": "number"},"width": {"type": "number"},"height": {"type": "number"}}, "required": ["length", "width", "height"] }},"required" : [ "firstName", "lastName", "accountNo", "isValid" ]}': {
					expectedResult : "<ul> <li>&bull;</b>&nbsp;'length'  is a keyword, can not be used as 'property name'.</li></ul>",
					testCase : 'schemavalidation',
					targetReturnType : 'undefined'
				},
				
				'{"title" : "startSchema","type" : "object","properties" : {"dimensions@21": {"type": "object","properties": {"size": {"type": "number"},"width": {"type": "number"},"height": {"type": "number"}}, "required": ["size", "width", "height"] }},"required" : [ "firstName", "lastName", "accountNo", "isValid" ]}': {
					expectedResult : "<ul> <li>&bull;</b>&nbsp;Property name  'dimensions@21' is not valid, only alphanumeric values are allowed.</li></ul>",
					testCase : 'schemavalidation',
					targetReturnType : 'undefined'
				},
				
				'{"type" : "object","properties" : {"firstName" : {"type" : "string"}}}': {
					expectedResult : "<ul> <li>&bull;</b>&nbsp;Schema title is missing.</li></ul>",
					testCase : 'schemavalidation',
					targetReturnType : 'undefined'
				},
				
				'{"title" : "startSchema","type" : "object","properties" : {"firstName" : {"type" : "string"},"lastName" : {"type" : "striing"},"accountNo" : {"type" : "number"},"isValid" : {"type" : "boolean"},	"tags": {"type": "array","items": { "type": "string" },"minItems": 1, "uniqueItems": true},"testtags": { "type": "array", "items": {"type": "number"}, "minItems": 1, "uniqueItems": true}, "dimensions": {"type": "object", "properties": { "size": {"type": "number"}, "width": {"type": "number"}, "height": {"type": "number"}},"required": ["length", "width", "height"]}},"required" : [ "firstName", "lastName", "accountNo", "isValid" ]}': {
					expectedResult : "<ul> <li>&bull;</b>&nbsp;Striing is not a valid JSON data type at 'lastName'.</li></ul>",
					testCase : 'schemavalidation',
					targetReturnType : 'undefined'
				},
				
				'{"title" : "startSchema","type" : "object","properties" : {"firstName" : {"type" : "string"},"lastName" : {"type" : "string"},"accountNo" : {"type" : "number"},"isValid" : {"type" : "boolean"},	"tags": {"type": "array","items": { "type": "string" },"minItems": 1, "uniqueItems": true},"testtags": { "type": "array", "items": {"ttype": "number"}, "minItems": 1, "uniqueItems": true}, "dimensions": {"type": "object", "properties": { "size": {"type": "number"}, "width": {"type": "number"}, "height": {"type": "number"}},"required": ["length", "width", "height"]}},"required" : [ "firstName", "lastName", "accountNo", "isValid" ]}': {
					expectedResult : "<ul> <li>&bull;</b>&nbsp;Data type is not defined for array items.</li></ul>",
					testCase : 'schemavalidation',
					targetReturnType : 'undefined'
				},
				
				'{"title" : "startSchema","type" : "object","properties" : {"firstName" : {"type" : "string"},"lastName" : {"type" : "string"},"accountNo" : {},"isValid" : {"type" : "boolean"},	"tags": {"type": "array","items": { "type": "string" },"minItems": 1, "uniqueItems": true},"testtags": { "type": "array", "items": {"type": "number"}, "minItems": 1, "uniqueItems": true}, "dimensions": {"type": "object", "properties": { "size": {"type": "number"}, "width": {"type": "number"}, "height": {"type": "number"}},"required": ["length", "width", "height"]}},"required" : [ "firstName", "lastName", "accountNo", "isValid" ]}': {
					expectedResult : "<ul> <li>&bull;</b>&nbsp;Data type is not defined for property 'accountNo'.</li></ul>",
					testCase : 'schemavalidation',
					targetReturnType : 'undefined'
				},
				
				'{"title" : "start_Schema","type" : "object","properties" : {"firstName" : {"type" : "string"},"lastName" : {"type" : "string"},"accountNo" : {"type" : "number"},"isValid" : {"type" : "boolean"},	"tags": {"type": "array","items": { "type": "string" },"minItems": 1, "uniqueItems": true},"testtags": { "type": "array", "items": {"type": "number"}, "minItems": 1, "uniqueItems": true}, "dimensions": {"type": "object", "properties": { "size": {"type": "number"}, "width": {"type": "number"}, "height": {"type": "number"}},"required": ["length", "width", "height"]}},"required" : [ "firstName", "lastName", "accountNo", "isValid" ]}': {
					expectedResult : "<ul> <li>&bull;</b>&nbsp;Schema title  'start_Schema' is not valid, special characters are not allowed and it should not start with a Numeral[0-9].</li></ul>",
					testCase : 'schemavalidation',
					targetReturnType : 'undefined'
				},
				
				'{"title" : 1234,"type" : "object","properties" : {"firstName" : {"type" : "string"},"lastName" : {"type" : "string"},"accountNo" : {"type" : "number"},"isValid" : {"type" : "boolean"},	"tags": {"type": "array","items": { "type": "string" },"minItems": 1, "uniqueItems": true},"testtags": { "type": "array", "items": {"type": "number"}, "minItems": 1, "uniqueItems": true}, "dimensions": {"type": "object", "properties": { "size": {"type": "number"}, "width": {"type": "number"}, "height": {"type": "number"}},"required": ["length", "width", "height"]}},"required" : [ "firstName", "lastName", "accountNo", "isValid" ]}': {
					expectedResult : "<ul> <li>&bull;</b>&nbsp;'Schema title' can not be of numeric data type.</li></ul>",
					testCase : 'schemavalidation',
					targetReturnType : 'undefined'
				}
				
				
		},
		
		'expressioneditor': {
			'startSchema["firstName"]': {
				expectedResult : 'Expression is not a valid condition expression.',
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["firstName"] == abc': {
				expectedResult : "<ul> <li>&bull; <b> 'abc'</b> is not a valid operand.</li></ul>",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["firstName"] == 9': {
				expectedResult : "<ul> <li>&bull; The operator <b> '=='</b> is undefined/incompatible for the operand types <b>'String'</b> and <b>'Number'</b>.</li></ul>",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["firstName"].concat()': {
				expectedResult : "<ul> <li>&bull; Minimum no of arguments for function <b> 'concat'</b> is <b>[1]</b>.</li></ul>",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["firstName"].concat(true)': {
				expectedResult : "<ul> <li>&bull; Arguments are not valid for <b> 'concat(string1, [string2, ... stringN])'</b>.</li></ul>",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["firstName"].concat("@") == startSchema["firstName"].search(/@/)': {
				expectedResult : "<ul> <li>&bull; The operator <b> '=='</b> is undefined/incompatible for the operand types <b>'String'</b> and <b>'Number'</b>.</li></ul>",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["dimensions"]["size"] ^ startSchema["dimensions"]["height"]': {
				expectedResult : "<ul> <li>&bull; <b> '^'</b> is not a valid operator.</li></ul>",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'Math.max("45", "54") == 54': {
				expectedResult : "<ul> <li>&bull; Arguments are not valid for <b> 'Math.max(int1, [int2, ... intN])'</b>.</li></ul>",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema == true': {
				expectedResult : "<ul> <li>&bull; The operator <b> '=='</b> is undefined/incompatible for the operand types <b>'Object'</b> and <b>'Boolean'</b>.</li></ul>",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'((Math.max(startSchema["lastName"].length,startSchema["firstName"],startSchema["tags"].length) > 4) == false)': {
				expectedResult : "<ul> <li>&bull; Arguments are not valid for <b> 'Math.max(int1, [int2, ... intN])'</b>.</li></ul>",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["tags"].concat(startSchema["testtags"], startSchema["tags"]) == startSchema["firstName"].match(/kkh/)': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["isValid"] == "true"': {
				expectedResult : "<ul> <li>&bull; The operator <b> '=='</b> is undefined/incompatible for the operand types <b>'Boolean'</b> and <b>'String'</b>.</li></ul>",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'Math.max(Math.abs(startSchema["firstName"].charCodeAt(8))) == startSchema["tags"].length': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["firstName"].length==(startSchema["lastName"].concat("2","24").concat("@")).length': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["firstName"].length==(startSchema["lastName"].concat("2","24").concat(@)).length': {
				expectedResult : "<ul> <li>&bull; Unexpected token ILLEGAL.</li></ul>",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["lastName"].substring(1, 5).concat("01-", "global") == "Rick01-global"': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'a || b && c | d ^ e & f == g < h >>> i + j * k': {
				expectedResult : "<ul> <li>&bull; <b> 'a'</b> is not a valid operand.</li> <li>&bull; <b> 'b'</b> is not a valid operand.</li> <li>&bull; <b> 'c'</b> is not a valid operand.</li> <li>&bull; <b> 'd'</b> is not a valid operand.</li> <li>&bull; <b> 'e'</b> is not a valid operand.</li> <li>&bull; <b> 'f'</b> is not a valid operand.</li> <li>&bull; <b> 'g'</b> is not a valid operand.</li> <li>&bull; <b> 'h'</b> is not a valid operand.</li> <li>&bull; <b> 'i'</b> is not a valid operand.</li> <li>&bull; <b> 'j'</b> is not a valid operand.</li> <li>&bull; <b> 'k'</b> is not a valid operand.</li> <li>&bull; <b> '>>>'</b> is not a valid operator.</li> <li>&bull; <b> '&'</b> is not a valid operator.</li> <li>&bull; <b> '^'</b> is not a valid operator.</li> <li>&bull; <b> '|'</b> is not a valid operator.</li></ul>",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["dimensions"]["size"] > startSchema["dimensions"]["height"] == startSchema["isValid"]': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["dimensions"].length == 0': {
				expectedResult : "<ul> <li>&bull; <b> 'length'</b> function cannot be called on <b> 'Object'</b> type.</li></ul>",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
		    'startSchema["dimensions"].charAt(7) == "r"': {
				expectedResult : "<ul> <li>&bull; <b> 'charAt'</b> function cannot be called on <b> 'Object'</b> type.</li></ul>",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
	
			'parseInt(startSchema["lastName"])-parseInt(startSchema["firstName"])': {
				expectedResult : 'OK',
				testCase : 'expressionvalidation',
				targetReturnType : 'number'
			},
			
			'parseInt(startSchema["lastName"]) == parseInt("Kumar")': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["accountNo"].toString() + "01"': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'string'
			},
			
			'Boolean(startSchema["accountNo"]) == true': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["tags"][0] + startSchema["testtags"][0].toString()': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'string'
			},
			
			'JSON.stringify(startSchema).concat("input","schema")': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'string'
			},
			
			'true.toString()': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'string'
			},
			
			'Number(startSchema["isValid"]) + startSchema["accountNo"].toPrecision(startSchema["accountNo"])': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'number'
			},
			
			'JSON.parse(startSchema["lastName"].concat("global","user"))': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'object'
			},
			
			'isNaN(startSchema["dimensions"]["size"])': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["dimensions"]["size"].toExponential() + startSchema["dimensions"]["width"].toPrecision(101)': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'number'
			},
			
			'Boolean(startSchema["accountNo"]).valueOf()': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'Boolean(parseInt(startSchema["accountNo"].toFixed(2)))': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'parseFloat(JSON.stringify(startSchema["dimensions"]))': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'number'
			},
			
			'startSchema["tags"][0].concat(startSchema["firstName"])':{
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'string'
			},
			
			'["a","b","c"].concat(startSchema["tags"])': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'array'
			},
			
			'startSchema["tags"].concat(["a","b","c"])': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'array'
			},
			
			'JSON.stringify(startSchema) + JSON.stringify(startSchema["dimensions"]).toLowerCase()': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'string'
			},
			
			'1+2+3+startSchema["testtags"][0]': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'number'
			},
			
			'"first"+"second"+"last"+startSchema["tags"][0]': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'string'
			},
				
			'[1,2,3].concat([5],[6]) == startSchema["testtags"]': {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["tags"][startSchema["firstName"].concat("global", "user",1)] == JSON.stringify(startSchema)': {
				expectedResult : "<ul> <li>&bull; Array variable is not of Number type.</li></ul>",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["accountNo"].toString().substring(0, startSchema["dimensions"]["size"]) + startSchema["firstName"].charAt(1) == startSchema["tags"][1]':{
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["accountNo"].toString().substring(0, startSchema["dimensions"]["size"]) + startSchema["firstName"].charCodeAt(1) == startSchema["testtags"][1]':	{
				expectedResult : "<ul> <li>&bull; The operator <b> '+'</b> is undefined/incompatible for the operand types <b>'String'</b> and <b>'Number'</b>.</li></ul>",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["isValid"].valueOf() == false':{
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'Number(isFinite(startSchema["accountNo"])) < startSchema["dimensions"]["size"]+startSchema["dimensions"]["width"]+startSchema["dimensions"]["height"]':{
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'isFinite(startSchema["accountNo"]) < startSchema["dimensions"]["size"]+startSchema["dimensions"]["width"]+startSchema["dimensions"]["height"]' :{
				expectedResult : "<ul> <li>&bull; The operator <b> '<'</b> is undefined/incompatible for the operand types <b>'Boolean'</b> and <b>'Number'</b>.</li></ul>",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["tags"][0] == startSchema["tags"].toString()':{
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["isValid"].valueOf()':{
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'parseFloat("UserId") - parseInt("UserId".substring(0, 2)) == parseFloat("NewUserId")' : {
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'parseFloat("UserId") - UserId.substring(0, 2)' :{
				expectedResult : "<ul> <li>&bull; <b> 'UserId'</b> is not a valid operand.</li></ul>",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'Boolean(startSchema["accountNo"]).valueOf() == false' :{
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'startSchema["testtags"].concat(["first","last"], ["1"])[0]' :{
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'string'
			}, 
			
			'startSchema == JSON.parse("This is a string!")' :{
				expectedResult : "<ul> <li>&bull; The operator <b> '=='</b> is undefined/incompatible for the operand types <b>'Object'</b> and <b>'Object'</b>.</li></ul>",
				testCase : 'expressionvalidation',
				targetReturnType : 'object'
			}, 
			
			'parseInt(startSchema["firstName"].substring(0, 2) + startSchema["lastName"].substring(0,2) + "-" + "010")':{
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'number'
			}, 
			
			'JSON.stringify(startSchema) + startSchema["isValid"].toString() + startSchema["id"].toString() + "this is the complete string"':{
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'string'
			}, 
			
			'startSchema["firstName"].toLowerCase().concat("01","-","02").match(/ki/) ':{
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'array'
			}, 
			
			'isNaN(parseInt(startSchema["lastName"].charAt(1)).toPrecision(1))' :{
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			}, 
			
			'startSchema["isValid"] && Boolean(startSchema["accountNo"]) && true.valueOf()':{
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			}, 
			
			'Math.max(Number(true),parseInt(startSchema["firstName"]).toPrecision(3)) - startSchema["dimensions"]["size"] == startSchema["dimensions"]["width"] + startSchema["dimensions"]["height"]':{
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			},
			
			'!(JSON.stringify(startSchema["dimensions"]) == startSchema["firstName"])' :{
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			}, 
			
			'!startSchema["isValid"].toString()' :{
				expectedResult : "<ul> <li>&bull; The operator <b> '!'</b> is undefined/incompatible for the operand type <b>'string'</b></li></ul>",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			}, 
			
			'Boolean(startSchema["accountNo"]) && Boolean(startSchema["dimensions"]["width"]+startSchema["dimensions"]["height"])':{
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'boolean'
			}, 
			
			'(startSchema["firstName"] == startSchema["lastName"]).toString()':{
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'string'
			}, 
			
			'startSchema["tags"].concat(["This is a new array"], startSchema["tags"])[0]':{
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'string'
			}, 
			
			'isFinite(parseInt("string".concat("new", "string"))).toString()':{
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'string'
			}, 
			
			'!(startSchema["lastName"]==startSchema["firstName"]).toString()':{
				expectedResult : "<ul> <li>&bull; The operator <b> '!'</b> is undefined/incompatible for the operand type <b>'string'</b></li></ul>",
				testCase : 'expressionvalidation',
				targetReturnType : 'string'
			},
			
			'(!(startSchema["lastName"]==startSchema["firstName"])).toString()':{
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'string'
			},
			
			'((startSchema["lastName"]+startSchema["firstName"])).toString()':{
				expectedResult : "<ul> <li>&bull; <b> 'toString'</b> function cannot be called on <b> 'String'</b> type.</li></ul>",
				testCase : 'expressionvalidation',
				targetReturnType : 'string'
			},
			
			'(startSchema["isValid"]&&Boolean(1)).toString()':{
				expectedResult : "OK",
				testCase : 'expressionvalidation',
				targetReturnType : 'string'
			},
			
			}
		
};