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
	//console.log(`in validatePhoneNumber: startingIndex = ${startingIndex}, 
	//	char at startingIndex = ${str[startingIndex]}, hasCountryCode = ${hasCountryCode}`);
	if (hasCountryCode){
		while (str[startingIndex] === " "){
			startingIndex += 1;
		}
	}
	//for area code, XXX, (XXX), XXX-, XXX 
	//console.log(`in area code check ${str[startingIndex]} ${startingIndex}`);
	switch (str[startingIndex]){
		case "(":
			//console.log(`in "(", ${str[startingIndex + 4]}`);
			if (str[startingIndex + 4] != ")"){
				//console.log(`in "(", ${str[startingIndex + 4]}`);
				return false;
			} else {
				//console.log(`in "(", ${str[startingIndex + 5]}`);
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
				//console.log(`${str[i]}`);
				if ((str.charCodeAt(i) < 48) && (str.charCodeAt(i) > 57)){
					return false;
				}
			}
			startingIndex += 3;  //look at the char after 3rd number
			//console.log(`====> ${str[startingIndex]}`);
			break;
	}
	//for the frist 3 phone number -XXX, spaceXXX, XXX
	//console.log(`in the first 3 phone number check ${str[startingIndex]} ${startingIndex}`);
	switch (str[startingIndex]){
		case "-":
			//console.log(`${str[startingIndex]}`);
			if (str[startingIndex + 4] != "-"){
				return false;
			}
			startingIndex += 5;

		break;
		case " ":
			//console.log(`in " ", ${str[startingIndex + 4]}`);
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
				//console.log(`${str[i]}, ${i}`);
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
	//to check the last 4 digits, to make sure all the remaining chars are numbers
	for (let i = startingIndex ;  i < str.length; i ++){
		if ((str.charCodeAt(i) > 57) || (str.charCodeAt(i) < 48)){
				return false;
		}
	}
	//console.log(`in validatePhoneNumber, return true`);
	return true;
}


function telephoneCheck(str){
	var telNum = telNumberWithoutFormat(str);	
	var hasCountryCode = false;
	console.log(`oringal telephoneNumber: ${str}`);
	//console.log(`tel number without format: ${telNum}, and length = ${telNum.length}`);
	if ((telNum.length < 10) || (telNum.length > 11)){
		console.log(`invalid telephone number : ${str}`);
		return false;
	}
	if (telNum.length === 11){
		hasCountryCode = true;
	}
	/*
	console.log("valid telephone number");
	console.log(`oringal telephoneNumber: ${str}`);
	console.log(`tel number without format: ${telNum}, and length = ${telNum.length}`);
	console.log("=========================================================================");
	*/
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
	/*
	console.log("valid telephone number");
	console.log(`oringal telephoneNumber: ${str}`);
	console.log(`tel number without format: ${telNum}, and length = ${telNum.length}`);
	console.log("=========================================================================");
	*/
	if (validatePhoneNumber (str, phoneStartingIndex, hasCountryCode)){
		console.log(`valid telephone number : ${str}`);
		//console.log(`oringal telephoneNumber: ${str}`);
		//console.log(`tel number without format: ${telNum}, and length = ${telNum.length}`);
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
