let display_input = document.querySelector(".input");
let display_output = document.querySelector(".output");

let keys = document.querySelectorAll(".key");

let input="";

for(let key of keys){
    let value = key.dataset.key;
    key.addEventListener('click',()=>{
        if(value=="clear"){
            input="";
            display_input.innerHTML="0";
            display_output.innerHTML="";
        }
        else if(value=="del"){
            if(input.length==1 || input.length==0){
                input="";
                display_input.innerHTML="0";
            }else{
                input=input.slice(0,-1);
                display_input.innerHTML=formate_input(input);
            }
        }
        else if(value=="="){
            let result = eval(prepare_input(input));
            if(result=="Infinity" || result=="-Infinity" || result.toString()=="NaN"){
                input="";
            }else{
                input=result.toString();
            }
            display_output.innerHTML=formate_output((result));
        }
        else if(value=="brackets"){
            if(input.indexOf("(")== -1 || input.indexOf("(")!= -1 && input.indexOf(")")!= -1 && input.lastIndexOf(")")>input.lastIndexOf("(")){
                input+="(";
            }else{
                input+=")";
            }
            display_input.innerHTML=formate_input(input);
        }
        else{
            if(validate_input(value)){
                input+=value;
                display_input.innerHTML=formate_input(input);
            }
        }
    })
}

function formate_input(input){
    let input_array = input.split("");
    let input_array_lenth = input_array.length;

    for(let i=0;i<input_array_lenth;i++){
        if(input_array[i]=="*"){
            input_array[i]= ` <span class="operator">x</span> `;
        }else if(input_array[i]=="/"){
            input_array[i]= ` <span class="operator">÷</span> `;
        }else if(input_array[i]=="+"){
            input_array[i]= ` <span class="operator">+</span> `;
        }else if(input_array[i]=="-"){
            input_array[i]= ` <span class="operator">-</span> `;
        }else if(input_array[i]=="("){
            input_array[i]= `<span class="action">(</span>`;
        }else if(input_array[i]==")"){
            input_array[i]= `<span class="action">)</span>`;
        }else if(input_array[i]=="%"){
            input_array[i]= `<span class="action">%</span>`;
        }
    }
    return input_array.join("");
}

function formate_output(output){
    let output_string = output.toString();
    let decimal = output_string.split(".")[1];
    let digit = output_string.split(".")[0];
    let digit_array = digit.split("");

    if(digit_array.length > 3 && digit_array.indexOf("i")==-1){
        for(let i=digit_array.length - 3; i>0;i-=3){
            digit_array.splice(i,0,",");
        }
    }

    if(decimal){
        let decimal_array = decimal.split("");
        digit_array.push(".");
        if(decimal_array.length > 5){
            decimal_array=decimal_array.slice(0,5);
            decimal = decimal_array.join("");
        }
        digit_array.push(decimal);
    }

    return digit_array.join("");
}

function validate_input(value){
    let last_input = input.slice(-1);
    let operators = ["*","/","+","-"];

    if(value=="." && last_input=="."){
        return false;
    }

    if(operators.includes(value)){
        if(operators.includes(last_input)){
            return false;
        }else{
            return true;
        }
    }
    return true;
}

function prepare_input(input){
    let input_array = input.split("");
    
    for(let i=0; i<input_array.length;i++){
        if(input_array[i]=="%"){
            input_array[i]="/100";
        }
    }

    return input_array.join("");
}
