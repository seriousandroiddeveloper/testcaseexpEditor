QUnit.module('jsonlite parse Test Cases');
var jsonliteCases = unitTestCases.jsonlite;
for(cases in jsonliteCases){
 	var schemaCase = cases;
	test('jsonlite Case', function () {deepEqual(typeof jsonlite.parse(schemaCase), 'object',"");
	});
}
/*test('Case 1', function () {
	deepEqual(typeof jsonlite.parse(schemas.s1), 'object',"");
});
test('Case 2', function () {
	deepEqual(typeof jsonlite.parse(schemas.s5),'object',"");
});
test('Case 3', function () {
	deepEqual(typeof jsonlite.parse(schemas.s3),'object',"");
});
test('Case 4', function () {
	deepEqual(typeof jsonlite.parse(schemas.s2),'object',"");
});
test('Case 5', function () {
	deepEqual(typeof jsonlite.parse(schemas.s4),'object',"");
});*/


/*QUnit.module('Validation Schema Test Cases');
test('Case 1', function () {
	var result = validateSchemaChk(schemas.s6);
	if(result != 'OK'){
		throws(function(){throw new Error("Error in schema");}, result, "");
	}else{
		equal(result,'OK',"Schema is correct");
	}
});
test('Case 2', function () {
	var result = validateSchemaChk(schemas.s7);
	if(result != 'OK'){
		throws(function(){throw new Error("Error in schema");}, "<ul> <li>&bull;</b>&nbsp;Schema type should be array or object.</li></ul>", "");
	}else{
		equal(result,'OK',"Schema is correct");
	}
});
test('Case 3', function () {
	var result = validateSchemaChk(schemas.s8);
	if(result != 'OK'){
		throws(function(){throw new Error("Error in schema");}, result, "");
	}else{
		equal(result,'OK',"Schema is correct");
	}
});
test('Case 4', function () {	
	var result = validateSchemaChk(schemas.s9);
	if(result != 'OK'){
		throws(function(){throw new Error("Error in schema");}, result, "");
	}else{
		equal(result,'OK',"Schema is correct");
	}
});
test('Case 5', function () {
	var result = validateSchemaChk(schemas.s10);
	if(result != 'OK'){
		throws(function(){throw new Error("Error in schema");}, result, "");
	}else{
		equal(result,'OK',"Schema is correct");
	}
});*/

function runTests(funcName, code, result){
	var actual = funcName;
	if(result == actual){
		console.log('case passed');
	}else{
		console.log('Case failed:Not matched');
	}
	
}


function validateSchemaChk(schema){
	var returnVal;
	var exceptionMsg;
	try{
		validateSchema(jsonlite.parse(schemas.s10));
		returnVal = 'OK';
	}catch(exception){
		exceptionMsg = exception.message;
		returnVal = exceptionMsg;
	}
	console.log('output:::'+returnVal);
	return returnVal;
}
