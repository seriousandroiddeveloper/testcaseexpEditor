/** @property {Object} expParseSchema This properties contain Utility function for Expression Validator Framework. 
 * */ 
var expParseSchema = {
/** @attribute {Function} createMapfromSchemaArray generate schemaArray with its flag of data variable 
* @param {string} Array of schema.
* @return {Object} 
* */
createMapfromSchemaArray : function(jsonSchemas){
	var mapType = new mHashTable();
	 for (var i = 0; i < jsonSchemas.schemaArray.length ; i++){ 
	expParseSchema.createMapFromSchema({"schemaDetail" : jsonSchemas.schemaArray[i], "isDataVariable": jsonSchemas.isDataVariable}, null, '', mapType, false);
}
	return mapType; 
},	

/** @attribute {Function} createMapfromSchemaArray generate schemaArray with its flag of datavariable 
* @param {Object} Schema.
* @param {string} tilename.
* @param {string} path for recursive need to blank.
* @param {string} hashtable.
* @param {string} need to set false.
* @return {Object} 
 * */
createMapFromSchema : function(schemaObj, propertyName,  path,typeMap, itemIdentifier){
	var schema = schemaObj.schemaDetail.schema;
	if(schema.hasOwnProperty('type')){
		if(schema['type'] === 'array' && schema.hasOwnProperty('items')){
			if(typeof propertyName === 'undefined' || propertyName === null){
                propertyName =  expParseSchema.getNodeTitle(schemaObj);
            }
            if(path == ''){
				/*Start changes : Bug fix 950 & 1054*/
            	/*typeMap.setItem(propertyName, {0 : schema['type'], 1 : 'needtosee'});*/
				typeMap.setItem(propertyName, {0 : schema['type'], 1 : schema['items']['type']});
            } else {
            	/*typeMap.setItem(path + "." + propertyName, { 0 : schema['type'], 1 : 'needtosee'});*/
				typeMap.setItem(path + "." + propertyName, { 0 : schema['type'], 1 : schema['items']['type']});
				/*End changes : Bug fix 950 & 1054*/
            }
            
            if(schema['items']['type'] === 'array' || schema['items']['type'] === 'object'){
            	 /**Start Changes : 2769 Bug fix: Cannot de-reference arrays in Data Transformation dialog*/
            	 if(path == ''){
            		 expParseSchema.createMapFromSchema({"schemaDetail":{"schema":schema['items'], "title":""}}, null,  propertyName+'.<index>',  typeMap,  true);
                 } else {
                	 expParseSchema.createMapFromSchema({"schemaDetail":{"schema":schema['items'], "title":""}}, null,  path + "." + propertyName+'.<index>', typeMap,  true);
                 }
                 /* if(path == ''){
            		 expParseSchema.createMapFromSchema({"schemaDetail":{"schema":schema['items'], "title":""}}, null,  propertyName,  typeMap,  true);
                 } else {
                	 expParseSchema.createMapFromSchema({"schemaDetail":{"schema":schema['items'], "title":""}}, null,  path + "." + propertyName, typeMap,  true);
                 }*/
                 /**End Changes : 2769 Bug fix: Cannot de-reference arrays in Data Transformation dialog*/
            } 
		}else if(schema['type'] === 'object' && schema.hasOwnProperty('properties')){
			if(typeof propertyName === 'undefined' || propertyName === null){
                propertyName =  this.getNodeTitle(schemaObj);
            }
            if(!itemIdentifier){ //Ignore in case of Array Items object
                if(path == ''){
                	typeMap.setItem(propertyName, { 0 : schema['type']});
                } else {
                	typeMap.setItem(path + "." + propertyName, { 0: schema['type']});
                }
			}
            var subSchema = schema['properties'];
            for(prop in subSchema){
                var propObj = subSchema[prop];
                if(propObj.hasOwnProperty('type')){
                    if(propObj['type'] === 'number' || propObj['type'] === 'string' || propObj['type'] === 'boolean' || propObj['type'] === 'null' || propObj['type'] === 'integer'){
                        if(!itemIdentifier){
                           if(path == ''){
                           	 typeMap.setItem(propertyName + "." + prop, { 0 : propObj['type']});
                           } else {
                           	 typeMap.setItem(path + "." + propertyName + "." + prop, { 0 : propObj['type']});
                           }
                       } else {
                    	   if(path == ''){
                             	 typeMap.setItem(prop, { 0 : propObj['type']});
                             } else {
                             	 typeMap.setItem(path + "." + prop,{ 0 : propObj['type']});
                             }
                       }
                    }
                    else{
                    	
                    	if(!itemIdentifier){
                    		if(path == ''){
                    			expParseSchema.createMapFromSchema({"schemaDetail":{"schema":propObj, "title":""}}, prop,  propertyName ,  typeMap,  false);
    						} else {
    							expParseSchema.createMapFromSchema({"schemaDetail":{"schema":propObj, "title":""}}, prop,  path +"." + propertyName ,  typeMap,  false);
    						}
                    	} else {
                    		if(path == ''){
                    			expParseSchema.createMapFromSchema({"schemaDetail":{"schema":propObj, "title":""}}, prop,  '' ,  typeMap,  false);
    						} else {
    							expParseSchema.createMapFromSchema({"schemaDetail":{"schema":propObj, "title":""}}, prop,  path ,  typeMap, false);
    						}
                    	}
                    	
                    }
                }              
            } 
		}
	} 
	
	
},
/** @attribute {Function} getNodeTitle It determine the title of schema. 
* @param {Object}  schema.
* @return {string} titlename of the schema
**/
getNodeTitle : function(schemaObj){
	 var title = '';
		if(schemaObj.isDataVariable){
			title = schemaObj.schemaDetail.title;
		} else {
			if(schemaObj.schemaDetail.schema.hasOwnProperty('title')){       
		        title = schemaObj.schemaDetail.schema['title'];
		    }
		}
	    
	    return title;  
},
/** @attribute {Function} It collect the schema array from the datavariable. 
* @return {Object} It contain schema array.
**/
getDataVariableSchemaArray : function () {
    var schemaValue = [];
    var cellArray = graph.getModel().cells;

    for (var cell in cellArray) {
        var temp = cellArray[cell].getValue();
        if (temp !== undefined) {

            var myAttMap = temp.attributes;
            for (var i = 0; i < myAttMap.length; i++) {
                if (myAttMap[i].name == ObjectTypeAttr && myAttMap[i].value == TypeDataVariable) {
 					var schemaVariables = [];
                    for (var k = 0; k < temp.childNodes.length; k++) {
                        if (temp.childNodes[k].nodeName == typeProperties) {
                            schemaVariables = temp.childNodes[k].childNodes;
                        }
                    }
                    if (schemaVariables != undefined) {
                        for (var j = 0; j < schemaVariables.length; j++) {
                             try {
                        		 schemaValue.push({ 'schema': jsonlite.parse(schemaVariables[j].childNodes[1].textContent), 'title': schemaVariables[j].childNodes[0].textContent, 'schemaId': schemaVariables[j].childNodes[3].textContent });
                             }
                             catch (e) {
                                 var schemaErr;
                                 if (schemaVariables[j].childNodes[0] != undefined || schemaVariables[j].childNodes[0] != null)
                                     schemaErr = [schemaVariables[j].childNodes[0].textContent, e.name, e.at, e.message, e.text];
                                 else
                                     schemaErr = ["Undefined schema", e.name, e.at, e.message, e.text];
                                 showError(mConstants.SCHEMA_ERROR, schemaErr);
                                 return;
                             }
                        }
                    }			
                }
            }
        }
    }
    return {"schemaArray" : schemaValue, "isDataVariable" : true};
}

 
};