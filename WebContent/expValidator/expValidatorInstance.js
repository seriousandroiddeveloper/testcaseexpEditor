/**
 * Creates an instance of expValidatorUtil which contain sourceMap initialized. It also call init() method.
 *
 * @constructor
 * @this {expValidatorInstance}
 * @param {mHashTable} Hash map contain whose key is variablePath and value is Data type.
 * @param {Object} {'functionList' : functionlist, 'iOperator' : operator rules}.
 */

function expValidatorInstance(sourceMap, option){
	this.init(option);
	this.sourceMap = sourceMap;
	
};

expValidatorInstance.prototype.sourceMap = new mHashTable();
expValidatorInstance.prototype.eIdentifier = '';
expValidatorInstance.prototype.eStringFunctionDetailsMap = new mHashTable();
expValidatorInstance.prototype.eMathFunctionDetailsMap = new mHashTable();
expValidatorInstance.prototype.eObjectFunctionDetailsMap = new mHashTable();
expValidatorInstance.prototype.eArrayFunctionDetailsMap = new mHashTable();
expValidatorInstance.prototype.eNumberFunctionDetailsMap = new mHashTable();
expValidatorInstance.prototype.eBooleanFunctionDetailsMap = new mHashTable();
expValidatorInstance.prototype.eArrayFunction = null;
expValidatorInstance.prototype.iOperator = null;
expValidatorInstance.prototype.arrayMemberExpInExpText = null;
    /*Start : Added for validator Error messages*/
expValidatorInstance.prototype.eArrayErrorMsgs = null;
    /*End : Added for validator Error messages*/

expValidatorInstance.prototype.eGlobalFunctionDetailsMap = new mHashTable();
/**Start Changes : 2769 Bug fix: Cannot de-reference arrays in Data Transformation dialog*/
expValidatorInstance.prototype.dataTypeofArrayofObject = null;
/**End Changes : 2769 Bug fix: Cannot de-reference arrays in Data Transformation dialog*/
/**
 * It is called during initialization of expValidatorUtil object.
 * 
 * @this {expValidatorInstance}
 * 
 */
expValidatorInstance.prototype.init = function(option) {
	var expValidatorInstanceLocal = this;
	expValidatorInstanceLocal.sourceMap.clear();
	expValidatorInstanceLocal.eStringFunctionDetailsMap.clear();
	expValidatorInstanceLocal.eMathFunctionDetailsMap.clear();
	expValidatorInstanceLocal.eObjectFunctionDetailsMap.clear();
	expValidatorInstanceLocal.eArrayFunctionDetailsMap.clear();
	expValidatorInstanceLocal.eGlobalFunctionDetailsMap.clear();
	expValidatorInstanceLocal.eNumberFunctionDetailsMap.clear();
	expValidatorInstanceLocal.eBooleanFunctionDetailsMap.clear();
	expValidatorInstanceLocal.iOperator = null;
	expValidatorInstanceLocal.eArrayFunction = null;
	expValidatorInstanceLocal.arrayMemberExpInExpText = [];
	/* Start Change : WorkFlow : 948*/
	expValidatorInstanceLocal.eArrayErrorMsgs = [];
    /* End Change : WorkFlow : 948*/
	if(option.functionList != null || option.functionList != undefined){
		expValidatorInstanceLocal.eArrayFunction = option.functionList;
		expValidatorInstanceLocal.pushFunctionDetails();
	}
	if(option.iOperator != null || option.iOperator != undefined){
		expValidatorInstanceLocal.iOperator = option.iOperator;
	}
	/**Start Changes : 2769 Bug fix: Cannot de-reference arrays in Data Transformation dialog*/
	expValidatorInstanceLocal.dataTypeofArrayofObject = null;
	/**End Changes : 2769 Bug fix: Cannot de-reference arrays in Data Transformation dialog*/
};


/**
 * Returns AST(Abstract syntax tree) object, for invalid expression it return null .  
 *
 * @this {expValidatorInstance}
 * @param {String} expressionText The desired expression.
 * @return {Object}  AST(Abstract syntax tree)
 */
expValidatorInstance.prototype.getAst = function(expressionText) {
    /* Start Change : WorkFlow : 948*/
	var nxExpValidatorLocal = this;
	var ast = null;
	/* End Change : WorkFlow : 948*/
	try {
	/* Start Change : WorkFlow : 948*/
		//return esprimaInstance.parseExpressionToAST(expressionText);
		ast =  esprimaInstance.parseExpressionToAST(expressionText);
	/* End Change : WorkFlow : 948*/
	} catch (e) {
        /* Start Change : WorkFlow : 948*/
		//return null;
		//nxExpValidatorLocal.eArrayErrorMsgs.push(e.description+".");
         throw{
			message:[e.description],
			messageType:"Syntax error in expression."
		};
		/* End Change : WorkFlow : 948*/
            
	}
     return ast;

};

/**
 * It process AST and returns the resultant data type of ast.  
 *
 * @this {expValidatorInstance}
 * @param {Object} Input AST.
 * @return {String} data type of expression
 */
expValidatorInstance.prototype.returnTypeOfAst = function(astObj){
	var expValidatorInstanceLocal = this;
	try{
		return expValidatorInstanceLocal.processAst(astObj);
	}catch(e){
       
    /* Start Change : WorkFlow : 948*/
		nxExpValidatorLocal.eArrayErrorMsgs.push(e);
    /* End Change : WorkFlow : 948*/
	}
};

/**
 * Returns the resultant data type of expression, for invalid expression it return null.  
 *
 * @this {expValidatorInstance}
 * @param {String} expressionText The desired expression.
 * @return {String} data type of expression
 */
expValidatorInstance.prototype.returnTypeOfExp = function(expressionText, returnNull) {
	var expValidatorInstanceLocal = this;
	var returnType = null;
	var objAST = expValidatorInstanceLocal.getAst(expressionText);
	if ( objAST != null) {
	/* Start Change : WorkFlow : 948*/
		//return expValidatorInstanceLocal.processAst(objAST);
		returnType =  expValidatorInstanceLocal.processAst(objAST);
		if(returnType != undefined){
			return returnType;
		}else{
			 if (returnNull == undefined)
		        expValidatorInstanceLocal.throwError();
		    else
		        return null;
		}
	} else {
		expValidatorInstanceLocal.throwError();
		/* End Change : WorkFlow : 948*/
	}
};

/**
 * Returns data type from AST(Abstract syntax tree) object.  
 *
 * @this {expValidatorInstance}
 * @param {Object} AST(Abstract syntax tree).
 * @return {string} resultant data type of AST.
 */
