function varScope(){
    if(true){
        var varVariable = "im a var variable";
        let letVariable = "im a let variable";
        const constVariable = "i can be changed";
    }

    console.log(varVariable);   // ✅ This works — `var` is function-scoped
    // console.log(letVariable);   // ❌ Error — `let` is block-scoped
    // console.log(constVariable); // ❌ Error — `const` is block-scoped
}

varScope();
