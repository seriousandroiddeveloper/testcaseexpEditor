(function (root) {

	var allowedDataTypes = [];
	var restrictedWordsArray = [];
	var errMessage = [];
	allowedDataTypes.push('string','integer','boolean','number','array','object');
    Tokens = {
            Properties: 'properties',
            Items: 'items',
            Type: 'type',
            Title: 'title',
            ObjectType: 'object',
            ArrayType: 'array',
            NumberType: 'number'
          };
    /**
	 *Returns the length of properties.   
	 *
	 *@param {object}properties- All the properties list of the object type schema.
	 *@return{int} counter- length of properties
	 */
    getlength = function(properties){
		  var counter =0;
		  for(var p in properties){
			  counter++;
		  }
		  return counter;
	  };
    
    
	/**
	 *It validates the properties of object type in schema and checks for datatypes, special characters and restricted words in the property name.   
	 *
	 *@param {object}properties- All the properties list of the object type schema.
	 */
	validateObject = function(properties){
		if(getlength(properties) > 0){
			validateDataType(properties);
			for(var p in properties){
				validateNoSpecialCharacterAllowed(p,"Property name");
				validateRestrictedWords(p,"property name");
					if(properties[p].hasOwnProperty(Tokens.Type)){
							if(properties[p].type == Tokens.ObjectType){
								if(properties[p].hasOwnProperty(Tokens.Properties)){
									validateObject(properties[p].properties);
								}else{
									errMessage.push(createError(schemaConstants.PROPERTY_NOT_DEFINED,[p]));
								}
							}
							if(properties[p].type == Tokens.ArrayType){
								if(properties[p].hasOwnProperty(Tokens.Items)){
									validateArray(properties[p].items);
								}else{
									errMessage.push(createError(schemaConstants.ITEMS_NOT_DEFINED,[p]));
								}
							}
					}else{
						errMessage.push(createError(schemaConstants.PROPERTY_TYPE_UNDEFINED,[p]));
					}
			}
		}else{
			errMessage.push(schemaConstants.PROPERTY_TYPE_NOT_DEFINED);
		}
		
	};
	
	 /**
     *It validates the items of array type in schema and checks for datatypes, special characters and restricted words in the items name.   
     *@param {array}items Array of the items.
     */

	validateArray = function(items){
		if(items.hasOwnProperty(Tokens.Type)){
			if(items.type == Tokens.ObjectType){
				if(items.hasOwnProperty(Tokens.Title)){
					validateNoSpecialCharacterAllowedAndFirstNotNumber(items.title,"Items title");
					validateRestrictedWords(items.title,"items title");
				}
				if(items.hasOwnProperty(Tokens.Properties)){
					validateObject(items.properties);
				}else{
					var errorVariables = "";
					if(items.title){
						errorVariables = [items.title];
					}else{
						errorVariables = ["array of object"];
					}
	    				errMessage.push(createError(schemaConstants.PROPERTY_NOT_DEFINED,errorVariables));
				}
			}else if(items.type == Tokens.ArrayType){
				if(items.hasOwnProperty(Tokens.Title)){
					validateNoSpecialCharacterAllowedAndFirstNotNumber(items.title,"Items title");
					validateRestrictedWords(items.title,"items title");
				}
				validateDataType(items);
				if(getlength(items.items) > 0){
					for(var i in items.items){
						validateNoSpecialCharacterAllowed(i,"Item name");
						validateRestrictedWords(i,"item name");
						if(items.items[i].type == Tokens.ObjectType){
							if(items.items[i].hasOwnProperty(Tokens.Properties)){
								validateObject(items.items[i].properties);
							}else{
								errMessage.push(createError(schemaConstants.PROPERTY_NOT_DEFINED,[i]));
							}
						}
						if(items.items[i].type == Tokens.ArrayType){
							if(items.items[i].hasOwnProperty(Tokens.Items)){
								validateArray(items.items[i].items);
							}else{
								errMessage.push(createError(schemaConstants.ITEMS_NOT_DEFINED,[i]));
							}
						}
					}
				}else{
					var errorVariables = "";
					if(items.title){
						errorVariables = [items.title];
					}else{
						errorVariables = ["within the array"];
					}
    					errMessage.push(createError(schemaConstants.ITEMS_NOT_DEFINED,errorVariables));
			}
			}else{
				if(allowedDataTypes.indexOf(items.type) == -1){
					var errorVariables = "";
					if(items.title){
						errorVariables = [toTitleCase(items.type),items.title];
					}else{
						errorVariables = [toTitleCase(items.type),"array items"];
					}
					errMessage.push(createError(schemaConstants.INVALID_DATA_TYPE,errorVariables));
				}
			}
		}else{
			errMessage.push(schemaConstants.TYPE_NOT_DEFINED);
		}
	};
	
	/**
	*Checks for the valid JSON Data types
	*error message is pushed into the array of errors if the data type is not valid
	*
	*@param {object} list - list of the properties or items
	*/	
	validateDataType = function(list){
		for(var p in list){
			if(list[p].hasOwnProperty(Tokens.Type)){
				var dataType = list[p].type;
					if(allowedDataTypes.indexOf(dataType) == -1){
						errMessage.push(createError(schemaConstants.INVALID_DATA_TYPE,[toTitleCase(list[p].type),p]));
					}
			  }
		  }
	};
	
	/**
	*Checks for alphanumeric values and first character should not be a number in name
	*error message is pushed into the array of errors if the name contains any special character
	*
	*@param {string} name - name of the property/schema/item
	*@param {string} datapath - information about the name
	*/
	validateNoSpecialCharacterAllowedAndFirstNotNumber = function(name,datapath){
     	if(typeof name !== Tokens.NumberType){ 
     		if ( /[^A-Za-z\d]/.test(name) || (!isNaN(name.charAt(0)))) {
     			errMessage.push(createError(schemaConstants.SPECIAL_CHAR_N_NUMBER_CHECK,[datapath,name]));
			}
     	}else{
     		errMessage.push(createError(schemaConstants.NUMBER_TYPE,[datapath]));
     	}
   };	
   
   /**
	*Checks for alphanumeric values in name
	*error message is pushed into the array of errors if the name contains any special character
	*
	*@param {string} name - name of the property/schema/item
	*@param {string} datapath - information about the name
	*/
	validateNoSpecialCharacterAllowed = function(name,datapath){
    	  if ( /[^A-Za-z\d]/.test(name)) {
			errMessage.push(createError(schemaConstants.SPECIAL_CHAR_CHECK,[datapath,name]));
 	  }
  };	
    
    /**
 	*Populates the function names in the restricted words array
 	*/
     pushFuncNamesInRestrictedWordsArray = function(){
    	eFunctions.pushFunctions();
	    var funcNames = eFunctions.functionArray[0];  		 
  		 for(var b = 0; b < funcNames.length; b++){
  			 if(funcNames[b].functionName != null){
  				 if(restrictedWordsArray.indexOf(funcNames[b].functionName) == -1){
  					 restrictedWordsArray.push(funcNames[b].functionName);
  				 }
  			 }
  	 	}
     };
     
 	/**
 	*Checks for any keyword or restricted words in name
 	*error message is pushed into the array of errors if the name contains any restricted word
 	*
 	*@param {string} name - name of the property/schema/item
 	*@param {string} datapath - information about the name
 	*/
 	  validateRestrictedWords = function(name, dataPath){ 
    	  if(restrictedWordsArray.indexOf(name) != -1){
    		  errMessage.push(createError(schemaConstants.RESTRICTED_WORDS,[name, dataPath]));
			}
 	  };
 	  
	 /**
	*Validates the name of the schema and checks for any special character or keyword in the name
	*error message is pushed into the array of errors if the schema name contains any restricted word
	*
	*@param {string} schemaName - name of the schema
	*/	  
 	  validateSchemaName = function(schemaName){
 		errMessage = [];
 		validateNoSpecialCharacterAllowedAndFirstNotNumber(schemaName,"Schema Name");
 		 validateRestrictedWords(schemaName,"schema Name");
 		 if(errMessage.length > 0){
 			 raiseError(errMessage);
 		   }
 	  };
 	  
 	   /**
 		*Creates an error message String
 		*@param {string} errorMsg - error message
 		*@param {array} errorData - data variables required in the error message
 		*@returns {string} finalErrorString-final message with error message and data variables
 		*/
 	 createError = function(errorMsg, errorData) {
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
 	  
 	  
 	   /**
		*Throws the final error messages
		*@param {array} msg - error messages array
		*@throws the final error message
		*/
 	  raiseError = function(msg) {
 		  
		  var errMessage = "<ul>";
		  for(var i=0; i<msg.length;i++){
			  /*Start Change:1034-added for error message details*/
			  //errMessage += " <li><b>SCHEMA ERROR&nbsp;:</b>&nbsp;" + msg[i] + "</li>";
			  errMessage += " <li>&bull;</b>&nbsp;" + msg[i] + "</li>";
			  /*End Change:1034-added for error message details*/
		  }
		   errMessage += "</ul>";
          throw {
             name: '',
             at: '',
             message: errMessage,
             text: '',
             messageList: msg,
             /*Start Change:1034-added for error message details*/
             messageType: 'Schema is not valid.'
            /*End Change:1034-added for error message details*/
             };
       };
	
	    /**
		*Validates the schema object and checks the type and title of the schema
		*error message is pushed into the array of errors if the schema object is not valid
		*
		*@param {object} schema - schema object
		*/	
       
       validateSchema = function(schema){	
    	   errMessage = [];
       
   	       if(typeof schema == Tokens.ObjectType){
   	    	   if(schema.hasOwnProperty(Tokens.Title)){
   	    		   validateNoSpecialCharacterAllowedAndFirstNotNumber(schema.title,"Schema title");
   	    			validateRestrictedWords(schema.title,"schema title");
   	    		}else{
   	    			errMessage.push(schemaConstants.MISSING_SCHEMA_TITLE);	
   	    		}
   	    		if(schema.hasOwnProperty(Tokens.Type)){
   	    			switch (schema.type) {
   		    			case 'object':
   			    			if (schema.hasOwnProperty(Tokens.Properties)){
   			    					validateObject(schema.properties);
   			    			}else{
   			    				errMessage.push(schemaConstants.NO_PROPERTIES_AVAILABLE);
   			    				}
   			    			break;
   		    			case 'array':
   			    			if (schema.hasOwnProperty(Tokens.Items)){
   			    				validateArray(schema.items);
   			    			}else{
   			    				errMessage.push(schemaConstants.NO_ITEMS_AVAILABLE);
   			    				}
   			    			break;
   		    			default:
   		    				errMessage.push(schemaConstants.SCHEMA_TYPE_ERROR);
   		    			}
   	    		}else{
   	    				errMessage.push(schemaConstants.TYPE_NOT_DEFINED_FOR_SCHEMA);
   					}
   		}else{
   				errMessage.push(schemaConstants.INVALID_SCHEMA);
   			}
   		if(errMessage.length > 0){
   			raiseError(errMessage);
   		   }
   	};
       
   	/**
	*Validates the schema object and schema name
	*error message is pushed into the array of errors if the schema object and schema name is not valid
	*
	*@param {object} schema - schema object
	*@param {string} schemaName - schema name
	*/	  
       
	validateNameandSchema = function(schema,schemaName){	
		errMessage = [];
		if(schemaName != null || schemaName != undefined){
			validateSchemaName(schemaName);
		}
	    if(typeof schema == Tokens.ObjectType){
	    	if(schema.hasOwnProperty(Tokens.Title)){
	    			validateNoSpecialCharacterAllowedAndFirstNotNumber(schema.title,"Schema title");
	    			validateRestrictedWords(schema.title,"schema title");
	    		}else{
	    			errMessage.push(schemaConstants.MISSING_SCHEMA_TITLE);	
	    		}
	    	if(schema.hasOwnProperty(Tokens.Type)){
	    			switch (schema.type) {
		    			case 'object':
			    			if (schema.hasOwnProperty(Tokens.Properties)){
			    					validateObject(schema.properties);
			    			}else{
			    				errMessage.push(schemaConstants.NO_PROPERTIES_AVAILABLE);
			    				}
			    			break;
		    			case 'array':
			    			if (schema.hasOwnProperty(Tokens.Items)){
			    				validateArray(schema.items);
			    			}else{
			    				errMessage.push(schemaConstants.NO_ITEMS_AVAILABLE);
			    				}
			    			break;
		    			default:
		    				errMessage.push(schemaConstants.SCHEMA_TYPE_ERROR);
		    			}
	    		}else{
	    				errMessage.push(schemaConstants.TYPE_NOT_DEFINED_FOR_SCHEMA);
					}
		}else{
				errMessage.push(schemaConstants.INVALID_SCHEMA);
			}
		if(errMessage.length > 0){
		   raiseError(errMessage);
		   }
	};

	if(restrictedWordsArray.length == 0){
		restrictedWordsArray=['string',
		                      'integer',
		                      'boolean',
		                      'number',
		                      'array',
		                      'object',
		                      'Math',
		                      'Array',
		                      'abstract',
		                      'arguments',
		                      'break',
		                      'byte',
		                      'case',
		                      'catch',
		                      'char',
		                      'class',
		                      'const',
		                      'continue',
		                      'debugger',
		                      'default',
		                      'delete',
		                      'do',
		                      'double',
		                      'else',
		                      'enum',
		                      'eval',
		                      'export',
		                      'extends',
		                      'false','final',
		                      'finally',
		                      'float',
		                      'for',
		                      'function','goto','if','implements','import','in','instanceof','int','interface','let',
		                      'long','native','new','null','package','private','protected','public','return',
		                      'short','static','super','switch','synchronized','this','throw','throws','transient','true',
		                      'try','typeof','var','void','volatile','while','with','yield','isNaN','Object','Date','undefined','prototype','String','Number',
		                      'hasOwnProperty','Infinity','isFinite','isPrototypeOf','valueOf'];
		pushFuncNamesInRestrictedWordsArray();	
	};
	
	root.validateSchema = validateSchema;
	root.validateSchemaName = validateSchemaName;
	root.validateNameandSchema = validateNameandSchema;
	
}(this));