expValidatorInstance.prototype.processAst = function(objAst) {
	var expValidatorInstanceLocal = this;
	var returnType = null;
	if (objAst.type == expValidatorInstance.token.LOGICALEXP || objAst.type == expValidatorInstance.token.BINARYEXP){
		if(objAst.type == expValidatorInstance.token.BINARYEXP && objAst.right.value != undefined && objAst.operator == '/' && objAst.right.value === 0){
			expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstance.errorMessages.EXPVAL_CANNOT_DIVIDE_BY_ZERO);
			returnType = null;
		}else{
			returnType = expValidatorInstanceLocal.compareExp(expValidatorInstanceLocal.processAst(objAst.left), expValidatorInstanceLocal.processAst(objAst.right), objAst.operator);
		}
       /* if(returnType == undefined){
			expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstance.errorMessages.LEFTNRIGHTDATAMISMATCH);
		}*/
	} else if (objAst.type == expValidatorInstance.token.CALLEXP) {
		if (objAst.callee.type == expValidatorInstance.token.IDENTIFER) {
			if (expValidatorInstanceLocal.eGlobalFunctionDetailsMap.hasItem(objAst.callee.name)) {
				var functionDetail = expValidatorInstanceLocal.eGlobalFunctionDetailsMap.getItem(objAst.callee.name);
				returnType = expValidatorInstanceLocal.processFunctionDetail(functionDetail, objAst.arguments);
			}else{
				expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.FUNCTIONMISMATCH,[objAst.callee.name,toTitleCase('global')])); 	
			}
		} else if (objAst.callee.type == expValidatorInstance.token.MEMBREXP) {
			returnType = expValidatorInstanceLocal
					.validateIdentifierAndFunctionCombination(objAst);
		}

	}else if (objAst.type == expValidatorInstance.token.UNARYEXP){
		var returnDetail = expValidatorInstanceLocal.getReturnTypeUnaryExpression(objAst);
		returnType = returnDetail; 
		
	} else if (objAst.type == expValidatorInstance.token.ARRAYEXP) {
		var arrayDetail = expValidatorInstanceLocal.getReturnTypeArrayExpression(objAst.elements);
		returnType = arrayDetail[0];
		
	} else if (objAst.type == expValidatorInstance.token.MEMBREXP) {
		var identifier = '';
		// Special Function Case
		if (objAst.property.type == expValidatorInstance.token.IDENTIFER
				&& objAst.property.name == expValidatorInstance.token.SPECIALLENGTH) {
			if (objAst.object.type == expValidatorInstance.token.CALLEXP) {

				var expTempType = expValidatorInstanceLocal.processAst(objAst.object);

				if (expTempType == expValidatorInstance.token.STRINGTYPE || expTempType == expValidatorInstance.token.ARRAYTYPE) {
					returnType = expValidatorInstance.token.NUMBERTYPE;
				}
			} else if (objAst.object.type == expValidatorInstance.token.ARRAYEXP) {
				var arrayDetail = expValidatorInstanceLocal.getReturnTypeArrayExpression(objAst.object.elements);
				if ( arrayDetail[0] == expValidatorInstance.token.ARRAYTYPE) {
					returnType = expValidatorInstance.token.NUMBERTYPE;
				}
				
			}  
			
			else if (objAst.object.type == expValidatorInstance.token.LITERAL) {

				if (expValidatorInstanceLocal.returnLiteralType(objAst.object) == expValidatorInstance.token.STRINGTYPE) {
					returnType = expValidatorInstance.token.NUMBERTYPE;
					/* Start Change : WorkFlow : 948*/
				}else{
					expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.FUNCTIONMISMATCH,[expValidatorInstance.token.SPECIALLENGTH,toTitleCase(expValidatorInstanceLocal.returnLiteralType(objAst.object))]));
					/* End Change : WorkFlow : 948*/
				}

			} else {
				if (objAst.object.type == expValidatorInstance.token.IDENTIFER) {
					identifier = objAst.object.name;
				} else {
					identifier = expValidatorInstanceLocal
							.createIdentifierForMemberExpression(objAst.object,
									'');
					/*Start Change : Store array of MemberExpression Path*/		
					expValidatorInstanceLocal.arrayMemberExpInExpText.push(identifier);
					/*End Change*/
				}
				var expTempType = expValidatorInstanceLocal.sourceMap
						.getItem(identifier);

				if (expTempType != undefined) {
					if ((expTempType[0] == expValidatorInstance.token.STRINGTYPE || expTempType[0] == expValidatorInstance.token.ARRAYTYPE)) {
						// expType = "number";
						returnType = expValidatorInstance.token.NUMBERTYPE;
					/* Start Change : WorkFlow : 948*/
					}else{
							expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.FUNCTIONMISMATCH,[expValidatorInstance.token.SPECIALLENGTH,toTitleCase(expTempType[0])]));
					}
				}else{
					expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALIDOPERAND,[identifier]));
					/* End Change : WorkFlow : 948*/
				}

			}
		}
		/* Start Change : WorkFlow : 948*/
		else if(objAst.property.type == expValidatorInstance.token.IDENTIFER && objAst.object.type == expValidatorInstance.token.CALLEXP){
			expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALID_SYNTAX,[objAst.property.name]));
		}
		/* End Change : WorkFlow : 948*/
		

		else if((objAst.property.type == expValidatorInstance.token.LITERAL && typeof  objAst.property.value == expValidatorInstance.token.NUMBERTYPE) || objAst.property.type == expValidatorInstance.token.MEMBREXP || objAst.property.type == expValidatorInstance.token.CALLEXP || objAst.property.type == expValidatorInstance.token.BINARYEXP){
			if (objAst.object.type == expValidatorInstance.token.ARRAYEXP){
				var arrayElements = objAst.object.elements;
				if(arrayElements.length>0){
					if(arrayElements[0].type == expValidatorInstance.token.LITERAL){
						returnType = (typeof arrayElements[0].value); 
					}else{
						//throw exception related to [fasdf,asdf] because we have like this ["asdf","asdfgvd"] or [1,2,3] or we can consider is as identifier and pick it from maptype maps
						expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstance.errorMessages.INVALID_ARRAY_SYNTAX); //NC
					}
				}else{
					returnType = expValidatorInstance.token.NULLOBJECTTYPE;
				}
				
				
			}else if(objAst.object.type == expValidatorInstance.token.CALLEXP){
				var test = expValidatorInstanceLocal.processAst(objAst.object);
				if(test == expValidatorInstance.token.ARRAYTYPE){
					returnType = expValidatorInstance.token.STRINGTYPE;
				}else{
					expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstance.errorMessages.INVALIDVARIABLE); //NC
				}
			}
			/**Start Changes : 2769 Bug fix: Cannot de-reference arrays in Data Transformation dialog*/
			else if (expValidatorInstanceLocal.identifyArrayofObjectInMembrExp(objAst.object).isIdentified){
				if(	expValidatorInstanceLocal.dataTypeofArrayofObject !=null){
					var indexType = expValidatorInstanceLocal.processAst(objAst.property);
					if(indexType == expValidatorInstance.token.NUMBERTYPE && (!(objAst.property.value != undefined) || ((objAst.property.value != undefined) && mUtilCheckNaturalNum(objAst.property.value))) ){
						returnType = expValidatorInstanceLocal.dataTypeofArrayofObject[1];
					}else{
						var identifierT = expValidatorInstanceLocal.createIdentifierForMemberExpression(objAst.object, '');
						expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.EXPVAL_INVALID_ARRAY_INDEX,[identifierT]));
					}
				}
				/**Here we will check for property type of its string we will pick the sub object and pass the sub object with post data to same function recursively till we find the number as property type.*/
				
			}
			/**End Changes : 2769 Bug fix: Cannot de-reference arrays in Data Transformation dialog*/
			else{
				identifier = expValidatorInstanceLocal.createIdentifierForMemberExpression(objAst.object, '');
				var expTempType = expValidatorInstanceLocal.sourceMap.getItem(identifier);
				expValidatorInstanceLocal.arrayMemberExpInExpText.push(identifier);
				if(expTempType != undefined){
					if(expTempType[0] == expValidatorInstance.token.ARRAYTYPE){
						/**Start Changes : 2769 Bug fix: Cannot de-reference arrays in Data Transformation dialog*/
						if(objAst.property.value != undefined ){
							if(mUtilCheckNaturalNum(objAst.property.value)){
								returnType = expTempType[1];
							}else{
								expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.EXPVAL_INVALID_ARRAY_INDEX,[identifier]));	
							}		
						}else{
							var indexType = expValidatorInstanceLocal.processAst(objAst.property);
							if(indexType == expValidatorInstance.token.NUMBERTYPE ){
								returnType = expTempType[1];
							}else{
								expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.EXPVAL_INVALID_ARRAY_INDEX,[identifier]));
							}
						}
						/**End Changes : 2769 Bug fix: Cannot de-reference arrays in Data Transformation dialog*/
					}else{
						expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstance.errorMessages.INVALIDVARIABLE);//NC
					}
				}else {
					expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALIDIDENTIFIER,[identifier]));
				}
				
					
			}
		} 
		/**Start Changes : 2769 Bug fix: Cannot de-reference arrays in Data Transformation dialog*/
		else if(expValidatorInstanceLocal.identifyArrayofObjectInMembrExp(objAst).isIdentified){
			if(	expValidatorInstanceLocal.dataTypeofArrayofObject !=null){
				returnType = expValidatorInstanceLocal.dataTypeofArrayofObject[0];
			}
			/**Here we will check for property type of its string we will pick the sub object and pass the sub object with post data to same function recursively till we find the number as property type.*/
		}
		/**End Changes : 2769 Bug fix: Cannot de-reference arrays in Data Transformation dialog*/
		 else if(objAst.property.type == expValidatorInstance.token.MEMBREXP || objAst.property.type == expValidatorInstance.token.CALLEXP){ // This case will handle the Array indexing when indexing is Member Expression or Array Expression
			identifier = expValidatorInstanceLocal.createIdentifierForMemberExpression(objAst.object, '');
			expValidatorInstanceLocal.arrayMemberExpInExpText.push(identifier);
			var expTempType = expValidatorInstanceLocal.sourceMap.getItem(identifier);
			if(expTempType != undefined){
				if(expTempType[0] == expValidatorInstance.token.ARRAYTYPE){
					//var identifier2 = expValidatorInstanceLocal.createIdentifierForMemberExpression(objAst.property, '');//NC case
					//expValidatorInstanceLocal.arrayMemberExpInExpText.push(identifier2);
					//var expTempType2 = expValidatorInstanceLocal.sourceMap.getItem(identifier2);
					var expTempType2 = expValidatorInstanceLocal.processAst(objAst.property);
					if(expTempType2 != undefined ){
						if(expTempType2 == expValidatorInstance.token.NUMBERTYPE){
							returnType = expTempType[1];
						}else{
							expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALIDARRAYVARIABLE, [identifier]));//NC


						}
					}else{
						//expValidatorInstanceLocal.eArrayErrorMsgs.push("Cant find Variables");//NC
						//expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALIDIDENTIFIER,[identifier2]));
					}
				}else{
					expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstance.errorMessages.INVALIDARRAY);//NC

				}
			}else{				
				expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALIDIDENTIFIER,[identifier]));
			}
			
		}else if (objAst.property.type == expValidatorInstance.token.UNARYEXP){
			expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstance.errorMessages.INVALIDSYNTAX);//NC

		}

		else {
			identifier = expValidatorInstanceLocal.createIdentifierForMemberExpression(
					objAst, '');
			/*Start Change : Store array of MemberExpression Path*/		
			expValidatorInstanceLocal.arrayMemberExpInExpText.push(identifier);
			/*End Changes*/
			expType = expValidatorInstanceLocal.sourceMap.getItem(identifier);
			if (expType != undefined) {
				returnType = expType[0];
				/* Start Change : WorkFlow : 948*/
			}else{
				expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALIDIDENTIFIER,[identifier]));
			}  
			/* End Change : WorkFlow : 948*/
		}
	} else if (objAst.type == expValidatorInstance.token.IDENTIFER) {
		expType = expValidatorInstanceLocal.sourceMap.getItem(objAst.name);
		expValidatorInstanceLocal.arrayMemberExpInExpText.push(objAst.name);
		/* Start Change : WorkFlow : 948*/
		if (expType != undefined) {
		returnType = expType[0];
		}else{
			expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALIDOPERAND,[objAst.name]));
		}
		/* End Change : WorkFlow : 948*/
		
	} else if (objAst.type == expValidatorInstance.token.LITERAL) {
		expType = expValidatorInstanceLocal.returnLiteralType(objAst);
		/* Start Change : WorkFlow : 948*/
		if (expType != undefined) {
		returnType = expType;
		}
		/* End Change : WorkFlow : 948*/
	}
	return returnType;
};

