// Basic Python-like grammar
Program
  = Statement*

Statement
  = Assignment
  / Expression

Assignment
  = identifier:Identifier _ "=" _ value:Expression {
    return {
      type: "Assignment",
      identifier,
      value
    }
  }

Expression
  = Number
  / String
  / Identifier

Identifier
  = first:[a-zA-Z_] rest:[a-zA-Z0-9_]* {
    return {
      type: "Identifier",
      name: first + rest.join("")
    }
  }

Number
  = digits:[0-9]+ {
    return {
      type: "Number",
      value: parseInt(digits.join(""), 10)
    }
  }

String
  = '"' chars:[^"]* '"' {
    return {
      type: "String",
      value: chars.join("")
    }
  }

_ "whitespace"
  = [ \t\n\r]* 