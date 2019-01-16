function telNumberWithoutFormat(str){
	var newStr = "";


	for (let i = 0; i < str.length; i++){
		let charCode = str.charCodeAt(i);
		if ((charCode >= 48)&&(charCode <= 57)){ //this char is between 0-9
			newStr += str[i];
		}
	}
	return newStr;
}

function validatePhoneNumber (str, startingIndex, hasCountryCode){
	if (hasCountryCode){
		while (str[startingIndex] === " "){
			startingIndex += 1;
		}
	}
	//for area code, XXX, (XXX), XXX-, XXX 
	switch (str[startingIndex]){
		case "(":
			if (str[startingIndex + 4] != ")"){
				return false;
			} else {
				startingIndex = startingIndex + 5; //look at the char after )
			}
			break;
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			for (let i = startingIndex + 1; i < startingIndex + 2; i ++){
				if ((str.charCodeAt(i) < 48) && (str.charCodeAt(i) > 57)){
					return false;
				}
			}
			startingIndex += 3;  //look at the char after 3rd number
			break;
	}
	//for the frist 3 phone number -XXX, spaceXXX, XXX
	switch (str[startingIndex]){
		case "-":
			//console.log(`${str[startingIndex]}`);
			if (str[startingIndex + 4] != "-"){
				return false;
			}
			startingIndex += 5;

		break;
		case " ":
			if ((str[startingIndex + 4] != "-") && (str[startingIndex + 4] != " ")){
				return false;
			};
			startingIndex +=5;
		break;
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			if ((str[startingIndex + 3] != "-") && (str[startingIndex + 3] != " ")
				&& (str.charCodeAt(startingIndex + 3) > 57) && (str.charCodeAt(startingIndex + 3) < 48)){
				return false;
			};
			for (let i=startingIndex; i < (startingIndex + 3); i++){
				if ((str.charCodeAt(i) > 57) || (str.charCodeAt(i) < 48)){
					return false;
				}
			}
			startingIndex +=4;
		break;
		default:
			return false;
		break;

	}
	//to check the last portion of digits, to make sure all the remaining chars are numbers
	for (let i = startingIndex ;  i < str.length; i ++){
		if ((str.charCodeAt(i) > 57) || (str.charCodeAt(i) < 48)){
				return false;
		}
	}
	return true;
}


function telephoneCheck(str){
	var telNum = telNumberWithoutFormat(str);	
	var hasCountryCode = false;
	console.log(`oringal telephoneNumber: ${str}`);
	if ((telNum.length < 10) || (telNum.length > 11)){
		console.log(`invalid telephone number : ${str}`);
		return false;
	}
	if (telNum.length === 11){
		hasCountryCode = true;
	}
	var phoneStartingIndex = 0;
	if (hasCountryCode){
		if (str[0] != "1"){
			console.log(`invalid telephone number : ${str}`);
			return false;
		}
		else{
			phoneStartingIndex = 1;
		}
	}

	if (validatePhoneNumber (str, phoneStartingIndex, hasCountryCode)){
		console.log(`valid telephone number : ${str}`);
	}
	else {
		console.log(`invalid telephone number : ${str}`);
	}		

};

//telephoneCheck("1(555)555-55)55");

telephoneCheck("555-555-5555");
console.log("=========================================================================");
telephoneCheck("1 555-555-5555");
console.log("=========================================================================");
telephoneCheck("1 (555) 555-5555");
console.log("=========================================================================");
telephoneCheck("5555555555");
console.log("=========================================================================");
telephoneCheck("555-555-5555");
console.log("=========================================================================");
telephoneCheck("(555)555-5555");
console.log("=========================================================================");
telephoneCheck("1(555)555-5555");
console.log("=========================================================================");
telephoneCheck("555-5555");
console.log("=========================================================================");
telephoneCheck("5555555");
console.log("=========================================================================");
telephoneCheck("1 555)555-5555");
console.log("=========================================================================");
telephoneCheck("1 555 555 5555");
console.log("=========================================================================");
telephoneCheck("1 456 789 4444");
console.log("=========================================================================");
telephoneCheck("123**&!!asdf#");
console.log("=========================================================================");
telephoneCheck("-1 (757) 622-7382");
console.log("=========================================================================");
telephoneCheck("2 757 622-7382");
console.log("=========================================================================");
telephoneCheck("10 (757) 622-7382");
console.log("=========================================================================");
telephoneCheck("27576227382");
console.log("=========================================================================");
telephoneCheck("(275)76227382");
console.log("=========================================================================");
telephoneCheck("(6054756961)");
console.log("=========================================================================");
telephoneCheck("2(757)6227382");
console.log("=========================================================================");
telephoneCheck("555)-555-5555");
console.log("=========================================================================");
telephoneCheck("(555-555-5555");
console.log("=========================================================================");
telephoneCheck("(275)76227382");
console.log("=========================================================================");
telephoneCheck("(555)5(55?)-5555");
console.log("=========================================================================");