expValidatorInstance.prototype.compareExp = function(leftType, rightType, operator){
	var expValidatorInstanceLocal = this;
	/* Start Change : WorkFlow : 948*/
	var returnType = null;
	/* End Change : WorkFlow : 948*/
	if(expValidatorInstanceLocal.iOperator != null){
		var operatorDetail = expValidatorInstanceLocal.iOperator[operator];
        if(operatorDetail != undefined){
		var rules = operatorDetail.rules;
		for(var index = 0; index <rules.length;index++){
			var rule = rules[index];
			if(rule.specialtype == undefined){
				if(rule.left == leftType && rule.right == rightType){
				/* Start Change : WorkFlow : 948*/
					returnType = rule.returnType;
				/* End Change : WorkFlow : 948*/
				}	
			}
		}
		}else{
			expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALID_OPERATOR,[operator]));
			return null;
		}
	}else if(operator != undefined  && (expValidatorInstanceLocal.iOperator == undefined || expValidatorInstanceLocal.iOperator == null)){
		expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstance.errorMessages.OPERATOR_NOT_ALLOWED);
		return null;
	}else{
		return null;
	}
	/* Start Change : WorkFlow : 948*/
	if(returnType != undefined && returnType != null){
		return returnType;
	}else{	
		if((leftType != undefined && leftType != null) && (rightType != undefined && rightType != null)){
			/* Start Change : WorkFlow : 948*/
			//expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.OPERATORMISMATCH,[operator, leftType, rightType]));
			expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.OPERATORMISMATCH,[operator,toTitleCase(leftType), toTitleCase(rightType)]));
			/* End Change : WorkFlow : 948*/
			
		}
	}
	/* Start Change : WorkFlow : 948*/
};

