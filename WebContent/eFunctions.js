var eFunctions =
 {
	functionArray : [],
	
	pushFunctions : function(){
		this.functionArray = [];
		/* Bug 616 3 outof 3 
		 * comment: new attributes are added(functionDisplayTemplate) in the object in functionArray[] 
		 * Data Mapper: Dot should be prefixed with the function.
		 * Start Change*/
		
		this.functionArray.push([
		                         
		    //Start String Function
		    {
				functionName : 'String Functions',
				functionTemplate : 'String Functions',
				operandType : 'Header',
				returnType : 'Header',
				minAndMaxArgument : [0,0],
				argumentTypes : [],
				
				toolTip : 'String Functions'
			},
			{
				functionName : 'length',
				functionTemplate : 'length',
				functionDisplayTemplate : '.length',
				operandType : 'string',
				returnType : 'number',
				minAndMaxArgument : [0,0],
				argumentTypes : [],
				
				toolTip : 'The length property represents the length of a string.'
			},
			{
				functionName : 'substring',
				functionTemplate : 'substring(int, [int])',
				functionDisplayTemplate : '.substring(int, [int])',
				operandType : 'string',
				returnType : 'string',
				minAndMaxArgument : [1, 2],
				argumentTypes : ['number', 'number'],
				
				toolTip : 'The substring() method returns a subset of a string between\n' +
				  		  'two specified indices - fromIndex and toIndex. If fromIndex or\n' +
				  		  'toIndex is less than 0, it is treated as 0 only.\n'+
				  		  'Argument1 - An integer between 0 and the length of the string\n' +
				  		  'representing the fromIndex.\n' +
				  		  'Argument2(optional) - An integer between 0 and the length of the\n' +
				  		  'string representing the toIndex. If not given, it extracts the\n' +
				  		  'rest of the string.'
			},
			{
				functionName : 'substr',
				functionTemplate : 'substr(int, [int])',
				functionDisplayTemplate : '.substr(int, [int])',
				operandType : 'string',
				returnType : 'string',
				minAndMaxArgument : [1, 2],
				argumentTypes : ['number', 'number'],
				
				toolTip : 'The substr() method returns the characters in a string beginning\n' +
						  'at the specified location through the specified number of characters.\n'+
						  'If number of characters is 0 or negative an empty string is returned.\n'+
						  'Argument1 - An integer representing the location at which to begin\n' +
						  'extracting characters.\n' +
						  'Argument2(optional) - The number of characters to extract. If not\n '+
						  'given, it extracts the rest of the string.'
			},
			{
				functionName : 'charAt',
				functionTemplate : 'charAt(int)',
				functionDisplayTemplate : '.charAt(int)',
				operandType : 'string',
				returnType : 'string',
				minAndMaxArgument : [1, 1],
				argumentTypes : ['number'],
				
				toolTip : 'The charAt() method returns the character at the specified position from\n' +
						  'the string. An Empty string is returned, if the character is not found.\n' +
						  'Argument - An integer between 0 and less than the length of the string\n' +
						  'representing the position of the character.'
			},
			{
				functionName : 'charCodeAt',
				functionTemplate : 'charCodeAt(int)',
				functionDisplayTemplate : '.charCodeAt(int)',
				operandType : 'string',
				returnType : 'number',
				minAndMaxArgument : [1, 1],
				argumentTypes : ['number'],
				
				toolTip : 'The charCodeAt() method returns the numeric unicode value of the\n' +
						  'character at the given index.\n '+
						  'Argument - An integer greater than or equal to 0 and less than the\n' +
						  'length of the string.'
			},
			{
				functionName : 'concat',
				functionTemplate : 'concat(string1, [string2, ... stringN])',
				functionDisplayTemplate : '.concat(string1, [string2, ... stringN])',
				operandType : 'string',
				returnType : 'string',
				minAndMaxArgument : ['N'],
				argumentTypes : ['string'],
				
				toolTip : 'The concat() method combines the text of one or more strings or numbers\n' +
						  'and returns a new string.\n' +
						  'Arguments - Strings or numbers to be concatenated to the calling string.'
			},
			{
				functionName : 'indexOf',
				functionTemplate : 'indexOf(string, [int])',
				functionDisplayTemplate : '.indexOf(string, [int])',
				operandType : 'string',
				returnType : 'number',
				minAndMaxArgument : [1,2],
				argumentTypes : ['string', 'number'],
				
				toolTip : 'The indexOf() method returns the index of the first occurence of the\n'+
					      'specified value in the calling string or returns -1, if the value is not found.\n' +
						  'Argument1 - A string representing the value to search for.\n' +
						  'Argument2(optional) - The location within the calling string to start the\n' +
						  'search from. It can be any integer between 0 and the length of the\n' +
						  'string. The default value is 0.'
			},
			{
				functionName : 'lastIndexOf',
				functionTemplate : 'lastIndexOf(string, [int])',
				functionDisplayTemplate : '.lastIndexOf(string, [int])',
				operandType : 'string',
				returnType : 'number',
				minAndMaxArgument : [1,2],
				argumentTypes : ['string', 'number'],
				
				toolTip : 'The lastIndexOf() method returns the index of the last occurence of the\n'+
				          'specified value in the calling string or returns -1, if the value is not found.\n' +
						  'Argument1 - A string representing the value to search for.\n' +
						  'Argument2(optional) - The location within the calling string to start the\n' +
						  'search from. It is searched backward. The default value is length of the string.'
			},
			
			/*{
				functionName : 'localeCompare',
				functionTemplate : 'localeCompare(compareString [, locales [, options]])',
				operandType : 'string',
				returnType : 'number',
				minAndMaxArgument : [1,3],
				argumentTypes : ['string', 'string', 'object'], //Array of String need to be support
				
				toolTip : 'The localeCompare() method returns a number indicating whether a reference\n' +
						  'string comes before or after or is the same as the given string in sort order.'
			},*/
			{
				functionName : 'match',
				functionTemplate : 'match(regexp)',
				functionDisplayTemplate : '.match(regexp)',
				operandType : 'string',
				returnType : 'array',
				minAndMaxArgument : [1,1],
				argumentTypes : ['string'], 
				
				toolTip : 'The match() method retrieves the matches when matching a string against a\n' +
				          'regular expression. It returns an array containing the matches.\n' + 
				          'Argument - The value to match in the form of regular expression.'
			},
			{
				functionName : 'replace',
				functionTemplate : 'replace(regexp, string)',
				functionDisplayTemplate : '.replace(regexp, string)',
				operandType : 'string',
				returnType : 'string',
				minAndMaxArgument : [2,2],
				argumentTypes : ['string', 'string'], 
				
				toolTip : 'The replace() method returns a new string with some or all matches of a\n' +
						  'pattern replaced by a replacement. The pattern can be a string or a\n' +
						  'regular expression.\n'+
						  'Argument1 - A string or regular expression pattern that will be replaced\n'+
						  'with a new value.\n'+
						  'Argument2 - A string value to replace the pattern with.'
			},
			{
				functionName : 'search',
				functionTemplate : 'search(regexp)',
				functionDisplayTemplate : '.search(regexp)',
				operandType : 'string',
				returnType : 'number',
				minAndMaxArgument : [1,1],
				argumentTypes : ['string'], 
				
				toolTip : 'The search() method searches a string for a specified value, and\n'+
				          'returns the position of the match. The search value can be a string\n'+
				          'or a regular expression. It returns -1, if no match is found.\n'+
				          'Argument - A string or a regular expression that will be searched in\n'+
						  'the calling string.'				          
			},
			{
				functionName : 'slice',
				functionTemplate : 'slice(int, [int])',
				functionDisplayTemplate : '.slice(int, [int])',
				operandType : 'string',
				returnType : 'string',
				minAndMaxArgument : [1,2],
				argumentTypes : ['number','number'], 
				
				toolTip : 'The slice() method extracts a section of a string and returns a new string.\n'+
				           'Argument1 - An integer value representing the position to start the extraction.\n'+
				           'Argument2(optional) - An integer value representing postion up to where to\n'+
				           'end the extraction. If not given, it considers all characters from start of\n'+
				           'extraction to the end of string.'
			},
			{
				functionName : 'split',
				functionTemplate : 'split([string], [int])',
				functionDisplayTemplate : '.split([string], [int])',
				operandType : 'string',
				returnType : 'array',
				minAndMaxArgument : [0,2],
				argumentTypes : ['string','number'], 
				
				toolTip : 'The split() method splits a string into an array of strings by separating\n' +
						  'the string into substrings.\n'+
						  'Argument1(optional) - The string value that will be used for splitting the string.\n'+
						  'Argument2(optional) - An integer value to specify the number of values to split.'
			},
			{
				functionName : 'toLocaleLowerCase',
				functionTemplate : 'toLocaleLowerCase()',
				functionDisplayTemplate : '.toLocaleLowerCase()',
				operandType : 'string',
				returnType : 'string',
				minAndMaxArgument : [0],
				argumentTypes : [], 
				
				toolTip : 'The toLocaleLowerCase() method returns the calling string value converted\n' + 
						  'to lower case, according to any locale-specific case mappings.'
			},
			{
				functionName : 'toLocaleUpperCase',
				functionTemplate : 'toLocaleUpperCase()',
				functionDisplayTemplate : '.toLocaleUpperCase()',
				operandType : 'string',
				returnType : 'string',
				minAndMaxArgument : [0],
				argumentTypes : [], 
				
				toolTip : 'The toLocaleUpperCase() method returns the calling string value converted\n' + 
						  'to upper case, according to any locale-specific case mappings.'
			},
			{
				functionName : 'toLowerCase',
				functionTemplate : 'toLowerCase()',
				functionDisplayTemplate : '.toLowerCase()',
				operandType : 'string',
				returnType : 'string',
				minAndMaxArgument : [0],
				argumentTypes : [], 
				
				toolTip : 'The toLowerCase() method returns the calling string value converted to\n' + 
				          'lowercase.'
			},
			{
				functionName : 'toUpperCase',
				functionTemplate : 'toUpperCase()',
				functionDisplayTemplate : '.toUpperCase()',
				operandType : 'string',
				returnType : 'string',
				minAndMaxArgument : [0],
				argumentTypes : [], 
				
				toolTip : 'The toUpperCase() method returns the calling string value converted to\n' + 
				          'uppercase.'
			},
			{
				functionName : 'parse',
				functionTemplate : 'JSON.parse(string)',
				functionDisplayTemplate : 'JSON.parse(string)',
				operandType : 'Math',
				returnType : 'object',
				minAndMaxArgument : [1,1],
				argumentTypes : ['string'], 
				
				toolTip : 'This method converts a string of JSON text into an object.\n'+
						  'Argument - The string to parse as JSON.'
			},
			{
				functionName : 'stringify',
				functionTemplate : 'JSON.stringify(obj)',
				functionDisplayTemplate : 'JSON.stringify(obj)',
				operandType : 'Math',
				returnType : 'string',
				minAndMaxArgument : [1,1],
				argumentTypes : ['object'], 
				
				toolTip : 'This method converts an object in to a JSON text and stores\n'+ 
					      'that JSON text in a string.\n'+
						  'Argument - An object value that will be converted.'
			},
			
			//End String Function
			/*
			/* Bug 643 
			/*Start Change
			//Start Object Function
			 {
				functionName : 'Object Functions',
				functionTemplate : 'Object Functions',
				operandType : 'Header',
				returnType : 'Header',
				minAndMaxArgument : [0,0],
				argumentTypes : [],
				
				toolTip : 'Object Functions'
			},
			{
				functionName : 'toString',
				functionTemplate : 'toString()',
				functionDisplayTemplate : '.toString()',
				operandType : 'object',
				returnType : 'string',
				minAndMaxArgument : [0],
				argumentTypes : [], 
				
				toolTip : 'The toString() method returns a string representing the specified object.'
			},
			{
				functionName : 'valueOf',
				functionTemplate : 'valueOf()',
				functionDisplayTemplate : '.valueOf()',
				operandType : 'object',
				returnType : 'string',
				minAndMaxArgument : [0],
				argumentTypes : [], 
				
				toolTip : 'The valueOf() method returns the primitive value of a String object.'
			},
			
			//End Object Function
			* End Change
			*/
			//Start Math Function
			 {
				functionName : 'Math Functions',
				functionTemplate : 'Math Functions',
				operandType : 'Header',
				returnType : 'Header',
				minAndMaxArgument : [0,0],
				argumentTypes : [],
				
				toolTip : 'Math Functions'
			},
			{
				functionName : 'abs',
				functionTemplate : 'Math.abs(int)',
				functionDisplayTemplate : 'Math.abs(int)',
				operandType : 'Math',
				returnType : 'number',
				minAndMaxArgument : [1,1],
				argumentTypes : ['number'], 
				
				toolTip : 'This method returns the absolute value of the number.'
			},
			{
				functionName : 'ceil',
				functionTemplate : 'Math.ceil(int)',
				functionDisplayTemplate : 'Math.ceil(int)',
				operandType : 'Math',
				returnType : 'number',
				minAndMaxArgument : [1,1],
				argumentTypes : ['number'], 
				
				toolTip : 'This method returns the smallest integer greater than or equal to the number.'
			},
			{
				functionName : 'floor',
				functionTemplate : 'Math.floor(int)',
				functionDisplayTemplate : 'Math.floor(int)',
				operandType : 'Math',
				returnType : 'number',
				minAndMaxArgument : [1,1],
				argumentTypes : ['number'], 
				
				toolTip : 'This method returns the largest integer less than or equal to the number.'
			},
			{
				functionName : 'max',
				functionTemplate : 'Math.max(int1, [int2, ... intN])',
				functionDisplayTemplate : 'Math.max(int1, [int2, ... intN])',
				operandType : 'Math',
				returnType : 'number',
				minAndMaxArgument : ['N'],
				argumentTypes : ['number'], 
				
				toolTip : 'This method returns the largest of one or more numbers.'
			},
			{
				functionName : 'min',
				functionTemplate : 'Math.min(int1, [int2, ... intN])',
				functionDisplayTemplate : 'Math.min(int1, [int2, ... intN])',
				operandType : 'Math',
				returnType : 'number',
				minAndMaxArgument : ['N'],
				argumentTypes : ['number'], 
				
				toolTip : 'This method returns the smallest of one or more numbers.'
			},
			{
				functionName : 'pow',
				functionTemplate : 'Math.pow(int, int)',
				functionDisplayTemplate : 'Math.pow(int, int)',
				operandType : 'Math',
				returnType : 'number',
				minAndMaxArgument : [2,2],
				argumentTypes : ['number', 'number'], 
				
				toolTip : 'This method returns the base to the exponent power, that is, base^exponent.'
			},
			//End Math Function
			
			//Start Array Function
			{
				functionName : 'Array Functions',
				functionTemplate : 'Array Functions',
				operandType : 'Header',
				returnType : 'Header',
				minAndMaxArgument : [0,0],
				argumentTypes : [],
				
				toolTip : 'Array Functions'
			},
			{
				functionName : 'length',
				functionTemplate : 'length',
				functionDisplayTemplate : '.length',
				operandType : 'array',
				returnType : 'number',
				minAndMaxArgument : [0,0],
				argumentTypes : [],
				
				toolTip : 'The length property represents the length of an array.'
			},
			/*New Array Function Added*/
			{
				functionName : 'concat',
				functionTemplate : 'concat(array1,[array2, ... arrayN])',
				functionDisplayTemplate : '.concat(array1, [array2, ... arrayN])',
				operandType : 'array',
				returnType : 'array',
				minAndMaxArgument : ['N'],
				argumentTypes : ['array'],
				
				toolTip : 'The concat() method combines one or more arrays\n' +
						  'and returns a new array.\n' +
						  'Arguments - Arrays to concatenate to the calling array.'
			},
			{
				functionName : 'indexOf',
				functionTemplate : 'indexOf(string, [int])',
				functionDisplayTemplate : '.indexOf(string, [int])',
				operandType : 'array',
				returnType : 'number',
				minAndMaxArgument : [1,2],
				argumentTypes : ['string', 'number'],
				
				toolTip : 'The indexOf() method returns first occurrence of the specified value\n' +
						  'within the calling array or returns -1, if the value is not found.\n' +
						  'Argument1 - A string representing the value to search for.\n' +
						  'Argument2(optional) - An integer value representing the location within\n'+
						  'the calling array to start the search from. The default value is 0.'
			},
			{
				functionName : 'slice',
				functionTemplate : 'slice(int[, int])',
				functionDisplayTemplate : '.slice(int[, int])',
				operandType : 'array',
				returnType : 'array',
				minAndMaxArgument : [1,2],
				argumentTypes : ['number','number'],
				
				toolTip : 'The slice() method extracts a portion of an array and returns a new array object.\n'+
						  'Argument1 - An integer to specify the start position of the extraction.\n'+
						  'Argument2(optional) - An integer value to specify the end position of the extraction.\n'+
						  'If not given, all elements from the start position and to the end of the array will be selected.'
			},
			{
				functionName : 'toString',
				functionTemplate : 'toString()',
				functionDisplayTemplate : '.toString()',
				operandType : 'array',
				returnType : 'string',
				minAndMaxArgument : [0],
				argumentTypes : [],				
				toolTip : 'The toString() method converts the array to a string.'
			}
			/*New Array Function Added*/
			//End Array Function
			//Start Extra Function
			,{
				functionName : 'Extra Functions',
				functionTemplate : 'Extra Functions',
				operandType : 'Header',
				returnType : 'Header',
				minAndMaxArgument : [0,0],
				argumentTypes : [],
				
				toolTip : 'Extra Functions'
			},
			{
				functionName : 'parseInt',
				functionTemplate : 'parseInt(string)',
				functionDisplayTemplate : 'parseInt(string)',
				operandType : 'global',
				returnType : 'number',
				minAndMaxArgument : [1,1],
				argumentTypes : ['string'],
				
				toolTip : 'The parseInt() method parses a string value and returns an integer.\n'+
				  		  'Argument - A string value to parse.'
			},
			{
				functionName : 'parseFloat',
				functionTemplate : 'parseFloat(string)',
				functionDisplayTemplate : 'parseFloat(string)',
				operandType : 'global',
				returnType : 'number',
				minAndMaxArgument : [1,1],
				argumentTypes : ['string'],
				
				toolTip : 'The parseFloat() method parses a string argument and returns a floating\n'+
				          'point number.\n'+
				          'Argument - A string value to parse.'
			},
			{
				functionName : 'isNaN',
				functionTemplate : 'isNaN(int)',
				functionDisplayTemplate : 'isNaN(int)',
				operandType : 'global',
				returnType : 'boolean',
				minAndMaxArgument : [1,1],
				argumentTypes : ['number'],
				
				toolTip : 'The isNaN() method checks whether a value is not a numeric value.\n'+
				          'If the value is not a number or cannot be converted to a number,\n'+
				          'it returns true. Otherwise it returns false.\n'+
				          'Argument - A value to be tested for NaN.'
			}
			//End Extra Function
			//Start Number Function 
			,{
				functionName : 'Number Functions',
				functionTemplate : 'Number Functions',
				operandType : 'Header',
				returnType : 'Header',
				minAndMaxArgument : [0,0],
				argumentTypes : [],
				
				toolTip : 'Number Functions'
			},
			{
				functionName : 'toFixed',
				functionTemplate : 'toFixed(int)',
				functionDisplayTemplate : '.toFixed(int)',
				operandType : 'number',
				returnType : 'string',
				minAndMaxArgument : [1,1],
				argumentTypes : ['number'],
				
				toolTip : 'The toFixed() method converts a number into a string, keeping a\n'+
				          'specified number of decimals.\n'+
				          'Argument - The number of digits to appear after the decimal point.'
			},
			{
				functionName : 'toString',
				functionTemplate : 'toString()',
				functionDisplayTemplate : '.toString()',
				operandType : 'number',
				returnType : 'string',
				minAndMaxArgument : [0],
				argumentTypes : [],
				
				toolTip : 'The toString() method converts a number to a string.'
			},
			{
				functionName : 'valueOf',
				functionTemplate : 'valueOf()',
				functionDisplayTemplate : '.valueOf()',
				operandType : 'number',
				returnType : 'number',
				minAndMaxArgument : [0],
				argumentTypes : [],
				
				toolTip : 'The valueOf() method returns the primitive value of a number object.'
			},
			{
				functionName : 'toExponential',
				functionTemplate : 'toExponential()',
				functionDisplayTemplate : '.toExponential()',
				operandType : 'number',
				returnType : 'number',
				minAndMaxArgument : [0],
				argumentTypes : [],
				
				toolTip : 'The toExponential() method converts a number into an exponential notation.'
			},
			{
				functionName : 'toPrecision',
				functionTemplate : 'toPrecision(int)',
				functionDisplayTemplate : '.toPrecision(int)',
				operandType : 'number',
				returnType : 'number',
				minAndMaxArgument : [1,1],
				argumentTypes : ['number'],
				
				toolTip : 'The toPrecision() method formats a number to a specified length.\n'+
				          'Argument - An integer specifying the number of significant digits.'
			},
			{
				functionName : 'isFinite',
				functionTemplate : 'isFinite(int)',
				functionDisplayTemplate : 'isFinite(int)',
				operandType : 'global',
				returnType : 'boolean',
				minAndMaxArgument : [1,1],
				argumentTypes : ['number'],
				
				toolTip : 'The isFinite() method determines whether the passed value is a finite number.\n'+
				          'Argument - Any numeric value.'
			},
			{
				functionName : 'Number',
				functionTemplate : 'Number(boolean)',
				functionDisplayTemplate : 'Number(boolean)',
				operandType : 'global',
				returnType : 'number',
				minAndMaxArgument : [1,1],
				argumentTypes : ['boolean'],
				
				toolTip : 'The Number() method converts the boolean object argument to a number.\n'+
				          'Argument - The boolean value to be converted to number.'
			}
			//End Number Function
			//Start Boolean Function 
			,{
				functionName : 'Boolean Functions',
				functionTemplate : 'Boolean Functions',
				operandType : 'Header',
				returnType : 'Header',
				minAndMaxArgument : [0,0],
				argumentTypes : [],
				
				toolTip : 'Boolean Functions'
			},
			{
				functionName : 'toString',
				functionTemplate : 'toString()',
				functionDisplayTemplate : '.toString()',
				operandType : 'boolean',
				returnType : 'string',
				minAndMaxArgument : [0],
				argumentTypes : [],
				
				toolTip : 'The toString() method converts a boolean value to a string.'
			},
			{
				functionName : 'valueOf',
				functionTemplate : 'valueOf()',
				functionDisplayTemplate : '.valueOf()',
				operandType : 'boolean',
				returnType : 'boolean',
				minAndMaxArgument : [0],
				argumentTypes : [],
				
				toolTip : 'The valueOf() method returns the primitive value of a boolean.'
			},
			{
				functionName : 'Boolean',
				functionTemplate : 'Boolean(int)',
				functionDisplayTemplate : 'Boolean(int)',
				operandType : 'global',
				returnType : 'boolean',
				minAndMaxArgument : [1,1],
				argumentTypes : ['number'],
				
				toolTip : 'The Boolean() returns a boolean value for the passed integer value.\n'+
				          'Argument - An integer value to be returned as boolean value.'
			}
			//End Boolean Function 
		]);
		
		/*End Changes*/
	}

};
