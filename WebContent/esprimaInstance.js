var esprimaInstance = {
	 options : {
			attachComment : false,
			range : true,
			loc : false,
			tolerant : false,
			tokens : false
	},
	
	parseExpressionToAST : function(expression){
		if(expression && expression.trim().length>0){
			var ast = null;
			try {
				ast = esprima.parse(expression, this.options).body[0].expression;
			} catch (e) {
				throw e;
			}
			return ast;
		}else{
			return { "ast" : "", "tokens" : ""};
		}
	},
       
   stringify : function(AST){
		  return JSON.stringify(AST, function(key, value) {
			  if (value instanceof RegExp) {
				  return value.toString();
			  }
			  return value;
		  });
   },
	/**[Start Changes]Bug Fix : 578 Expression Restoration**/
	parseExpressionToASTwithTokens : function(expression){
		if(expression && expression.trim().length>0){
			var result = null;
			try {
				this.options.tokens = true;
				result = esprima.parse(expression, this.options);			
				result.tokens; 
			} catch (e) {
				return null;
			}
			return { "ast" : result.body[0].expression, "tokens" : result.tokens};	
		}else{
			return { "ast" : "", "tokens" : ""};
		}		
	},
	
	/** @attribute {Function}  It restore the expression. 
	* @param {esprima.token} oldtoken Esprima token of user typed expression.
	* @param {esprima.token} newtoken Esprima token of parseAST generated expression.
	* @return {string} Returns formated expression.
	 * */
	getFormatedExpression : function(oldtoken, newtoken) {
		if(oldtoken &&  oldtoken.length > 0 && newtoken && newtoken.length > 0){
			var brandnewtoken = [];
			var extravalue = 0;
			var newtokenindex = 0;
			var lastpointer = 0;
			for ( var index = 0; index < oldtoken.length; index++) {
				if(oldtoken[index].value == ';'){
					break;
				}
				if (newtoken[newtokenindex] != undefined) {
					if (oldtoken[index].type == 'Punctuator'
							&& (oldtoken[index].value == ')' || oldtoken[index].value == '(')) {
						/**Only bracket punctuator is consider as addition entity in the expression**/
						if (oldtoken[index].value != newtoken[newtokenindex].value) {
							var temp = new Object();
							temp.range = [];
							temp.range.push(lastpointer);
							temp.range.push(lastpointer + 1);
							temp.type = "Punctuator";
							temp.value = oldtoken[index].value;
							extravalue++;
							lastpointer = temp.range[1];
							brandnewtoken.push(temp);
						} else {
							/**If oldtoken[index] and newtoken[index] is of same type but with different value **/
							var temp = new Object();
							temp.range = [];
							temp.range[0] = newtoken[newtokenindex].range[0]
									+ extravalue;
							temp.range[1] = newtoken[newtokenindex].range[1]
									+ extravalue;
							temp.type = newtoken[newtokenindex].type;
							temp.value = newtoken[newtokenindex].value;
							lastpointer = temp.range[1];
							brandnewtoken.push(temp);
							newtokenindex++;

						}
					} else {
						/**for rest of the tokens are considered other than punctuator **/
						var temp = new Object();
						temp.range = [];
						temp.range[0] = newtoken[newtokenindex].range[0]
								+ extravalue;
						temp.range[1] = newtoken[newtokenindex].range[1]
								+ extravalue;
						temp.type = newtoken[newtokenindex].type;
						temp.value = newtoken[newtokenindex].value;
						lastpointer = temp.range[1];
						brandnewtoken.push(temp);
						newtokenindex++;
					}
				} else {
					/**if addition brackects are missing at the end of the oldtokens then we need to consider that also**/
					var temp = new Object();
					temp.range = [];
					temp.range[0] = lastpointer;
					temp.range[1] = lastpointer + 1;
					temp.type = oldtoken[index].type;
					temp.value = oldtoken[index].value;
					lastpointer = temp.range[1];
					brandnewtoken.push(temp);
				}
			}

			/**brandnewtokens is newly generated expression this will convert it into actual expression**/
			var exp = '';
			for ( var k = 0; k < brandnewtoken.length; k++) {
				if (k > 0) {
					if (brandnewtoken[k - 1].range[1] != brandnewtoken[k].range[0]) {
						exp += " ";
					}
				}
				exp += brandnewtoken[k].value;
			}

			return exp;
		}else{
			return "";
		}

	}
	/**[End Changes]Bug Fix : 578 Expression Restoration**/
	
};