/**Start Changes : 2769 Bug fix: Cannot de-reference arrays in Data Transformation dialog*/
expValidatorInstance.prototype.identifyArrayofObjectInMembrExp = function(objAst, postFix){
	var expValidatorInstanceLocal = this;
	var returnData = {'isIdentified' : false, 'dataType' : null};
	
	/*var checkAstIsNumber = function(objAst){
		if(objAst.value != undefined && typeof objAst.value == expValidatorInstance.token.NUMBERTYPE ){
			return expValidatorInstance.token.NUMBERTYPE;
		}else if(objAst.type == "MemberExpression"){
			return expValidatorInstanceLocal.processAst(objAst);
		}
	};*/
	
	if(objAst.type == expValidatorInstance.token.MEMBREXP && objAst.property.type == expValidatorInstance.token.LITERAL  && typeof objAst.property.value == expValidatorInstance.token.NUMBERTYPE) {
		
		if(objAst.object.type == expValidatorInstance.token.MEMBREXP){
		var identifier = expValidatorInstanceLocal.createIdentifierForMemberExpression(objAst.object, '');
			if(mUtilCheckNaturalNum(objAst.property.value)){
				var expType1 = expValidatorInstanceLocal.sourceMap.getItem(identifier);
				expValidatorInstanceLocal.arrayMemberExpInExpText.push(identifier);
				if(expType1 != undefined){
					if(expType1[0] == expValidatorInstance.token.ARRAYTYPE && expType1[1] == expValidatorInstance.token.OBJECTTYPE){
						var expType = expValidatorInstanceLocal.sourceMap.getItem(identifier+'.<index>.'+postFix);
						expValidatorInstanceLocal.arrayMemberExpInExpText.push(identifier+'.<index>.'+postFix);
						if (expType != undefined){
							expValidatorInstanceLocal.dataTypeofArrayofObject = expType;
							returnData.isIdentified = true;	
							return returnData;
						}else{
							if(postFix != undefined){
								expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALIDOPERAND,[identifier+'.[index].'+postFix]));
								returnData.isIdentified = true;
							}
						}
					}else{
						if(postFix != undefined){
							returnData.isIdentified = true;
							//console.log('array is not an object!');//NC
						}
					}
				}else{
					if(postFix != undefined){
						returnData.isIdentified = true;
						//console.log(identifier+ ': this variable is missing.');//NC
					}
					}
				}else{
					expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.EXPVAL_INVALID_ARRAY_INDEX,[identifier]));
				}
		}else if(objAst.object.type == expValidatorInstance.token.CALLEXP) {
			var returnType = expValidatorInstanceLocal.processAst(objAst.object);
			if(returnType == 'array'){
				var identifier2 = expValidatorInstanceLocal.createIdentifierForMemberExpression(objAst.object.callee.object, '');
				var expType1 = expValidatorInstanceLocal.sourceMap.getItem(identifier2);
				expValidatorInstanceLocal.arrayMemberExpInExpText.push(identifier2);
				if(expType1 != undefined){
					if(expType1[0] == expValidatorInstance.token.ARRAYTYPE && expType1[1] == expValidatorInstance.token.OBJECTTYPE){
						var expType = expValidatorInstanceLocal.sourceMap.getItem(identifier2+'.<index>.'+postFix);
						expValidatorInstanceLocal.arrayMemberExpInExpText.push(identifier2+'.<index>.'+postFix);
						if (expType != undefined){
							expValidatorInstanceLocal.dataTypeofArrayofObject = expType;
							returnData.isIdentified = true;	
							return returnData;
						}else{
							if(postFix != undefined){
								expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALIDOPERAND,[identifier+'.[index].'+postFix]));
								returnData.isIdentified = true;
							} }
					}else{
						if(postFix != undefined){
							returnData.isIdentified = true;
							//console.log('array is not an object!');//NC
						}
					}
				}else{
					if(postFix != undefined){
						returnData.isIdentified = true;
						//console.log(identifier+ ': this variable is missing.');//NC
					}
				}
				
			}else{
				if(postFix != undefined){
					returnData.isIdentified = true;
					if(returnType != null){
						//console.log(identifier is an array of object.');//NC
					}
				}
			}
		}
		//
	}else if(objAst.type == expValidatorInstance.token.MEMBREXP && (objAst.property.type == expValidatorInstance.token.MEMBREXP || objAst.property.type == expValidatorInstance.token.BINARYEXP || objAst.property.type == expValidatorInstance.token.CALLEXP )){
		var identifier = expValidatorInstanceLocal.createIdentifierForMemberExpression(objAst.object, '');
		
			var expType1 = expValidatorInstanceLocal.sourceMap.getItem(identifier);
			if(expType1 != undefined){
				if(expType1[0] == expValidatorInstance.token.ARRAYTYPE && expType1[1] == expValidatorInstance.token.OBJECTTYPE){
					//
					if(expValidatorInstanceLocal.processAst(objAst.property) == expValidatorInstance.token.NUMBERTYPE){
					var expType = expValidatorInstanceLocal.sourceMap.getItem(identifier+'.<index>.'+postFix);
					expValidatorInstanceLocal.arrayMemberExpInExpText.push(identifier+'.<index>.'+postFix);
					if (expType != undefined){
						expValidatorInstanceLocal.dataTypeofArrayofObject = expType;
						returnData.isIdentified = true;	
						return returnData;
					}else{
						if(postFix != undefined){
							expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALIDOPERAND,[identifier+'.[index].'+postFix]));
							returnData.isIdentified = true;
							//console.log(identifier+'.'+postFix+ ': this variable is missing.');
							}
						
					}
				}else{
					if(postFix != undefined){
						expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALIDARRAYVARIABLE, [identifier]));
						//console.log("Index is not a number.");
						returnData.isIdentified = true;
					}
				}
				}else{
					if(postFix != undefined){
						expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.EXPVAL_NOT_AN_ARRAY,[identifier]));
						returnData.isIdentified = true;
						//console.log('array is not an object!');
					}
					
				}
				
			}else{
				if(postFix != undefined){
					expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALIDOPERAND,[identifier]));
					returnData.isIdentified = true;
					//console.log(identifier+ ': this variable is missing.');
				}
			}
			
			
		
		
		
	}else if(objAst.type == expValidatorInstance.token.MEMBREXP && objAst.property.type == expValidatorInstance.token.UNARYEXP){
		var identifier = expValidatorInstanceLocal.createIdentifierForMemberExpression(objAst.object, '');
		expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.EXPVAL_INVALID_ARRAY_INDEX,[identifier]));
		returnData.isIdentified = true;
	}
	else if(objAst.type == expValidatorInstance.token.MEMBREXP && objAst.property.type == expValidatorInstance.token.LITERAL  && typeof  objAst.property.value == expValidatorInstance.token.STRINGTYPE){
		if(postFix != null){
			postFix = objAst.property.value+'.'+postFix;
		}else{
			postFix = objAst.property.value;
		}
		returnData = expValidatorInstanceLocal.identifyArrayofObjectInMembrExp(objAst.object, postFix);
	}else if(objAst.type == expValidatorInstance.token.CALLEXP){
		if(postFix != undefined){
			returnData.isIdentified = true;
		}		
	}
	return returnData;
};
/**End Changes : 2769 Bug fix: Cannot de-reference arrays in Data Transformation dialog*/

/**
 * Returns variable path of Member Expression from AST.  
 *
 * @this {expValidatorInstance}
 * @param {Object} expTreeObj contain AST(Abstract syntax tree).
 * @param {String} Temp variable used for recursive call.
 * @return {string} resultant data type of AST.
 */
expValidatorInstance.prototype.createIdentifierForMemberExpression = function(
		expTreeObj, identifier) {
   var expValidatorInstanceLocal = this;
    if(expTreeObj.object.type == expValidatorInstance.token.IDENTIFER){
           var propertyValue = "";
           if(expTreeObj.property.type == expValidatorInstance.token.LITERAL){
                  propertyValue = expTreeObj.property.value;
           }else{
                  propertyValue = expTreeObj.property.name;
           }
           
           if(identifier == "") {
                  identifier = expTreeObj.object.name + "." + propertyValue;
           } else {
                  identifier = expTreeObj.object.name + "." + propertyValue + "." + identifier;
           }
           expValidatorInstanceLocal.eIdentifier = identifier;
           
    } else {
           var propertyValue = "";
           if(expTreeObj.property.type == expValidatorInstance.token.LITERAL){
                  propertyValue = expTreeObj.property.value;
           }else{
                  propertyValue = expTreeObj.property.name;
           }

           if(propertyValue == undefined){
        	   identifier = "";


           }else if(identifier == "") {
                  identifier = propertyValue;
           } else {                   
                  identifier = propertyValue + "." + identifier;
           }
           expValidatorInstanceLocal.eIdentifier = identifier;
           
           expValidatorInstanceLocal.createIdentifierForMemberExpression(expTreeObj.object, identifier);
    }
    return expValidatorInstanceLocal.eIdentifier;
	
	
};

