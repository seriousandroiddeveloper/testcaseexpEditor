var failures = 0,successes=0,total = 0;
function TestFailedError(expected, actual) {
    this.expected = expected;
    this.actual = actual;
}
TestFailedError.prototype = new Error();

function runTests(){
	var subcases,expected,testCase, returnType;
    for (cases in unitTestCases) {
        if (unitTestCases.hasOwnProperty(cases)) {
        	subcases = unitTestCases[cases];
            for (source in subcases) {
                if (subcases.hasOwnProperty(source)) {
                    expected = subcases[source].expectedResult;
                    testCase = subcases[source].testCase;
                    returnType = subcases[source].targetReturnType; 
                    total += 1; 
                    try {
                        runTest(testCase, source, expected,returnType);
                        successes += 1;
                        success(source, total);
                    } catch (e) {
                        failures += 1;
                        failure(source, e.expected, e.actual, total);
                    }
                }
            }
        }
    }
    if (failures > 0) {
        setText(document.getElementById('status'),'Total: '+ total + ' tests. Passed: ' +
        		successes + ',  Failures: ' + failures);
    } else {
        setText(document.getElementById('status'), total + ' tests.  Passed: ' +
        		successes + ',  Failures: ' + failures);
    }
	
}

function runTest(testCase, code, expected, returnType){
	if(testCase == 'jsonlite'){
		validateJsonliteParser(code, expected);
	}else if(testCase == 'schemavalidation'){
		validateSchemaChk(code, expected);
	}else if(testCase == 'expressionvalidation'){
		validateExpression(code, expected, returnType);
	}
}

function validateJsonliteParser(schema, expected){
	var actual;
	try{
		jsonlite.parse(schema);
		actual = 'OK';
	}catch(exception){
		actual = exception.message;
	 }
	 if (expected !== actual) {
		 throw new TestFailedError(expected, actual);
	  }
}

function validateSchemaChk(schema, expected){
	var actual;
	try{
		validateSchema(jsonlite.parse(schema));
		actual = 'OK';
	}catch(exception){
		actual = exception.message;
	 }
	 if (expected !== actual) {
		 throw new TestFailedError(expected, actual);
	 }
}

function validateExpression(expression, expected, returnType){
	var actual;
	var schema = getSchema();
	var sourcemap = new mHashTable();
	expParseSchema.createMapFromSchema({"schemaDetail" : {'schema' : schema, 'title' : 'Title'}, "isDataVariable": false}, null, '', sourcemap, false);
	var validatorInstance = new expValidatorInstance(sourcemap, {"functionList" : eFunctions.functionArray , "iOperator" : expOperator });
	try{
		if(validatorInstance.returnTypeOfExp(expression) == returnType){;
			actual = 'OK';
		}else{
			actual = 'Expression is not a valid condition expression.';
		}
	}catch(exception){
		actual = validatorInstance.createError(exception.message);
	 }
	 if (expected !== actual) {
		 throw new TestFailedError(expected, actual);
	 }
}