/**
 * Returns data type of CallExpression from AST .  
 *
 * @this {expValidatorInstance}
 * @param {Object} expChildNode contain AST(Abstract syntax tree).
 * @return {string} resultant data type of AST.
 */
expValidatorInstance.prototype.validateIdentifierAndFunctionCombination = function(
		expChildNode) {

	var expValidatorInstanceLocal = this;
	var functionName = expChildNode.callee.property.name;
	var functionArgument = expChildNode.arguments;

	var returnType = null;
	var functionDetail = null;
	var returnTypeCheckFlag = false;
	/* start change */
	/* added support to call method from string literal for e.g. "xyz".concat(str1, str2) */
	if (expChildNode.callee.object.type == expValidatorInstance.token.LITERAL) {
		if (expValidatorInstanceLocal.returnLiteralType(expChildNode.callee.object) == expValidatorInstance.token.STRINGTYPE) {
			if (expValidatorInstanceLocal.eStringFunctionDetailsMap
					.hasItem(functionName)) {
				functionDetail = expValidatorInstanceLocal.eStringFunctionDetailsMap
						.getItem(functionName);
				returnTypeCheckFlag = true;
			}
		}else if(expValidatorInstanceLocal.returnLiteralType(expChildNode.callee.object) == expValidatorInstance.token.BOOLEANTYPE){
			if (expValidatorInstanceLocal.eBooleanFunctionDetailsMap
					.hasItem(functionName)) {
				functionDetail = expValidatorInstanceLocal.eBooleanFunctionDetailsMap
						.getItem(functionName);

				returnTypeCheckFlag = true;

			}




		}
	} 
	//if(expChildNode.callee.object.type == "Identifier")
	/* end change */
	else if (expChildNode.callee.object.type == expValidatorInstance.token.IDENTIFER) {
		if (expChildNode.callee.object.name == expValidatorInstance.token.SPECIALMATH) { // For Math
			if (expValidatorInstanceLocal.eMathFunctionDetailsMap.hasItem(functionName)) {
				functionDetail = expValidatorInstanceLocal.eMathFunctionDetailsMap
						.getItem(functionName);
				if(functionDetail != null){
					returnTypeCheckFlag = true;
				}
			}
		} else if (expChildNode.callee.object.name == expValidatorInstance.token.SPECIALJSON) { // For JSON
			if (expValidatorInstanceLocal.eMathFunctionDetailsMap.hasItem(functionName)) {
				functionDetail = expValidatorInstanceLocal.eMathFunctionDetailsMap
						.getItem(functionName);
				if(functionDetail != null){
						returnTypeCheckFlag = true;
					}
			}
		} else {

			var idenType = expValidatorInstanceLocal.sourceMap
					.getItem(expChildNode.callee.object.name); /**Added**/
			if(idenType != undefined) {
				identifierType = idenType[0];
			if (identifierType == expValidatorInstance.token.OBJECTTYPE) { // For Object
				if (expValidatorInstanceLocal.eObjectFunctionDetailsMap
						.hasItem(functionName)) {
					functionDetail = expValidatorInstanceLocal.eObjectFunctionDetailsMap
							.getItem(functionName);
					if(functionDetail != null){
						returnTypeCheckFlag = true;
					}
				}
			} else if (identifierType == expValidatorInstance.token.ARRAYTYPE) { // For Array
				if (expValidatorInstanceLocal.eArrayFunctionDetailsMap
						.hasItem(functionName)) {
					functionDetail = expValidatorInstanceLocal.eArrayFunctionDetailsMap
							.getItem(functionName);
					if(functionDetail != null){
						returnTypeCheckFlag = true;
					}
				}
			}
		}else{
			expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALIDOPERAND,[expChildNode.callee.object.name]));
		}
		}
	} else if (expChildNode.callee.object.type == expValidatorInstance.token.CALLEXP) {
		var identifierType = expValidatorInstanceLocal
				.processAst(expChildNode.callee.object);
		functionDetail = expValidatorInstanceLocal.getFunctionDetail(functionName, identifierType);
		if(functionDetail != null){
			returnTypeCheckFlag = true;
		}
		/*if (identifierType == expValidatorInstance.token.STRINGTYPE) { // For String
		if (expValidatorInstanceLocal.eStringFunctionDetailsMap
				.hasItem(functionName)) {
			functionDetail = expValidatorInstanceLocal.eStringFunctionDetailsMap
					.getItem(functionName);
			returnTypeCheckFlag = true;
		}
	} else if (identifierType == expValidatorInstance.token.OBJECTTYPE) { // For Object
		if (expValidatorInstanceLocal.eObjectFunctionDetailsMap
				.hasItem(functionName)) {
			functionDetail = expValidatorInstanceLocal.eObjectFunctionDetailsMap
					.getItem(functionName);
			returnTypeCheckFlag = true;
		}
	} else if (identifierType == expValidatorInstance.token.ARRAYTYPE) { // For Array
		if (expValidatorInstanceLocal.eArrayFunctionDetailsMap
				.hasItem(functionName)) {
			functionDetail = expValidatorInstanceLocal.eArrayFunctionDetailsMap
					.getItem(functionName);
			returnTypeCheckFlag = true;
		}
	}
	else if (identifierType == expValidatorInstance.token.NUMBERTYPE) { // For Number     
		if (expValidatorInstanceLocal.eNumberFunctionDetailsMap
				.hasItem(functionName)) {
			functionDetail = expValidatorInstanceLocal.eNumberFunctionDetailsMap
					.getItem(functionName);
			returnTypeCheckFlag = true;
		}
	}
	else if (identifierType == expValidatorInstance.token.BOOLEANTYPE) { // For Boolean     
		if (expValidatorInstanceLocal.eBooleanFunctionDetailsMap
				.hasItem(functionName)) {
			functionDetail = expValidatorInstanceLocal.eBooleanFunctionDetailsMap
					.getItem(functionName);
			returnTypeCheckFlag = true;
		}
	}*/
		
	}else if (expChildNode.callee.object.type == expValidatorInstance.token.ARRAYEXP) {
		if(expValidatorInstanceLocal.eArrayFunctionDetailsMap.hasItem(functionName)){
			functionDetail = expValidatorInstanceLocal.eArrayFunctionDetailsMap.getItem(functionName);
			returnTypeCheckFlag = true;
		}
	}else if(expChildNode.callee.object.type == expValidatorInstance.token.MEMBREXP && expChildNode.callee.object.property.type == "Literal" && typeof  expChildNode.callee.object.property.value == "number"){
		var identifierType = expValidatorInstanceLocal.processAst(expChildNode.callee.object);
		functionDetail = expValidatorInstanceLocal.getFunctionDetail(functionName, identifierType);
		if(functionDetail){
			returnTypeCheckFlag = true;
		}
	}else if((expChildNode.callee.object.type == expValidatorInstance.token.BINARYEXP) || (expChildNode.callee.object.type == expValidatorInstance.token.UNARYEXP) || (expChildNode.callee.object.type == expValidatorInstance.token.LOGICALEXP)){
		var identifierType = expValidatorInstanceLocal.processAst(expChildNode.callee.object);
		functionDetail = expValidatorInstanceLocal.getFunctionDetail(functionName, identifierType);
		if(functionDetail){
			returnTypeCheckFlag = true;
		}
	}
	/**Start Changes : 2769 Bug fix: Cannot de-reference arrays in Data Transformation dialog*/
	else if(expValidatorInstanceLocal.identifyArrayofObjectInMembrExp(expChildNode.callee.object).isIdentified){
		if(	expValidatorInstanceLocal.dataTypeofArrayofObject !=null){
			var identifierType = expValidatorInstanceLocal.dataTypeofArrayofObject[0];
			functionDetail = expValidatorInstanceLocal.getFunctionDetail(functionName, identifierType);
			if(functionDetail){
				returnTypeCheckFlag = true;
			}
		}
		/**Here we will check for property type of its string we will pick the sub object and pass the sub object with post data to same function recursively till we find the number as property type.*/
	}
	/**End Changes : 2769 Bug fix: Cannot de-reference arrays in Data Transformation dialog*/
	else {
		var identifier = expValidatorInstanceLocal.createIdentifierForMemberExpression(
				expChildNode.callee.object, '');
		/*Start Change : Store array of MemberExpression Path*/		
		expValidatorInstanceLocal.arrayMemberExpInExpText.push(identifier);
		/*End Changes*/
		var identifierType = "";
		if(expValidatorInstanceLocal.sourceMap.getItem(identifier) != undefined){
			identifierType = expValidatorInstanceLocal.sourceMap.getItem(identifier)[0];
			functionDetail = expValidatorInstanceLocal.getFunctionDetail(functionName, identifierType);
			if(functionDetail){
				returnTypeCheckFlag = true;
			}
					/*if (identifierType == expValidatorInstance.token.STRINGTYPE) { // For String
						if (expValidatorInstanceLocal.eStringFunctionDetailsMap
								.hasItem(functionName)) {
							functionDetail = expValidatorInstanceLocal.eStringFunctionDetailsMap
									.getItem(functionName);
							returnTypeCheckFlag = true;
						}
					} else if (identifierType == expValidatorInstance.token.OBJECTTYPE) { // For Object
						if (expValidatorInstanceLocal.eObjectFunctionDetailsMap
								.hasItem(functionName)) {
							functionDetail = expValidatorInstanceLocal.eObjectFunctionDetailsMap
									.getItem(functionName);
							returnTypeCheckFlag = true;
						}
					} else if (identifierType == expValidatorInstance.token.ARRAYTYPE) { // For Array
						if (expValidatorInstanceLocal.eArrayFunctionDetailsMap
								.hasItem(functionName)) {
							functionDetail = expValidatorInstanceLocal.eArrayFunctionDetailsMap
									.getItem(functionName);
							returnTypeCheckFlag = true;
						}
					}
					else if (identifierType == expValidatorInstance.token.NUMBERTYPE) { // For Number     
						if (expValidatorInstanceLocal.eNumberFunctionDetailsMap
								.hasItem(functionName)) {
							functionDetail = expValidatorInstanceLocal.eNumberFunctionDetailsMap
									.getItem(functionName);
							returnTypeCheckFlag = true;
						}
					}
					else if (identifierType == expValidatorInstance.token.BOOLEANTYPE) { // For Boolean     
						if (expValidatorInstanceLocal.eBooleanFunctionDetailsMap
								.hasItem(functionName)) {
							functionDetail = expValidatorInstanceLocal.eBooleanFunctionDetailsMap
									.getItem(functionName);
							returnTypeCheckFlag = true;
						}
					}*/
		}else{
		/* Start Change : WorkFlow : 948*/
			expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALIDOPERAND,[identifier]));
		/* End Change : WorkFlow : 948*/
		}
	}
	
	
	if (returnTypeCheckFlag) {
		/*if (functionDetail.minAndMaxArgument[0] == 0) {
		 Start Change : WorkFlow : 948
			if(functionArgument.length == 0){
				returnType = functionDetail.returnType;
				}else{
					isValidArguments = false;
					expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALIDARGUMENTS,[functionDetail.functionTemplate]));
				}
		 End Change : WorkFlow : 948
		} else if (functionDetail.minAndMaxArgument[0] == 'N') {
			var isValidArguments = false;
			if(functionArgument.length == 0){
				expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.MINARGUMENTS,[functionName,"1"]));
			}
			if(functionArgument.length > functionDetail.minAndMaxArgument[1]){
				expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.MAXARGUMENTS,[functionName,functionDetail.minAndMaxArgument[1]]));
			}
			for ( var i = 0; i < functionArgument.length; i++) {
 
				var argType = expValidatorInstanceLocal.processAst(functionArgument[i]);
				if ((argType == functionDetail.argumentTypes[0])
						|| (argType == expValidatorInstance.token.NUMBERTYPE && functionDetail.argumentTypes[0] == expValidatorInstance.token.STRINGTYPE)) {
					isValidArguments = true;
				} else {
					isValidArguments = false;
					 Start Change : WorkFlow : 948
					expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALIDARGUMENTS,[functionDetail.functionTemplate]));
					 End Change : WorkFlow : 948
					break;
				}
			}
			if (isValidArguments) {
				returnType = functionDetail.returnType;
			}

		} else if (functionArgument.length >= functionDetail.minAndMaxArgument[0]
				&& functionArgument.length <= functionDetail.minAndMaxArgument[1]) {
			var isValidArguments = false;
			 Start Change : WorkFlow : 948
             if(functionArgument.length == 0){
            	 expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.MINARGUMENTS,[functionName,functionDetail.minAndMaxArgument[0]]));
			}
             if(functionArgument.length > functionDetail.minAndMaxArgument[1]){
            	 expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.MAXARGUMENTS,[functionName,functionDetail.minAndMaxArgument[1]]));
 			}
 			 End Change : WorkFlow : 948
			for ( var i = 0; i < functionArgument.length; i++) {

				var argType = expValidatorInstanceLocal.processAst(functionArgument[i]);
				if (argType == functionDetail.argumentTypes[i]) {
					isValidArguments = true;
				} else {
					isValidArguments = false;
					 Start Change : WorkFlow : 948
					expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALIDARGUMENTS,[functionDetail.functionTemplate]));
					 End Change : WorkFlow : 948
					break;
				}
			}
			if (isValidArguments) {
				returnType = functionDetail.returnType;
			}
		}else{
			if(functionArgument.length == 0){
				expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.MINARGUMENTS,[functionName,functionDetail.minAndMaxArgument[0]]));
			}else if(functionArgument.length > functionDetail.minAndMaxArgument[1]){
				expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.MAXARGUMENTS,[functionName,functionDetail.minAndMaxArgument[1]]));
	 		}else{
				expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.FUNCTARGUMENTMISMATCH,[functionName,functionDetail.minAndMaxArgument[1]]));
			}
		}*/
		returnType = expValidatorInstanceLocal.processFunctionDetail(functionDetail, functionArgument, functionName);
	}else{
		if(identifierType != null && identifierType != ""){
			expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.FUNCTIONMISMATCH,[functionName,toTitleCase(identifierType)]));
		}
	}

	return returnType;
};


/**
 * Get FunctionDetail of functionName.  
 *
 * @this {expValidatorInstance}
 * @param {string} functionDetail contain information of Function.
 * @param {identifierType} data type of operandType.
 */
expValidatorInstance.prototype.getFunctionDetail = function(functionName, identifierType){
	var expValidatorInstanceLocal = this;
	var functionDetail = null;
	if (identifierType == expValidatorInstance.token.STRINGTYPE) { // For String
		if (expValidatorInstanceLocal.eStringFunctionDetailsMap
				.hasItem(functionName)) {
			functionDetail = expValidatorInstanceLocal.eStringFunctionDetailsMap
					.getItem(functionName);
			
		}
	} else if (identifierType == expValidatorInstance.token.OBJECTTYPE) { // For Object
		if (expValidatorInstanceLocal.eObjectFunctionDetailsMap
				.hasItem(functionName)) {
			functionDetail = expValidatorInstanceLocal.eObjectFunctionDetailsMap
					.getItem(functionName);
			
		}
	} else if (identifierType == expValidatorInstance.token.ARRAYTYPE) { // For Array
		if (expValidatorInstanceLocal.eArrayFunctionDetailsMap
				.hasItem(functionName)) {
			functionDetail = expValidatorInstanceLocal.eArrayFunctionDetailsMap
					.getItem(functionName);
			
		}
	} else if (identifierType == expValidatorInstance.token.BOOLEANTYPE) { // For Boolean
		if (expValidatorInstanceLocal.eBooleanFunctionDetailsMap
				.hasItem(functionName)) {
			functionDetail = expValidatorInstanceLocal.eBooleanFunctionDetailsMap
					.getItem(functionName);
			
		}
	} else if (identifierType == expValidatorInstance.token.NUMBERTYPE) { // For Number
		if (expValidatorInstanceLocal.eNumberFunctionDetailsMap
				.hasItem(functionName)) {
			functionDetail = expValidatorInstanceLocal.eNumberFunctionDetailsMap
					.getItem(functionName);
			
		}
	}
	return functionDetail;
};


/**
 * Check for correct order of Signature/Parameter from Function Details.  
 *
 * @this {expValidatorInstance}
 * @param {Object} functionDetail contain information of Function.
 * @param {Array} Array of arguments.
 * @return {string} resultant data type.
 */
expValidatorInstance.prototype.processFunctionDetail = function(functionDetail, functionArgument, functionName){
	var expValidatorInstanceLocal = this;
	var returnType = null;

	if (functionDetail.minAndMaxArgument[0] == 0) {
	/* Start Change : WorkFlow : 948*/
		if(functionArgument.length == 0){
			returnType = functionDetail.returnType;
			}else{
				isValidArguments = false;
				expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALIDARGUMENTS,[functionDetail.functionTemplate]));
			}
	/* End Change : WorkFlow : 948*/
	} else if (functionDetail.minAndMaxArgument[0] == expValidatorInstance.token.INFINITE_ARGUMENT) {
		var isValidArguments = false;
		if(functionArgument.length == 0){
			expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.MINARGUMENTS,[functionName,"1"]));
		}
		/*if(functionArgument.length > functionDetail.minAndMaxArgument[1]){
			expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.MAXARGUMENTS,[functionName,functionDetail.minAndMaxArgument[1]]));
		}*/
		for ( var i = 0; i < functionArgument.length; i++) {

			var argType = expValidatorInstanceLocal.processAst(functionArgument[i]);
			if ((argType == functionDetail.argumentTypes[0])
					|| (argType == expValidatorInstance.token.NUMBERTYPE && functionDetail.argumentTypes[0] == expValidatorInstance.token.STRINGTYPE)) {
				isValidArguments = true;
			} else {
				isValidArguments = false;
				/* Start Change : WorkFlow : 948*/
				expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALIDARGUMENTS,[functionDetail.functionTemplate]));
				/* End Change : WorkFlow : 948*/
				break;
			}
		}
		if (isValidArguments) {
			returnType = functionDetail.returnType;
		}

	} else if (functionArgument.length >= functionDetail.minAndMaxArgument[0]
			&& functionArgument.length <= functionDetail.minAndMaxArgument[1]) {
		var isValidArguments = false;
		/* Start Change : WorkFlow : 948*/
         if(functionArgument.length == 0){
        	 expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.MINARGUMENTS,[functionName,functionDetail.minAndMaxArgument[0]]));
		}
         if(functionArgument.length > functionDetail.minAndMaxArgument[1]){
        	 expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.MAXARGUMENTS,[functionName,functionDetail.minAndMaxArgument[1]]));
			}
			/* End Change : WorkFlow : 948*/
		for ( var i = 0; i < functionArgument.length; i++) {

			var argType = expValidatorInstanceLocal.processAst(functionArgument[i]);
			if (argType == functionDetail.argumentTypes[i]) {
				isValidArguments = true;
			} else {
				isValidArguments = false;
				/* Start Change : WorkFlow : 948*/
				expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALIDARGUMENTS,[functionDetail.functionTemplate]));
				/* End Change : WorkFlow : 948*/
				break;
			}
		}
		if (isValidArguments) {
			returnType = functionDetail.returnType;
		}
	}else{
		if(functionArgument.length == 0){
			expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.MINARGUMENTS,[functionName,functionDetail.minAndMaxArgument[0]]));
		}else if(functionArgument.length > functionDetail.minAndMaxArgument[1]){
			expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.MAXARGUMENTS,[functionName,functionDetail.minAndMaxArgument[1]]));
 		}else{
			expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.FUNCTARGUMENTMISMATCH,[functionName,functionDetail.minAndMaxArgument[1]]));
		}
	}
	
	return returnType;
};


/**
 * Returns Array of MemberExpression path used within the expression.  
 *
 * @this {expValidatorInstance}
 * @return {Array} array of MemberExpression path.
 */
expValidatorInstance.prototype.getArrayMemberExpInExpText = function(){
	var expValidatorInstanceLocal = this;
	return expValidatorInstanceLocal.arrayMemberExpInExpText;
};

/**
 * Initialize "eFunctions.functionArray" Array with list of function details.  
 *
 * @this {expValidatorInstance}
 */
expValidatorInstance.prototype.pushFunctionDetails = function() {
	var expValidatorInstanceLocal = this;
	var funArrayObj = expValidatorInstanceLocal.eArrayFunction;
	var funArray = funArrayObj[0];
	for ( var i = 0; i < funArray.length; i++) {
		if (funArray[i].operandType == expValidatorInstance.token.STRINGTYPE) {
			expValidatorInstanceLocal.eStringFunctionDetailsMap.setItem(
					funArray[i].functionName, {
						'returnType' : funArray[i].returnType,
						'minAndMaxArgument' : funArray[i].minAndMaxArgument,
						'argumentTypes' : funArray[i].argumentTypes,
						'functionTemplate' : funArray[i].functionTemplate
					});
		} else if (funArray[i].operandType == expValidatorInstance.token.SPECIALMATH) {
			expValidatorInstanceLocal.eMathFunctionDetailsMap.setItem(
					funArray[i].functionName, {
						'returnType' : funArray[i].returnType,
						'minAndMaxArgument' : funArray[i].minAndMaxArgument,
						'argumentTypes' : funArray[i].argumentTypes,
						'functionTemplate' : funArray[i].functionTemplate
					});
		} else if (funArray[i].operandType == expValidatorInstance.token.OBJECTTYPE) {
			expValidatorInstanceLocal.eObjectFunctionDetailsMap.setItem(
					funArray[i].functionName, {
						'returnType' : funArray[i].returnType,
						'minAndMaxArgument' : funArray[i].minAndMaxArgument,
						'argumentTypes' : funArray[i].argumentTypes,
						'functionTemplate' : funArray[i].functionTemplate
					});
		} else if (funArray[i].operandType == expValidatorInstance.token.ARRAYTYPE) {
			expValidatorInstanceLocal.eArrayFunctionDetailsMap.setItem(
					funArray[i].functionName, {
						'returnType' : funArray[i].returnType,
						'minAndMaxArgument' : funArray[i].minAndMaxArgument,
						'argumentTypes' : funArray[i].argumentTypes,
						'functionTemplate' : funArray[i].functionTemplate
					});

		} else if (funArray[i].operandType == expValidatorInstance.token.GLOBALTYPE) {
			expValidatorInstanceLocal.eGlobalFunctionDetailsMap.setItem(
					funArray[i].functionName, {
						'returnType' : funArray[i].returnType,
						'minAndMaxArgument' : funArray[i].minAndMaxArgument,
						'argumentTypes' : funArray[i].argumentTypes,
						'functionTemplate' : funArray[i].functionTemplate
					});
		}else if (funArray[i].operandType == expValidatorInstance.token.NUMBERTYPE) {
			expValidatorInstanceLocal.eNumberFunctionDetailsMap.setItem(
					funArray[i].functionName, {
						'returnType' : funArray[i].returnType,
						'minAndMaxArgument' : funArray[i].minAndMaxArgument,
						'argumentTypes' : funArray[i].argumentTypes,
						'functionTemplate' : funArray[i].functionTemplate
					});
		}else if (funArray[i].operandType == expValidatorInstance.token.BOOLEANTYPE) {
			expValidatorInstanceLocal.eBooleanFunctionDetailsMap.setItem(
					funArray[i].functionName, {
						'returnType' : funArray[i].returnType,
						'minAndMaxArgument' : funArray[i].minAndMaxArgument,
						'argumentTypes' : funArray[i].argumentTypes,
						'functionTemplate' : funArray[i].functionTemplate
					});
		}
	}
};


/**
 * Returns data type of Literal from AST.  
 *
 * @this {expValidatorInstance}
 * @param {Object} expChildNode contain AST(Abstract syntax tree).
 * @return {string} resultant data type of AST.
 */
expValidatorInstance.prototype.returnLiteralType = function(expChildNode) {
	var returnType = null;
	if (typeof expChildNode.value === expValidatorInstance.token.BOOLEANTYPE) {
		returnType = expValidatorInstance.token.BOOLEANTYPE;
	} else if (typeof expChildNode.value === expValidatorInstance.token.NUMBERTYPE) {
		returnType = expValidatorInstance.token.NUMBERTYPE;
	} else if (typeof expChildNode.value === expValidatorInstance.token.STRINGTYPE) {
		returnType = expValidatorInstance.token.STRINGTYPE;
	} else if (typeof expChildNode.value === expValidatorInstance.token.OBJECTTYPE
			&& expChildNode.value instanceof RegExp) {// added for regex
		// support
		returnType = expValidatorInstance.token.STRINGTYPE;

	} else if (typeof expChildNode.value === expValidatorInstance.token.OBJECTTYPE
			&& expChildNode.value == null) {
		returnType = expValidatorInstance.token.NULLOBJECTTYPE;
	}
	return returnType;
};

/**
 * Returns Array of ArrayExpression.  
 *
 * @this {expValidatorInstance}
 * @param {Object} expChildNode contain AST(Abstract syntax tree) of Array Expression.
 * @return {Array} return type of array.
 */
expValidatorInstance.prototype.getReturnTypeArrayExpression = function(elements){
	/*Start Change: bug fix-1126*/
	//var returnData = [expValidatorInstance.token.ARRAYTYPE,'noData'];
	var expValidatorInstanceLocal = this;
	var dataType = "";
	for ( var looper = 0; looper < elements.length; looper++) {
	  dataType = expValidatorInstanceLocal.processAst(elements[looper]);
	}
	var returnData = [expValidatorInstance.token.ARRAYTYPE,dataType];
   /*End Change: bug fix-1126*/
	return returnData;
};

/**
 * It process the Urnary Expression and returns datatype of right side of the unary operator.  
 *
 * @this {expValidatorInstance}
 * @param {Object} expChildNode contain AST(Abstract syntax tree) of UnaryExpression.
 * @return {String} return type of array.
 */
expValidatorInstance.prototype.getReturnTypeUnaryExpression = function(objAst){
	var expValidatorInstanceLocal = this;
	var dataType = expValidatorInstanceLocal.processAst(objAst.argument);
	if(expValidatorInstanceLocal.iOperator != null){
		var operatorDetail = expValidatorInstanceLocal.iOperator[objAst.operator];
		var rules = operatorDetail.rules;
		for(var index = 0; index <rules.length;index++){
			var rule = rules[index];
			if(rule.specialtype != undefined){
				if(rule.right == dataType){
					return rule.returnType;
				}else{
					expValidatorInstanceLocal.eArrayErrorMsgs.push(expValidatorInstanceLocal.createErrorMessage(expValidatorInstance.errorMessages.INVALID_OPERAND_IN_UNARY,[objAst.operator,dataType]));
				}	
			}
		}
	}else{

		return null;	
	}
};

expValidatorInstance.prototype.throwError = function() {
	var expValidatorInstanceLocal = this;
	if(expValidatorInstanceLocal.eArrayErrorMsgs != null && expValidatorInstanceLocal.eArrayErrorMsgs.length > 0){
		throw{
			message: expValidatorInstanceLocal.eArrayErrorMsgs,
			messageType:expValidatorInstance.errorMessages.INVALID_EXPRESSION
		};
	}else{
		throw{
			message: [expValidatorInstance.errorMessages.INVALID],
			messageType:expValidatorInstance.errorMessages.INVALID_EXPRESSION
		};
	}
};


/* Start Change : WorkFlow : 948*/
expValidatorInstance.prototype.createError = function(eArrayErrorMsgs) {
	var expValidatorInstanceLocal = this;
	 var errMessage = "<ul>";
	if(eArrayErrorMsgs != null && eArrayErrorMsgs.length > 0){
		  for(var i=0; i<eArrayErrorMsgs.length; i++){
			  errMessage += " <li>&bull; "+ eArrayErrorMsgs[i] + "</li>";
		  }
		  errMessage += "</ul>";
		  return errMessage;
		/*throw{
			message: errMessage,
			messageType:expValidatorInstance.errorMessages.INVALID_EXPRESSION
		};*/
	}else{
		return [expValidatorInstance.errorMessages.INVALID];
	}
};


expValidatorInstance.prototype.createErrorMessage = function(errorMsg, errorData) {
	    var finalErrorString = errorMsg;
	    if (errorData != undefined) {
	        for (var i = 0; i < errorData.length; i++) {
	            if (finalErrorString.indexOf('%%') > -1) {
	            	finalErrorString = finalErrorString.replace('%%', errorData[i]);
	            }
	            else
	                break;
	        }
	    }
	    return finalErrorString;
	 };
	 
/* End Change : WorkFlow : 948*/
/**
 * Hard coded Tokens  
 *
 * @this {expValidatorInstance}
 */
expValidatorInstance.token = {
		LOGICALEXP : 'LogicalExpression',
		BINARYEXP : 'BinaryExpression',
		CALLEXP : 'CallExpression',
		MEMBREXP : 'MemberExpression',
		UNARYEXP : 'UnaryExpression',
		ARRAYEXP : 'ArrayExpression',
		BOOLEANTYPE : 'boolean',
		NUMBERTYPE : 'number',
		STRINGTYPE : 'string',
		OBJECTTYPE : 'object',
		ARRAYTYPE : 'array',
		NULLOBJECTTYPE : 'nullObject',
		IDENTIFER : 'Identifier',
		LITERAL : 'Literal',
		SPECIALLENGTH : 'length',
		SPECIALMATH : 'Math',
		SPECIALJSON : 'JSON',
		GLOBALTYPE : 'global',
		INFINITE_ARGUMENT : 'N'
};








